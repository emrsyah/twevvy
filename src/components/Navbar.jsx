import React from "react";
import { Icon } from "@iconify/react";
import logo from "../assets/twevvyNavLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { userState } from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { auth, googleProvider } from "../../firebase";
import NavbarProfile from "./NavbarProfile";

const Navbar = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate()

  const loginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard')
      toast.success("Success Login", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="containerKu py-5 justify-between bg-transparent flex items-center">
      <Link to="/">
        <img src={logo} alt="nav logo" className="w-36" />
      </Link>
      {user ? (
        // <button 
        // onClick={()=>navigate('/dashboard')}
        // className="flex gap-3 py-2 px-4 hover:bg-gray-50 rounded-lg items-center bg-white">
        //   <p className="font-semibold text-slate-800">Dashboard</p>
        //   {/* <img
        //     src={
        //       "https://avatars.dicebear.com/api/micah/emrsyhh.svg"
        //     }
        //     alt="profile"
        //     className="w-11 h-11 border-2 border-sky-400 rounded-full"
        //   /> */}
        //   <img
        //     src={
        //       user.userProfile
        //     }
        //     alt="profile"
        //     className="w-11 h-11 border-2 border-sky-400 rounded-full"
        //   />
        //   {/* <div className="w-9 h-9 bg-sky-400 rounded-full"></div> */}
        // </button>
        <NavbarProfile img={user.userProfile} />
      ) : (
        <button
          onClick={() => loginHandler()}
          className="bg-sky-400 hover:bg-sky-500 py-2 flex items-center gap-2 px-6 font-semibold rounded text-white"
        >
          <p>Login</p>
          <Icon icon="akar-icons:arrow-right" width={18} />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
