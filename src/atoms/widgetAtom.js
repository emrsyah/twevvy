import { atom } from "recoil";

export const widgetState = atom({
  key: "widgetState",
  default: {
    profileUrl: "https://twitter.com/emrsyahh",
    buttonLabel: "See What They Said",
    filterCount: {label: "Show", value: true},
    tweetAmount: 5,
    customTweet: [],
    filterRetweet: {label: "Include", value: true},
    filterReply: {label: "Include", value: true},
    tweetLang: {label: "English", value: "en"},
    matchGood: {label: "Yes", value: true},
    banBad: {label: "Filter", value: true},
    matchSpecific: [],
    banSpecific: [],
  },
});