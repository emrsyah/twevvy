import React from "react";
import { Icon } from "@iconify/react";

const TriggerButton = ({label}) => {
  return (
    <button className="py-3 px-4 overflow-hidden rounded w-56 shadowCard flex items-center gap-3">
      <Icon
        icon="ant-design:twitter-outlined"
        width={22}
        className="text-sky-500"
      />
      <p className="font-semibold text-left text-sm truncate">{label}</p>
    </button>
  );
};

export default TriggerButton;
