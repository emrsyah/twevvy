import { Icon } from "@iconify/react";
import React from "react";
import dateConverter from "../helpers/dateConverter";
import thousandConverter from "../helpers/thousandConverter";
import CustomRender from "./CustomRender";

const Tweet = ({ d }) => {
  return (
    <a
      href={d.link}
      target="_blank"
      rel="noreferrer"
      className="border-b-[1px] cursor-pointer border-b-gray-300 px-2 pb-2"
    >
      <div className="flex gap-3">
        <img
          src={d.img}
          alt="profile"
          className="xl:w-11 xl:h-11 w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <h5 className="font-semibold xl:text-base text-sm flex items-center gap-[2px]">
            <>
              {d.name}
              {d.verified && (
                <Icon
                  icon="codicon:verified-filled"
                  width={20}
                  className="text-sky-500"
                />
              )}
            </>
          </h5>
          <p className="xl:text-sm text-[13px] text-slate-600">@{d.username}</p>
        </div>
      </div>
      <div className="text-sm xl:text-[14.5px] text-slate-900 mt-[10px]">
        {/* {d.text} */}
        <CustomRender text={d.text.replace("\n", "  ")} />
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-500 mt-[6px]">
        <p className=" inter  font-medium">{dateConverter(d?.date)}</p>
        <div className="flex items-center gap-1">
          <Icon
            icon="akar-icons:heart"
            width="17"
            className="cursor-pointer hover:text-rose-600"
          />
          <p className="font-medium">{thousandConverter(d.like)}</p>
        </div>
      </div>
    </a>
  );
};

export default Tweet;
