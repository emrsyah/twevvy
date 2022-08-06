import React from "react";
import { Icon } from "@iconify/react";

const TriggerButton = () => {
  return (
    <button className="py-3 w-full px-4 rounded shadowCard flex items-center gap-2">
      <Icon
        icon="ant-design:twitter-outlined"
        width={20}
        className="text-sky-500"
      />
      <p className="font-semibold">See What They Said</p>
    </button>
  );
};

export default TriggerButton;
