import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import logo from "../assets/twevvyLogo.svg";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const datas = [
  {
    img: "https://avatars.dicebear.com/api/adventurer-neutral/o.svg",
    name: "ZeroSwag",
    username: "@zerswa",
    text: "Lovely! I like the clean look you get with honestly a few clicks. https://youtube.com  @someone",
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
    text: "Absolutely amazing product, i can easily customize my widgets and adding cool stuff.",
    date: "July 30, 2022",
    verified: false,
  },
  {
    img: "https://avatars.dicebear.com/api/adventurer-neutral/dis.svg",
    name: "BeautyIsm",
    username: "@ismBea",
    text: "Brilliant, its so easy to use and very useful product!",
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

const countOptions = [
  { value: true, label: "Show" },
  { value: false, label: "Dont Show" },
];

const badWordOptions = [
  { value: true, label: "Filter" },
  { value: false, label: "Dont Filter" },
];

const goodTweetOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No Thankyou" },
];

const langOption = [
  { value: "", label: "All" },
  { value: "de", label: "German" },
  { value: "ml", label: "Malayalam" },
  { value: "sk", label: "Slovak" },
  { value: "ar", label: "Arabic" },
  { value: "es", label: "Spanish" },
  { value: "no", label: "Norwegian" },
  { value: "sv", label: "Swedish" },
  { value: "hi", label: "Hindi" },
  { value: "tl", label: "Tagalog" },
  { value: "bg", label: "Bulgarian" },
  { value: "pa", label: "Panjabi" },
  { value: "hu", label: "HUngarian" },
  { value: "hr", label: "Croatian" },
  { value: "th", label: "Thai" },
  { value: "in", label: "Indonesian" },
  { value: "pl", label: "Polish" },
  { value: "cs", label: "Czech" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ja", label: "Japanese" },
  { value: "ro", label: "Romanian" },
  { value: "tr", label: "Turkish" },
  { value: "nl", label: "Dutch" },
  { value: "ru", label: "Russian" },
  { value: "uk", label: "Ukrainian" },
  { value: "en", label: "English" },
  { value: "tr", label: "Turkish" },
  { value: "ko", label: "Korean" },
  { value: "vi", label: "Vietnamese" },
  { value: "fr", label: "French" },
];

const includeOptions = [
  { value: true, label: "Include" },
  { value: false, label: "Dont Include" },
];

const Dashboard = () => {
  const { register, handleSubmit } = useForm();
  const [isBasic, setIsBasic] = useState(true);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!user) navigate("/", {replace: true});
    setLoading(false);
  }, []);

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Twevvy</title>
      </Helmet>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Navbar />
          <div className="containerKu my-8 px-20">
            <div className="shadow-md py-2 px-4 flex items-center justify-between rounded mb-5">
              <p className="text-[15px] truncate text-slate-700">
                {`
          <script
            src="https://twevvy.vercel.app/scripts/embed.min.js"
            async
            defer
            data-widget-id="95qietz8"
          ></script>`}
              </p>
              <div className="p-1 border-sky-500 border-[1.5px] text-sky-500 rounded hover:bg-sky-100 cursor-pointer">
                <Icon icon="fluent:clipboard-16-regular" width={24} />
              </div>
            </div>
            <div className=" flex gap-10">
              <div>
                <button className="py-3 w-full mb-6 px-4 rounded shadowCard flex items-center gap-2">
                  <Icon
                    icon="ant-design:twitter-outlined"
                    width={20}
                    className="text-sky-500"
                  />
                  <p className="font-semibold">See What They Said</p>
                </button>
                <div className="col-span-1 shadowCard max-w-sm rounded-md px-3 pt-4 pb-2 max-h-[420px] overflow-auto scroll">
                  <div className="flex justify-between items-center">
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
                    <button className="bg-slate-800 text-white py-[6px] hover:bg-slate-900 px-4 rounded-full font-semibold text-sm">
                      Follow
                    </button>
                  </div>
                  <div className="bg-sky-500 cursor-pointer py-1 font-semibold inter my-3 rounded text-white flex items-center justify-center">
                    <p className="text-[15px]">
                      13.211 Tweet about emrsyahh this week
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 mt-6">
                    {datas.map((d) => (
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
                            <p className="text-sm text-slate-600">
                              {d.username}
                            </p>
                          </div>
                        </div>
                        <p className="text-[15px] text-slate-900 mt-3">
                          {d.text}
                        </p>
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
              </div>
              <div className="flex gap-4">
                <form
                  className="col-span-1 shadow-xl rounded p-3 h-fit flex flex-col"
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <div className="flex items-center gap-10">
                    <h3 className="text-lg font-semibold">
                      Customize Your Twevvy
                    </h3>
                    <button className="bg-sky-500 flex items-center gap-2 text-white py-1 px-3 font-medium rounded">
                      <p>Save</p>
                      <Icon icon="fluent:save-24-filled" width={18} />
                    </button>
                  </div>
                  {isBasic ? (
                    <div className="flex flex-col gap-4 mt-3">
                      <div className="text-sm">
                        <p className="font-medium">Profile URL</p>
                        <input
                          type="text"
                          {...register("profile")}
                          placeholder="https://twitter.com/"
                          className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Button Label</p>
                        <input
                          type="text"
                          {...register("profile")}
                          placeholder="See What They Said"
                          className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Show Tweet Count?</p>
                        <Select
                          isSearchable={false}
                          options={countOptions}
                          defaultValue={countOptions[0]}
                          className="mt-1"
                          key={11}
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Tweet Amount</p>
                        <input
                          type="number"
                          {...register("profile")}
                          placeholder="1-15"
                          min={1}
                          max={15}
                          className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Custom Tweet</p>
                        <input
                          type="text"
                          {...register("profile")}
                          placeholder="https://twitter.com/"
                          className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                        />
                        <button className="bg-sky-500 w-full p-2 flex justify-center rounded-sm mt-2 text-white">
                          <Icon icon="akar-icons:plus" width={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 mt-3">
                      <div className="text-sm">
                        <p className="font-medium">Include Retweet?</p>
                        <Select
                          isSearchable={false}
                          options={includeOptions}
                          defaultValue={includeOptions[0]}
                          className="mt-1"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Include Reply?</p>
                        <Select
                          isSearchable={false}
                          options={includeOptions}
                          defaultValue={includeOptions[0]}
                          className="mt-1"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Tweet Language</p>
                        <Select
                          isSearchable={false}
                          options={langOption}
                          defaultValue={langOption[26]}
                          className="mt-1"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Match Our Good Words?</p>
                        <Select
                          isSearchable={false}
                          options={goodTweetOptions}
                          defaultValue={goodTweetOptions[0]}
                          className="mt-1"
                          key={12}
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">Filter Bad Word?</p>
                        <Select
                          isSearchable={false}
                          options={badWordOptions}
                          defaultValue={badWordOptions[0]}
                          className="mt-1"
                          key={10}
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">
                          Match Specific Words{" "}
                          <span className="text-slate-600">
                            (Comma Separated)
                          </span>
                        </p>
                        <input
                          type="text"
                          {...register("specific")}
                          placeholder="Comma Separated Words"
                          className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">
                          Ban Specific Words{" "}
                          <span className="text-slate-600">
                            (Comma Separated)
                          </span>
                        </p>
                        <input
                          type="text"
                          {...register("specific")}
                          placeholder="Comma Separated Words"
                          className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                        />
                      </div>
                    </div>
                  )}
                </form>
                <div className="flex flex-col gap-2 my-4">
                  <div
                    onClick={() => setIsBasic(true)}
                    className={`flex items-center gap-2 cursor-pointer text-slate-600 rounded py-1 pl-3 pr-6 shadow font-medium ${
                      isBasic && "!text-sky-500"
                    }`}
                  >
                    <Icon icon="ic:outline-format-list-bulleted" width={20} />
                    <p>Basic</p>
                  </div>
                  <div
                    onClick={() => setIsBasic(false)}
                    className={`flex items-center gap-2 cursor-pointer text-slate-600 rounded py-1 pl-3 pr-6 shadow font-medium ${
                      !isBasic && "!text-sky-500"
                    }`}
                  >
                    <Icon icon="carbon:filter" width={20} />
                    <p>Filter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
