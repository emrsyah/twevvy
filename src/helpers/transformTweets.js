export default function transformTweets(datas) {
  console.log(datas.response)
  if(datas.length === 0) return []
  const structured = datas.response.data.map((d, i) => {
    const userPosition = datas.response.includes.users.findIndex(u=>u.id === d.author_id)
    return {
      username: datas.response.includes.users[userPosition]?.username,
      img: datas.response.includes.users[userPosition]?.profile_image_url.replace('normal.jpg', 'bigger.jpg'),
      name: datas.response.includes.users[userPosition]?.name,
      verified: datas.response.includes.users[userPosition]?.verified,
      text: d.text,
      date: d.created_at,
      link: `https://twitter.com/${datas.response.includes.users[i]?.username}/status/${d.id}`,
      like: d.public_metrics.like_count
    };
  });
  return structured
}
