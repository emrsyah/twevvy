import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import TriggerButton from "../components/TriggerButton";
import WidgetComponent from "../components/WidgetComponent";
import {
  badWordOptions,
  countOptions,
  goodTweetOptions,
  includeOptions,
  langOption,
} from "../data/optionData";
import axios from "axios";
import { toast } from "react-toastify";
import transformData from "../helpers/transformData";
import transformTweets from "../helpers/transformTweets";
import CopyCode from "../components/CopyCode";
import { useParams } from "react-router";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import DeleteModal from "../components/DeleteModal";
import { deleteAtomState } from "../atoms/deleteAtom";

// const widget = {
//   profileUrl: "https://twitter.com/producthunt",
//   buttonLabel: "See What They Said",
//   showCount: { label: "Show", value: true },
//   tweetAmount: 10,
//   customTweet: [],
//   filterRetweet: { label: "Dont Include", value: false },
//   filterReply: { label: "Include", value: true },
//   tweetLang: { label: "English", value: "en" },
//   matchGood: { label: "Yes", value: true },
//   banBad: { label: "Filter", value: true },
//   matchSpecific: "",
//   banSpecific: "",
// };

const urlProfile = `https://twevvy-be.herokuapp.com/api/v1/twitterProfile/`;
const urlCount = `https://twevvy-be.herokuapp.com/api/v1/countRecent/`;
const urlTweetIds = `https://twevvy-be.herokuapp.com/api/v1/tweetByIds`;
const urlTweetRecent = `https://twevvy-be.herokuapp.com/api/v1/tweetRecent`;

