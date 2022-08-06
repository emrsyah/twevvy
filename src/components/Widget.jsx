import React from "react";
import { Icon } from "@iconify/react";
import logo from "../assets/twevvyLogo.svg";

const Widget = ({ image, name, username, count, tweets }) => {
  return (
    <div className="col-span-1 shadowCard max-w-sm rounded-md px-3 pt-4 pb-2 max-h-[420px] overflow-auto scroll">
      <div className="flex justify-between items-center">
        <div className="flex cursor-pointer items-center gap-4">
          <img src={image} className="w-14 h-14 rounded-full" alt="profile" />
          <div className="flex flex-col gap-0">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-slate-600 font-medium">@{username}</p>
          </div>
        </div>
        <button className="bg-slate-800 text-white py-[6px] hover:bg-slate-900 px-4 rounded-full font-semibold text-sm">
          Follow
        </button>
      </div>
      <div className="bg-sky-500 cursor-pointer py-1 font-semibold inter my-3 rounded text-white flex items-center justify-center">
        <p className="text-[15px]">{count} Tweet about {username} this week</p>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {tweets.map((d) => (
          <div
            key={d.username}
            className="border-b-[1px] cursor-pointer border-b-gray-300 px-2 pb-2"
          >
            <div className="flex gap-3">
              <img
                src={d.img}
                alt="profile"
                className="w-11 h-11 rounded-full"
              />
              <div className="flex flex-col">
                <h5 className="font-semibold flex items-center gap-1">
                  {d.name}
                  {d.verified && (
                    <Icon
                      icon="codicon:verified-filled"
                      width={22}
                      className="text-sky-500"
                    />
                  )}
                </h5>
                <p className="text-sm text-slate-600">{d.username}</p>
              </div>
            </div>
            <p className="text-[15px] text-slate-900 mt-3">{d.text}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <p className=" inter  font-medium">{d.date}</p>
              <Icon
                icon="akar-icons:heart"
                width="17"
                className="cursor-pointer hover:text-rose-600"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center text-sm gap-1 mt-4 mb-2">
        <p className="text-slate-700">
          Powered By{" "}
          <span className="text-sky-500 cursor-pointer font-semibold">
            Twevvy
          </span>
        </p>
        <img src={logo} alt="logo" className="w-8 cursor-pointer" />
      </div>
    </div>
  );
};

export default Widget;
