import React from "react";
import { Icon } from "@iconify/react";
import logo from "../assets/twevvyLogo.svg";
import dateConverter from "../helpers/dateConverter";
import thousandConverter from "../helpers/thousandConverter";
import Tweet from "./Tweet";

const WidgetComponent = ({
  image,
  name,
  username,
  count,
  tweets,
  loading,
  verified,
  showCount,
}) => {
  return (
    <div className="col-span-1 shadowCard max-w-sm rounded-md px-3 pt-4 pb-2 max-h-[420px] overflow-auto scroll">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          <a
            href={`https://twitter.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center"
          >
            <div className="flex cursor-pointer items-center gap-3 xl:gap-4">
              <div className="w-14 h-14 rounded-full relative">
                <img
                  src={image}
                  className="w-full h-full rounded-full"
                  alt="profile"
                />
                {verified && (
                  <Icon
                    icon="codicon:verified-filled"
                    width={28}
                    className="text-sky-500 absolute -bottom-1 -right-3"
                  />
                )}
              </div>
              <div className="flex flex-col gap-0">
                <h3 className="text-xl font-bold flex items-center gap-1">
                  {name}
                </h3>
                <p className="text-slate-600 font-medium">@{username}</p>
              </div>
            </div>
            <button className="bg-slate-800 text-white py-[6px] hover:bg-slate-900 px-4 rounded-full font-semibold text-sm">
              Follow
            </button>
          </a>
          {showCount ? (
            <div className="bg-sky-500 cursor-pointer py-1 font-semibold inter my-3 rounded text-white flex items-center justify-center">
              <p className="text-sm 2xl:text-[15px] text-center">
                {thousandConverter(count)} Tweet about {username} <span className="xl:inline hidden">this week</span>
              </p>
            </div>
          ) : (
            <div className="border-t-[1.5px] border-t-gray-300 mt-4"></div>
          )}
          {tweets?.length > 0 ? (
            <div className="flex flex-col gap-4 mt-5">
              {tweets.map((d) => (
                <Tweet d={d} />
              ))}
            </div>
          ) : (
            <div className="my-5 text-center font-semibold text-slate-500">
              No Tweet😿
            </div>
          )}
          <div className="flex justify-center text-sm gap-1 mt-4 mb-2">
            <p className="text-slate-700">
              Powered By{" "}
              <span className="text-sky-500 cursor-pointer font-semibold">
                Twevvy
              </span>
            </p>
            <img src={logo} alt="logo" className="w-8 cursor-pointer" />
          </div>
        </>
      )}
    </div>
  );
};

export default WidgetComponent;
