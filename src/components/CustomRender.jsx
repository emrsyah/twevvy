import React from "react";

const CustomRender = ({ text }) => {
  // const regHashtags = new RegExp(/\(#[a-zA-Z\d_-]+)/gi);
  // const regMentions = new RegExp(/(^|)(@[a-zA-Z0-9\d-]+)/gi);
  // const regUrls = new RegExp(
  //   /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z09+&@#\/%=~_|])/gim
  // );
  var parts = text.split(" ")
  for (var i = 0; i < parts.length; i++) {
    if (
      parts[i].includes("https://") ||
      parts[i].includes("#") ||
      parts[i].includes("@")
    ) {
      parts[i] = (
        <span className="text-sky-500" key={i}>
          {" "}
          {parts[i]}{" "}
        </span>
      );
    } else {
      parts[i] = <span key={i}>{" "}{parts[i]}{" "}</span>;
    }
  }
  // console.log(parts)
  //   parts.replace(regHashtags || regMentions || regUrls)
  return <div>{parts}</div>;
};

export default CustomRender;
