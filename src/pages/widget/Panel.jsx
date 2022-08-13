import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestoreDb } from "../../../firebase";
import WidgetComponent from "../../components/WidgetComponent";
import transformData from "../../helpers/transformData";
import transformTweets from "../../helpers/transformTweets";
import axios from "axios";

const tweets = [
  {
    id: "1558348879535415297",
    username: "farrah_writes",
    img: "https://pbs.twimg.com/profile_images/1532018125079982080/r9F3D7M__bigger.jpg",
    name: "Farrah Garcia - Freelance Writer",
    verified: false,
    text: "8 New Social Media Platforms You Might Not Know About 👉  https://t.co/3Nv5r8OdwI via @buffer #socialmedia",
    date: "2022-08-13T07:05:00.000Z",
    link: "https://twitter.com/farrah_writes/status/1558348879535415297",
    like: 0,
  },
  {
    id: "1558307325412261890",
    username: "shawneexo_",
    img: "https://pbs.twimg.com/profile_images/1527845024251117569/KutYF49t_bigger.jpg",
    name: "shawnee.",
    verified: false,
    text: "@buffer’s recent blog post led to me creating a @Polywork profile.\n\nlove that there’s a platform out here for multi hyphenated creatives like moi 💅🏾 &amp; everything is aesthetic goals. &amp; from the looks of it, I’d rather spend my time on here posting content.\n https://t.co/3VFHiPcZN9",
    date: "2022-08-13T04:19:52.000Z",
    link: "https://twitter.com/shawneexo_/status/1558307325412261890",
    like: 0,
  },
  {
    id: "1558260805250043905",
    username: "ChrisMakara",
    img: "https://pbs.twimg.com/profile_images/1415028602513526787/iUdSGlqP_bigger.jpg",
    name: "Chris Makara 👽",
    verified: false,
    text: "Our Annual Charitable Contribution and How We Decide Which Charities to Support https://t.co/1L9l3NeX2k via @buffer https://t.co/r66OgjWMDE",
    date: "2022-08-13T01:15:01.000Z",
    link: "https://twitter.com/ChrisMakara/status/1558260805250043905",
    like: 0,
  },
  {
    id: "1558219630761709568",
    username: "BevanTing",
    img: "https://pbs.twimg.com/profile_images/1287267578201559040/IIAg-9Da_bigger.jpg",
    name: "Bevan Ting",
    verified: false,
    text: "The Bubble Chronicle is out! https://t.co/CH5El22FZt Stories via @buffer @SkyNewsAust @SunManUtd",
    date: "2022-08-12T22:31:24.000Z",
    link: "https://twitter.com/BevanTing/status/1558219630761709568",
    like: 0,
  },
  {
    id: "1558203941623664642",
    username: "Get_Shift",
    img: "https://pbs.twimg.com/profile_images/1411005172126416904/g4wcXbmA_normal.png",
    name: "Shift",
    verified: false,
    text: "Here are this week's stats straight from the Shift Community. New York is our new most productive city! E-Commerce is our rising industry for 2 weeks running! 🛒 #TWIW \n\n@buffer, @milanoteapp, @udemy.\n.\n.\n.\nNeed a productivity nudge? Sign up here: https://t.co/mz8sqWHtra https://t.co/7ia8fwTJK5",
    date: "2022-08-12T21:29:04.000Z",
    link: "https://twitter.com/Get_Shift/status/1558203941623664642",
    like: 0,
  },
  {
    id: "1558188857207574529",
    username: "Polywork",
    img: "https://pbs.twimg.com/profile_images/1556751951588630529/DO0etv0d_bigger.jpg",
    name: "Polywork",
    verified: false,
    text: "@buffer Thank you for including us!😁",
    date: "2022-08-12T20:29:07.000Z",
    link: "https://twitter.com/Polywork/status/1558188857207574529",
    like: 1,
  },
  {
    id: "1558168740629544961",
    username: "icze4r",
    img: "https://pbs.twimg.com/profile_images/1501372482674176002/L0RfTrfj_normal.png",
    name: "Margaret Gel",
    verified: false,
    text: "@multiplay3r @Polywork @tamioladipo @buffer oh nice, you got a media mention c: congrats!!",
    date: "2022-08-12T19:09:11.000Z",
    link: "https://twitter.com/icze4r/status/1558168740629544961",
    like: 0,
  },
  {
    id: "1558168081956016129",
    username: "krider2010",
    img: "https://pbs.twimg.com/profile_images/1324478821597368320/FfFZ4rHY_bigger.jpg",
    name: "Claire Knight",
    verified: false,
    text: "@buffer Not at all!",
    date: "2022-08-12T19:06:34.000Z",
    link: "https://twitter.com/krider2010/status/1558168081956016129",
    like: 1,
  },
  {
    id: "1558160665235394561",
    username: "GNSIorg",
    img: "https://pbs.twimg.com/profile_images/946137821961633792/bui29gQo_bigger.jpg",
    name: "Guild of Natural Science Illustrators",
    verified: false,
    text: "@may_gun @buffer Good point! We'll nudge them when we have a moment to breathe after the conference. :)",
    date: "2022-08-12T18:37:06.000Z",
    link: "https://twitter.com/GNSIorg/status/1558160665235394561",
    like: 0,
  },
  {
    id: "1558159488237969408",
    username: "may_gun",
    img: "https://pbs.twimg.com/profile_images/1461062426292486146/SliYxcj4_bigger.jpg",
    name: "Megan Lynch",
    verified: false,
    text: "@GNSIorg @buffer It's a great opportunity to lobby Buffer and say that accessibility is important to you as a customer. I urged another Sci acct to do that with their social media app and the app responded by adding that accessibility!",
    date: "2022-08-12T18:32:25.000Z",
    link: "https://twitter.com/may_gun/status/1558159488237969408",
    like: 0,
  },
  {
    id: "1558159214580736001",
    username: "GNSIorg",
    img: "https://pbs.twimg.com/profile_images/946137821961633792/bui29gQo_bigger.jpg",
    name: "Guild of Natural Science Illustrators",
    verified: false,
    text: "@may_gun Just turned it on, thanks! But unfortunately most of our posts are queued on @buffer, which we love but bypasses the reminder.",
    date: "2022-08-12T18:31:20.000Z",
    link: "https://twitter.com/RoqueLachica/status/1558159214580736001",
    like: 0,
  },
  {
    id: "1558148882617475073",
    username: "RoqueLachica",
    img: "https://pbs.twimg.com/profile_images/1223092365113446400/egPTpRuk_bigger.jpg",
    name: "RoqueLachica",
    verified: false,
    text: "Ever wanted to make your work life easier? \n\nClick here to find out about 10 marketing tools from @CharlieRiley which will help you. \n\nhttps://t.co/Dr1N3bGjq8  \n\n@appsumo @zapier @buffer @basecamp @quuu_co @mailchimp @GetScripted @Delighted @wistia @CV_Social",
    date: "2022-08-12T17:50:17.000Z",
    link: "https://twitter.com/dnsmichi/status/1558148882617475073",
    like: 1,
  },
  {
    id: "1558141838556598272",
    username: "dnsmichi",
    img: "https://pbs.twimg.com/profile_images/1558090418486747137/3M16Ii0v_normal.png",
    name: "Michael Friedrich, DevOps Twin 🖇🌈🌱",
    verified: false,
    text: ".@buffer: 8 Social Media Platforms You Need to Know\n\n@Polywork is @LinkedIn’s cooler, younger sister \n\n🎉\n\n https://t.co/3xMDQpIWcq",
    date: "2022-08-12T17:22:17.000Z",
    link: "https://twitter.com/Shuayb__/status/1558141838556598272",
    like: 0,
  },
  {
    id: "1558138098957041666",
    username: "Shuayb__",
    img: "https://pbs.twimg.com/profile_images/1553067862096584704/o0a5-xxe_bigger.jpg",
    name: "Shuayb",
    verified: false,
    text: "@multiplay3r @tamioladipo @buffer @Polywork looking forward to getting an app version 🙏🏾🙏🏾",
    date: "2022-08-12T17:07:26.000Z",
    link: "https://twitter.com/ericjwriting/status/1558138098957041666",
    like: 0,
  },
  {
    id: "1558137049437306880",
    username: "ericjwriting",
    img: "https://pbs.twimg.com/profile_images/1477400166466527236/a18OgMaZ_bigger.jpg",
    name: "Eric (EricJ) Johnson Author",
    verified: false,
    text: "@ShellyMonarch I do with @Buffer,  and  post the rest of the day",
    date: "2022-08-12T17:03:16.000Z",
    link: "https://twitter.com/undefined/status/1558137049437306880",
    like: 0,
  },
];

