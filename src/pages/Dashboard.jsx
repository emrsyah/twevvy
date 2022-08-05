import { Icon } from "@iconify/react";
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import logo from '../assets/twevvyLogo.svg'

const datas = [
  {
    img: "https://avatars.dicebear.com/api/adventurer-neutral/o.svg",
    name: "ZeroSwag",
    username: "@zerswa",
    text: "Lovely! I like the clean look you get with honestly a few clicks.",
    date: "Aug 01, 2022",
    verified: true,
  },
  {
    img: "https://avatars.dicebear.com/api/adventurer-neutral/ries.svg",
    name: "NathanielB",
    username: "@nathb",
    text: "I absolutely love how easy it is to make a cover with this. Also, the image itself looks nice.",
    date: "July 23, 2022",
    verified: true,
  },
  {
    img: "https://avatars.dicebear.com/api/adventurer-neutral/ok.svg",
    name: "MinZoel",
    username: "@zoemin",
    text: "I absolutely love how easy it is to make a cover with this. Also, the image itself looks nice.",
    date: "July 30, 2022",
    verified: false,
  },
  {
    img: "https://avatars.dicebear.com/api/adventurer-neutral/dis.svg",
    name: "BeautyIsm",
    username: "@ismBea",
    text: "I absolutely love how easy it is to make a cover with this. Also, the image itself looks nice.",
    date: "July 28, 2022",
    verified: false,
  },
  {
    img: "https://avatars.dicebear.com/api/adventurer-neutral/zuaac.svg",
    name: "Savesta Vi",
    username: "@viSaves",
    text: "I absolutely love how easy it is to make a cover with this. Also, the image itself looks nice.",
    date: "July 19, 2022",
    verified: false,
  },
];

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Twevvy</title>
      </Helmet>
      <Navbar />
      <div className="containerKu my-16 px-20 grid grid-cols-2 gap-20">
        <div className="col-span-1 shadowCard max-w-sm rounded-md p-3 max-h-[420px] overflow-auto scroll">
          <div className="flex cursor-pointer items-center gap-4">
            <img
              src={
                "https://lh3.googleusercontent.com/a-/AFdZucp6A_VoFj4qsbHbmCdBHi7Oy2klN3JIiWVEiAs20mc=s96-c"
              }
              className="w-14 h-14 rounded-full"
              alt="profile"
            />
            <div className="flex flex-col gap-0">
              <h3 className="text-xl font-semibold">emrsyh</h3>
              <p className="text-slate-600 font-medium">@emrsyahh</p>
            </div>
          </div>
          <div className="bg-sky-500 py-1 font-semibold inter my-3 rounded text-white flex items-center justify-center">
            <p className="text-[15px]">13.211 Tweet about emrsyahh this week</p>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            {datas.map((d) => (
              <div className="border-b-[1px] cursor-pointer border-b-gray-300 px-2 pb-2">
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
                  <p className=" inter  font-medium">
                    {d.date}
                  </p>
                  <Icon icon="akar-icons:heart" width="17" className="cursor-pointer hover:text-rose-600" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center text-sm gap-1 mt-4 mb-2">
            <p className="text-slate-700">
              Powered By{" "}
              <span className="text-sky-500 font-semibold">Twevvy</span>
            </p>
            <img src={logo} alt="logo" className="w-8" />
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </>
  );
};

export default Dashboard;
