export default function transformTweets(datas) {
  const structured = datas.response.data.map((d, i) => {
    return {
      username: datas.response.includes.users[i]?.username,
      img: datas.response.includes.users[i]?.profile_image_url,
      name: datas.response.includes.users[i]?.name,
      verified: datas.response.includes.users[i]?.verified,
      text: d.text,
      date: d.created_at,
    };
  });
  return structured
}
