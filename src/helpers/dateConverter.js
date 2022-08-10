import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(isToday)

export default function dateConverter(date){
  const d = date?.split("T")[0]
  if(dayjs(d).isToday()){
    return dayjs(new Date(date)).fromNow()
  }
  return dayjs(d).format("MMM DD, YYYY")
}