import React from "react";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react";

const Home = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="h-48 w-48 left-12 bg-indigo-700 absolute blur-[200px]"></div>
        <div className="h-52 w-52 bg-pink-500 right-12 top-0 absolute blur-[200px]"></div>
        <div className="containerKu pt-24 pb-12 relative z-10">
          {/* Hero */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-6xl inter leading-[1.15] text-slate-900 text-center font-bold">
              Share Your Product Twitter Community Easily In Any Website
            </h1>
            <p className="text-center font-medium text-slate-700 text-lg mt-4">
              Twevvy is an embeddable widgets to share your twitter community
              review and stats easily
            </p>
            <button className="bg-slate-700 hover:bg-slate-800 text-white text-xl font-semibold py-3 px-8 rounded-md mt-14">
              Get Started - It's Free 🤩
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-col items-center justify-center mt-40">
            <h2 className="text-4xl leading-[1.2] text-slate-900 text-center font-bold inter">
              Let They Know
              <br />
              What The Community Said
            </h2>
            <p className="text-lg font-medium text-slate-700 mt-2">
              People wont take word from you, the need a real reviews
            </p>
            <div className="grid grid-cols-3 items-center gap-4 mt-6 px-10">
              <div className="col-span-1 hover:shadow-2xl transition-all hover:-rotate-6 hover:scale-105 shadow-md w-11/12 text-center rounded flex flex-col p-2">
                <div className="bg-sky-400 flex items-center justify-center p-6 rounded text-white">
                  <Icon icon="ant-design:field-time-outlined" width={80} />
                </div>
                <h5 className="text-lg font-bold text-slate-900 mt-2">
                  Make yours within a minute
                </h5>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem, molestias.
                </p>
              </div>
              <div className="col-span-1 hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-4 shadow-md w-11/12 text-center rounded flex flex-col p-2">
                <div className="bg-rose-400 flex items-center justify-center p-6 rounded text-white">
                  <Icon icon="akar-icons:edit" width={80} />
                </div>
                <h5 className="text-lg font-bold text-slate-900 mt-2">
                  Customize like you want
                </h5>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem, molestias.
                </p>
              </div>
              <div className="col-span-1 hover:shadow-2xl transition-all hover:rotate-6 hover:scale-105 shadow-md w-11/12 text-center rounded flex flex-col p-2">
                <div className="bg-indigo-400 flex items-center justify-center p-6 rounded text-white">
                  <Icon icon="dashicons:money-alt" width={80} />
                </div>
                <h5 className="text-lg font-bold text-slate-900 mt-2">
                  The best part is, Its Free
                </h5>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem, molestias.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="flex items-center mt-24 gap-3 justify-center font-medium">
            <p className="text-slate-800">
              Built with 💖 by{" "}
              <a
                href="https://github.com/emrsyah"
                className="text-slate-900 hover:text-sky-600 font-semibold"
                target="_blank"
              >
                emrsyah
              </a>
            </p>
            <p className="text-slate-700">|</p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/emrsyahh"
                target="_blank"
                className="text-slate-700 hover:text-sky-600"
              >
                <Icon icon="brandico:twitter-bird" />
              </a>
              <a
                href="https://www.instagram.com/muhammademirsyah/"
                target="_blank"
                className="text-slate-700 hover:text-sky-600"
              >
                <Icon icon="ant-design:instagram-filled" width={22} />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
