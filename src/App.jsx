import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userState } from "./atoms/userAtom";
import { useSetRecoilState } from "recoil";
import Home from "./pages/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Lottie from "lottie-web";
import lottieJson from "./assets/62424-gradient-loader-spinner-light-blue.json";
import logo from "./assets/twevvyNavLogo.svg";
import Dashboard from "./pages/Dashboard";
import WidgetDashboard from "./pages/WidgetDashboard";
import Trigger from "./pages/widget/Trigger";
import Panel from "./pages/widget/Panel";

function App() {
  const [loading, setLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user)
        setUser({
          userId: user.uid,
          userProfile: user.photoURL,
          userName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: document.querySelector("#lottie-container"),
      animationData: lottieJson,
    });
    return () => instance.destroy();
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {loading ? (
          <div className="flex gap-4 justify-center items-center h-[100vh] flex-col">
            <img src={logo} alt="" className="h-14" />
            <div id="lottie-container" className="w-10" />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/" element={<Dashboard />} />
            <Route path="/dashboard/:id" element={<WidgetDashboard />} />
          </Routes>
        )}
        <Routes>
          <Route path="/widget/trigger/:id" element={<Trigger />} />
          <Route path="/widget/panel/:id" element={<Panel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
