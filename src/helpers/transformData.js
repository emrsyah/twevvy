import { badWords, goodWords } from "../data/queryData";

export default function transformData(data) {
  let regExtract = new RegExp(
    /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/
  );
  const username = data?.profileUrl.split(".com/")[1];
  const usernameMention = "@".concat(username);
  // const usernameMention = "@notionhq";
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
  const tweetIds = data.customTweets.length > 0 && data.customTweets.map(d=>d.match(regExtract)[3]).join(",");
  const showCount = data.showCount.value;
  return { maxTweet, tweetQuery, username, tweetIds, showCount };
}