const WidgetDashboard = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isDirty, isValid },
  } = useForm();
  const { id } = useParams();
  const [isBasic, setIsBasic] = useState(true);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [customTweets, setCustomTweets] = useState([]);
  const [widgetData, setWidgetData] = useState({});
  const [widgetLoading, setWidgetLoading] = useState(true);
  const [label, setLabel] = useState();
  const [prevProfileUrl, setPrevProfileUrl] = useState("");
  const [widgetForm, setWidgetForm] = useState();
  const setDelete = useSetRecoilState(deleteAtomState);

  useEffect(() => {
    setLoading(true);
    setWidgetLoading(true);
    if (!user) navigate("/", { replace: true });
    getWidget().then((data) => {
      setWidgetForm(data.data());
      // console.log(widgetForm)
      registerInput(data.data());
      setLoading(false);
      getTwitterData(data.data());
      setPrevProfileUrl(data.data().profileUrl);
    });
  }, []);

  const getWidget = async () => {
    const docRef = doc(firestoreDb, "widgets", id);
    const docSnap = await getDoc(docRef);

    // Handling error dan exception
    if (!docSnap.exists()) {
      console.error("Logs doesnt exist");
      navigate("/dashboard", { replace: true });
      return;
    }

    if (docSnap.data().userId !== user.userId) {
      console.error("Logs doesnt exist");
      navigate("/dashboard", { replace: true });
      return;
    }
    return docSnap;
  };

  const submitHandler = (data) => {
    getTwitterData(data).then((boolean) => {
      if (boolean) {
        updateWidgetFirebase(data);
      }
    });
  };

  const getTwitterData = async (data) => {
    try {
      setWidgetLoading(true);
      const { maxTweet, tweetQuery, username, tweetIds, showCount } =
        transformData({ ...data, customTweets: customTweets });
      setLabel(data.buttonLabel);
      let customTweet = [];
      const profile = await axios.get(urlProfile + username);
      const count = await axios.get(urlCount + username);
      if (tweetIds) {
        customTweet = await axios.post(urlTweetIds, {
          ids: tweetIds,
        });
        customTweet = transformTweets(customTweet?.data);
      }
      const recent = await axios.post(urlTweetRecent, {
        tweetQuery: tweetQuery,
        maxTweets: maxTweet,
      });
      if (
        profile.data.response.errors &&
        profile.data.response.errors[0].title === "Not Found Error"
      ) {
        throw new Error("Could not find data");
      }
      let structuredTweets = transformTweets(recent?.data);
      if (customTweet.length > 0) {
        structuredTweets = customTweet.concat(structuredTweets);
      }
      setWidgetData({
        image: profile.data.response.data.profile_image_url.replace(
          "normal.jpg",
          "bigger.jpg"
        ),
        verified: profile.data.response.data.verified,
        name: profile.data.response.data.name,
        username: profile.data.response.data.username,
        count: count.data.total,
        tweets: structuredTweets,
        showCount: showCount,
      });
      // console.log(structuredTweets)
      // console.log(profile.data.response.data.profile_image_url)
      setPrevProfileUrl(data.profileUrl);
      // updateWidgetFirebase(data);
      setWidgetLoading(false);
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Could not find twitter username");
      setValue("profileUrl", prevProfileUrl);
      setWidgetLoading(false);
      return false;
    }
  };

  const updateWidgetFirebase = async (data) => {
    await updateDoc(doc(firestoreDb, "widgets", id), {
      ...data,
      customTweet: customTweets,
      updatedAt: serverTimestamp(),
    });
  };

  const registerInput = (widget) => {
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
    // console.log(
    //   "https://twitter.com/DailyDevTips1/status/1556963228344877058".match(
    //     regExtract
    //   )
    // );
    setCustomTweets((twt) => [twtInput, ...twt]);
    setValue("customTweet", "");
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Twevvy</title>
      </Helmet>
      {loading || !widgetForm ? (
        <div>Loading...</div>
      ) : (
        <>
          <Navbar />
          <DeleteModal id={id} />
          <div className="containerKu my-8 2xl:px-20 xl:px-16 px-0">
            <CopyCode
              code={`
<script
  src="https://twevvy.vercel.app/scripts/embed.min.js"
  async
  defer
  data-widget-id="${id}"
></script>`}
            />
            <div className=" grid grid-cols-5 xl:gap-8 gap-6">
              <div className="flex col-span-2 flex-col gap-3 items-end">
                <TriggerButton label={label} />
                <WidgetComponent
                  // image="https://lh3.googleusercontent.com/a-/AFdZucp6A_VoFj4qsbHbmCdBHi7Oy2klN3JIiWVEiAs20mc=s96-c"
                  // name="emrsyh"
                  // username="emrsyahh"
                  // count="12.734"
                  {...widgetData}
                  // tweets={tweets}
                  loading={widgetLoading}
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
                        disabled={!isDirty || !isValid || widgetLoading}
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
                            defaultValue={widgetForm.profileUrl}
                            {...register("profileUrl")}
                            placeholder="https://twitter.com/"
                            className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Button Label</p>
                          <input
                            type="text"
                            defaultValue={widgetForm.buttonLabel}
                            {...register("buttonLabel")}
                            placeholder="See What They Said"
                            className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Show Tweet Count?</p>
                          <Controller
                            control={control}
                            defaultValue={widgetForm.showCount}
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
                            defaultValue={widgetForm.tweetAmount}
                            type="number"
                            {...register("tweetAmount", { min: 10, max: 20 })}
                            placeholder="10-20"
                            min={10}
                            max={20}
                            className="outline-none p-2 rounded-sm mt-1 w-full bg-slate-50 border-[1px] border-gray-300"
                          />
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">Custom Tweet</p>
                          <div className="flex gap-2 mt-2">
                            <input
                              defaultValue={widgetForm.customTweet}
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
                            {customTweets.map((tweet, i) => (
                              <div
                                key={i}
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
                            defaultValue={widgetForm.filterRetweet}
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
                            defaultValue={widgetForm.filterReply}
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
                            defaultValue={widgetForm.tweetLang}
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
                            defaultValue={widgetForm.matchGood}
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
                            defaultValue={widgetForm.banBad}
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
                            defaultValue={widgetForm.matchSpecific}
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
                            defaultValue={widgetForm.banSpecific}
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
                      className={`flex items-center gap-2 cursor-pointer text-slate-600 rounded py-1 pl-3 shadow font-medium ${
                        isBasic && "!text-sky-500"
                      }`}
                    >
                      <Icon
                        icon="ic:outline-format-list-bulleted"
                        className="md:inline hidden"
                        width={20}
                      />
                      <p>Basic</p>
                    </div>
                    <div
                      onClick={() => setIsBasic(false)}
                      className={`flex items-center gap-2 cursor-pointer text-slate-600 rounded py-1 pl-3 shadow font-medium ${
                        !isBasic && "!text-sky-500"
                      }`}
                    >
                      <Icon
                        icon="carbon:filter"
                        className="md:inline hidden"
                        width={20}
                      />
                      <p>Filter</p>
                    </div>
                    <div
                      onClick={() => setDelete(true)}
                      className={`flex hover:text-red-600 hover:bg-red-50 items-center gap-2 cursor-pointer text-slate-600 rounded py-1 pl-3 shadow font-medium`}
                    >
                      <Icon icon="carbon:trash-can" width={20}/>
                      <p className="col-span-11">Delete</p>
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

export default WidgetDashboard;
