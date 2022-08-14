import { Icon } from "@iconify/react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { firestoreDb } from "../../firebase";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";

const Dashboard = () => {
  const [widgets, setWidgets] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);

  const addWidgetHandler = async () => {
    try {
      const docRef = await addDoc(collection(firestoreDb, "widgets"), {
        userId: user.userId,
        profileUrl: "https://twitter.com/ProductHunt",
        buttonLabel: "See What They Said",
        showCount: { label: "Show", value: true },
        tweetAmount: 10,
        customTweet: [],
        filterRetweet: { label: "Dont Include", value: false },
        filterReply: { label: "Include", value: true },
        tweetLang: { label: "English", value: "en" },
        matchGood: { label: "Yes", value: true },
        banBad: { label: "Filter", value: true },
        matchSpecific: "",
        banSpecific: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      navigate(`${docRef.id}`);
      toast.success("Add new widget success");
    } catch (err) {
      console.error(err);
    }
  };

  const getAllWidgets = () => {
    // ?? Unsubscribe itu buat clear memory mislanya componentnya udah unmount
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDb, "widgets"),
        where("userId", "==", user.userId),
        orderBy("createdAt", "desc")
      ),
      (snapshot) => {
        if (snapshot.docs.length) {
          setWidgets(snapshot.docs);
          setLoading(false);
        } else {
          setWidgets([]);
          setLoading(false);
        }
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    try {
      if (!user) navigate("/", { replace: true });
      getAllWidgets();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Manage Your Twevvy</title>
      </Helmet>
      <Navbar />
      <div className="containerKu my-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold">Manage Your Twevvy</h1>
          <button
            onClick={() => addWidgetHandler()}
            className="flex text-sm sm:text-base items-center gap-2 py-2 px-3 rounded bg-sky-500 text-white font-semibold"
          >
            Add Widget
            <Icon icon="akar-icons:plus" width={18} />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
            <div>Getting your widgets...</div>
          ) : (
            <>
              {widgets.length ? (
                <>
                  {widgets.map((widget) => (
                    <div
                      onClick={() => navigate(`${widget.id}`)}
                      key={widget.id}
                      className="flex items-center cursor-pointer transition-all hover:-translate-y-1 col-span-1 justify-between py-2 px-4 shadow-md rounded"
                    >
                      <div className="flex items-center gap-[10px]">
                        <Icon
                          icon="ant-design:twitter-outlined"
                          className="text-sky-500"
                          width={22}
                        />
                        <p className="font-medium">
                          {widget?.data()?.profileUrl.split("com/")[1]}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-slate-700">
                        {dayjs(widget?.data()?.updatedAt?.toDate()).format(
                          "MMM DD"
                        )}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="col-span-2 text-center flex flex-col gap-2 items-center mt-6 text-xl font-medium text-slate-500">
                  <h5 className="text-4xl text-slate-700 font-semibold">
                    Sorry😿
                  </h5>
                  <p>No Widget Found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