const widget = {
  profileUrl: "https://twitter.com/producthunt",
  buttonLabel: "See What They Said",
  showCount: { label: "Show", value: true },
  tweetAmount: 10,
  customTweet: [],
  filterRetweet: { label: "Dont Include", value: false },
  filterReply: { label: "Include", value: true },
  tweetLang: { label: "English", value: "en" },
  matchGood: { label: "Yes", value: true },
  banBad: { label: "Filter", value: true },
  matchSpecific: "",
  banSpecific: "",
  tweets: tweets,
  name: "ProductHunt",
  username: "ProductHunt",
  image:
    "https://pbs.twimg.com/profile_images/1418307222313054211/EF-ka8yB_bigger.jpg",
};

const urlProfile = `https://twevvy-be.herokuapp.com/api/v1/twitterProfile/`;
const urlCount = `https://twevvy-be.herokuapp.com/api/v1/countRecent/`;
const urlTweetIds = `https://twevvy-be.herokuapp.com/api/v1/tweetByIds`;
const urlTweetRecent = `https://twevvy-be.herokuapp.com/api/v1/tweetRecent`;

const Panel = () => {
  const { id } = useParams();
  const [widget, setWidget] = useState();
  const [loading, setLoading] = useState(true)

  const getWidget = async () => {
    const docRef = doc(firestoreDb, "widgets", id);
    const docSnap = await getDoc(docRef);

    // Handling error dan exception
    if (!docSnap.exists()) {
      console.error("Logs doesnt exist");
      //   navigate("/dashboard", { replace: true });
      return;
    }
    return docSnap.data();
  };

  useEffect(() => {
    try {
      getWidget().then(async (data) => {
        const { maxTweet, tweetQuery, username, tweetIds, showCount } =
          transformData({ ...data });
        // console.log({ maxTweet, tweetQuery, username, tweetIds, showCount })
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
        let structuredTweets = transformTweets(recent?.data);
        if (customTweet.length > 0) {
          structuredTweets = customTweet.concat(structuredTweets);
        }
        // console.log(structuredTweets)
        setWidget({
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
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);

  return <WidgetComponent {...widget} loading={loading} />;
};

export default Panel;
