import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="h-48 w-48 left-12 bg-indigo-700 absolute blur-[220px]"></div>
        <div className="h-52 w-52 bg-pink-500 right-52 top-0 absolute blur-[260px]"></div>
        <div className="containerKu py-20 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl inter leading-[1.15] text-slate-900 text-center font-bold">
              Share Your Product Twitter Community Easily In Any Website
            </h1>
            <p className="text-center font-medium text-slate-600 text-lg mt-4">
              Twevvy is an embeddable widgets to share your twitter community
              review and stats easily
            </p>
            <button className="bg-slate-700 hover:bg-slate-800 text-white text-xl font-semibold py-3 px-8 rounded-md mt-12">
              Get Started - It's Free
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
