import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import TriggerButton from "../components/TriggerButton";
import WidgetComponent from "../components/WidgetComponent";
import { widgetState } from "../atoms/widgetAtom";
import {
  badWordOptions,
  countOptions,
  goodTweetOptions,
  includeOptions,
  langOption,
} from "../data/optionData";
import { badWords, goodWords } from "../data/queryData";
import axios from "axios";
import { toast } from "react-toastify";

const widget = {
  profileUrl: "https://twitter.com/emrsyahh",
  buttonLabel: "See What They Said",
  showCount: { label: "Show", value: true },
  tweetAmount: 10,
  customTweet: [],
  filterRetweet: { label: "Include", value: true },
  filterReply: { label: "Include", value: true },
  tweetLang: { label: "English", value: "en" },
  matchGood: { label: "Yes", value: true },
  banBad: { label: "Filter", value: true },
  matchSpecific: "",
  banSpecific: "",
};

const tweets = [
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
    text: "Hold up, aint you nathaniel b🤨",
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

// const myHeaders = new Headers();
// myHeaders.append(
//   "Authorization",
//   `Bearer ${import.meta.env.VITE_REACT_APP_BEARER_TOKEN}`
// );

const urlProfile = `https://twevvy-be.herokuapp.com/api/v1/twitterProfile/`;
const urlCount = `https://twevvy-be.herokuapp.com/api/v1/countRecent/`;
const urlTweetIds = `http://twevvy-be.herokuapp.com/api/v1/tweetByIds`;

// TODO Ekstrak Widget Component
// ! Problem : Data yang object di form gak ke detek - kemungkinan krn masalah yg this object ATAU krn react select ama react hook formnya gak saling support, form filter gak kedetek misalnya gak ngebuka mrk - jadi harus dibuka dulu baru kedetek - kalo langsung save di basci sebelum buka  filter dia gak bakalan ada.

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isDirty, isValid },
  } = useForm();
  const [isBasic, setIsBasic] = useState(true);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const [widgetAtom, setWidgetAtom] = useRecoilState(widgetState)
  const [customTweets, setCustomTweets] = useState([
    "https://twitter.com/xavierofficials/status/1556895212030644224",
    "https://twitter.com/FarzaTV/status/1556864174185074688",
    "https://twitter.com/YajasSardana/status/1556874006544138240",
  ]);

  useEffect(() => {
    setLoading(true);
    if (!user) navigate("/", { replace: true });
    registerInput();
    getTwitterData(widget);
    setLoading(false);
  }, []);

  const submitHandler = (data) => {
    // console.log(data);
    getTwitterData(data);
  };

  const transformData = (data) => {
    const username = data?.profileUrl.split(".com/")[1];
    // const usernameMention = "@".concat(username);
    const usernameMention = "@notionhq";
    const lang = data?.tweetLang.value ? `lang:${data?.tweetLang.value}` : "";
    const isRetweet = data?.filterRetweet.value ? "" : "-is:retweet";
    const isReply = data?.filterReply.value ? "" : "-is:reply";
    const matchGood = data?.matchGood.value ? goodWords : "";
    const banBad = data?.banBad.value ? badWords : "";
    const matchSpecific = data?.matchSpecific.split(",").join(" ");
    const maxTweet = data?.tweetAmount;
    const banSpecific =
      data?.banSpecific !== ""
        ? data?.banSpecific
            .split(",")
            .map((d) => `-${d}`)
            .join(" ")
        : "";

    const tweetQuery = "".concat(
      usernameMention,
      " ",
      lang,
      " ",
      isRetweet,
      " ",
      isReply,
      " ",
      matchGood,
      " ",
      banBad,
      " ",
      matchSpecific,
      " ",
      banSpecific
    );
    return { maxTweet, tweetQuery, username };
  };

  const getTwitterData = async (data) => {
    const countQuery = "@tailwindcss OR tailwindcss OR #tailwindcss";
    const { maxTweet, tweetQuery, username } = transformData(data);
    const res = await axios.get(urlCount + "notionhq")
    console.log(res.data);
  };

  const registerInput = () => {
    register("filterRetweet");
    setValue("filterRetweet", widget.filterRetweet);
    register("filterReply");
    setValue("filterReply", widget.filterReply);
    register("tweetLang");
    setValue("tweetLang", widget.tweetLang);
    register("matchGood");
    setValue("matchGood", widget.matchGood);
    register("banBad");
    setValue("banBad", widget.banBad);
    register("matchSpecific");
    setValue("matchSpecific", widget.matchSpecific);
    register("banSpecific");
    setValue("banSpecific", widget.banSpecific);
  };

  const addCustomTweetHandler = () => {
    const twtInput = getValues("customTweet");
    let regValidUrl = new RegExp(/(?<=https:\/\/twitter.com\/).*$/);
    let regExtract = new RegExp(
      /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/
    );
    if (!regValidUrl.test(twtInput)) {
      toast.error("URL is Invalid", { autoClose: 1500 });
      return;
    }
    console.log(
      "https://twitter.com/DailyDevTips1/status/1556963228344877058".match(
        regExtract
      )
    );
    setCustomTweets((twt) => [...twt, twtInput]);
    setValue("customTweet", "");
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
          <div className="containerKu my-8 2xl:px-20 xl:px-16 px-0">
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
            <div className=" grid grid-cols-5 xl:gap-8 gap-6">
              <div className="flex col-span-2 flex-col gap-3">
                <TriggerButton label={"See What They Said"} />
                <WidgetComponent
                  image="https://lh3.googleusercontent.com/a-/AFdZucp6A_VoFj4qsbHbmCdBHi7Oy2klN3JIiWVEiAs20mc=s96-c"
                  name="emrsyh"
                  username="emrsyahh"
                  count="12.734"
                  tweets={tweets}
                />
              </div>
              <div className="flex col-span-3 gap-3 flex-col">
                <div className="bg-sky-100 border-2 font-medium border-sky-500 flex items-center gap-2 rounded text-sky-600 py-2 px-4">
                  <Icon icon="ant-design:info-circle-outlined" width={20} />
                  <p>Save to see widget changes</p>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  <form
                    className=" col-span-4 shadow-xl max-w-md w-full rounded p-3 h-fit flex flex-col"
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <div className="flex items-center justify-between gap-10">
                      <h3 className="text-lg font-semibold">
                        Customize Your Twevvy
                      </h3>
                      <button
                        disabled={!isDirty || !isValid}
                        type="submit"
                        className={`bg-sky-500 flex items-center gap-2 text-white py-1 px-3 font-medium rounded ${
                          (!isDirty || !isValid) && "bg-sky-300"
                        }`}
                      >
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
                            defaultValue={widget.profileUrl}
                            {...register("profileUrl")}
                            placeholder="https://twitter.com/"
                            className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Button Label</p>
                          <input
                            type="text"
                            defaultValue={widget.buttonLabel}
                            {...register("buttonLabel")}
                            placeholder="See What They Said"
                            className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Show Tweet Count?</p>
                          <Controller
                            control={control}
                            defaultValue={widget.showCount}
                            name="showCount"
                            key={11}
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                inputRef={ref}
                                {...register("showCount")}
                                isSearchable={false}
                                options={countOptions}
                                className="mt-1"
                                key={11}
                                value={countOptions.find(
                                  (c) => c.value === value.value
                                )}
                                onChange={(val) => onChange(val)}
                              />
                            )}
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Tweet Amount</p>
                          <input
                            defaultValue={widget.tweetAmount}
                            type="number"
                            {...register("tweetAmount", { min: 10, max: 15 })}
                            placeholder="10-15"
                            min={10}
                            max={15}
                            className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Custom Tweet</p>
                          <div className="flex gap-2 mt-2">
                            <input
                              defaultValue={widget.customTweet}
                              type="text"
                              {...register("customTweet")}
                              placeholder="https://twitter.com/"
                              className="outline-none p-2 flex-grow rounded-sm w-full bg-slate-50 border-[1px] border-gray-300"
                            />
                            <button
                              onClick={() => addCustomTweetHandler()}
                              type="button"
                              className="bg-sky-500 items-center p-2 flex-1 flex justify-center rounded-sm text-white"
                            >
                              <Icon icon="akar-icons:plus" width={18} />
                            </button>
                          </div>
                        </div>
                        {customTweets.length > 0 && (
                          <div className="flex flex-col gap-4 border-t-[1px] pt-3 border-t-gray-300 w-full">
                            {customTweets.map((tweet) => (
                              <div
                                key={tweet}
                                className="text-sm font-medium items-center flex gap-1"
                              >
                                <p className="flex-grow bg-sky-100 p-2 truncate rounded text-sky-600">
                                  {tweet}
                                </p>
                                <div
                                  className="p-2 text-slate-500 cursor-pointer hover:text-red-600"
                                  onClick={() =>
                                    setCustomTweets((tweets) =>
                                      tweets.filter((t) => t !== tweet)
                                    )
                                  }
                                >
                                  <Icon icon="heroicons-solid:x" width={18} />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 mt-3">
                        <div className="text-sm">
                          <p className="font-medium">Include Retweet?</p>
                          <Controller
                            control={control}
                            defaultValue={widget.filterRetweet}
                            name="filterRetweet"
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                inputRef={ref}
                                {...register("filterRetweet")}
                                isSearchable={false}
                                options={includeOptions}
                                className="mt-1"
                                value={includeOptions.find(
                                  (c) => c.value === value.value
                                )}
                                onChange={(val) => onChange(val)}
                              />
                            )}
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Include Reply?</p>
                          <Controller
                            control={control}
                            defaultValue={widget.filterReply}
                            name="filterReply"
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                inputRef={ref}
                                {...register("filterReply")}
                                isSearchable={false}
                                options={includeOptions}
                                className="mt-1"
                                value={includeOptions.find(
                                  (c) => c.value === value.value
                                )}
                                onChange={(val) => onChange(val)}
                              />
                            )}
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Tweet Language</p>
                          <Controller
                            control={control}
                            defaultValue={widget.tweetLang}
                            name="tweetLang"
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                inputRef={ref}
                                name="tweetLang"
                                {...register("tweetLang")}
                                isSearchable={true}
                                options={langOption}
                                key={20}
                                className="mt-1"
                                value={langOption.find(
                                  (c) => c.value === value.value
                                )}
                                onChange={(val) => onChange(val)}
                              />
                            )}
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Match Our Good Words?</p>
                          <Controller
                            control={control}
                            defaultValue={widget.matchGood}
                            name="matchGood"
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                inputRef={ref}
                                {...register("matchGood")}
                                isSearchable={false}
                                options={goodTweetOptions}
                                className="mt-1"
                                value={goodTweetOptions.find(
                                  (c) => c.value === value.value
                                )}
                                onChange={(val) => onChange(val)}
                              />
                            )}
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Filter Bad Word?</p>
                          <Controller
                            control={control}
                            defaultValue={widget.banBad}
                            name="banBad"
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                inputRef={ref}
                                {...register("banBad")}
                                isSearchable={false}
                                options={badWordOptions}
                                className="mt-1"
                                value={badWordOptions.find(
                                  (c) => c.value === value.value
                                )}
                                onChange={(val) => onChange(val)}
                              />
                            )}
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
                            defaultValue={widget.matchSpecific}
                            {...register("matchSpecific")}
                            type="text"
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
                            defaultValue={widget.banSpecific}
                            {...register("banSpecific")}
                            type="text"
                            placeholder="Comma Separated Words"
                            className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                          />
                        </div>
                      </div>
                    )}
                  </form>
                  <div className="flex col-span-1 flex-col gap-2">
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
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
