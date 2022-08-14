import React from "react";
import { Icon } from "@iconify/react";
import logo from "../assets/twevvyLogo.svg";
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
  // console.log(image)
  return (
    <div className="col-span-1 shadowCard h-full w-full max-w-sm rounded-md px-3 pt-4 pb-2 max-h-[420px] overflow-y-auto overflow-x-hidden scroll">
      {loading ? (
        <div className="font-medium text-slate-600 text-center">
          Getting Some Data👾...
        </div>
      ) : (
        <>
          <a
            href={`https://twitter.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="flex lg:flex-row flex-col justify-between lg:items-center"
          >
            <div className="flex cursor-pointer items-center gap-4">
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
                    className="text-sky-500 absolute -bottom-[3px] -right-3"
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
            <a
              href={`https://twitter.com/intent/follow?screen_name=${username}`}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 text-center mt-3 w-full rounded-md lg:mt-0 lg:w-fit text-white py-[6px] hover:bg-slate-900 px-4 lg:rounded-full font-semibold text-sm"
            >
              Follow
            </a>
          </a>
          {showCount ? (
            <a
              href={`https://twitter.com/intent/tweet?text=I love how amazing and cool @${username} is&hashtags=${username}`}
              target="_blank"
              className="bg-sky-500 cursor-pointer py-[6px] font-semibold inter my-2 lg:my-3 rounded text-white flex items-center justify-center"
            >
              <p className="text-sm 2xl:text-[15px] text-center">
                {thousandConverter(count)} Tweet about {username}{" "}
                <span className="xl:inline hidden">this week</span>
              </p>
            </a>
          ) : (
            <div className="border-t-[1.5px] border-t-gray-300 mt-4"></div>
          )}
          {tweets?.length > 0 ? (
            <div className="flex flex-col gap-4 mt-5">
              {tweets.map((d) => (
                <Tweet d={d} id={d.id} key={d.id} />
              ))}
            </div>
          ) : (
            <div className="my-5 text-center font-semibold text-slate-500">
              No Tweet😿
            </div>
          )}
          <div className="flex justify-center text-[13.5px] gap-1 mt-4 mb-1">
            <p className="text-slate-700">
              Powered By{" "}
              <a
                href="https://twevvy.vercel.app"
                target="_blank"
                className="text-sky-500 cursor-pointer font-semibold"
              >
                Twevvy
              </a>
            </p>
            <a href="https://twevvy.vercel.app" target="_blank">
              <img src={logo} alt="logo" className="w-8 cursor-pointer" />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default WidgetComponent;
