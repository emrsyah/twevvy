import React from "react";
import { Icon } from "@iconify/react";

const TriggerButton = ({label}) => {
  return (
    <button className="py-3 w-full px-4 rounded shadowCard flex items-center gap-3">
      <Icon
        icon="ant-design:twitter-outlined"
        width={25}
        className="text-sky-500"
      />
      <p className="font-semibold text-left">{label}</p>
    </button>
  );
};

export default TriggerButton;
