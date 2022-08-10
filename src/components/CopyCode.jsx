import { Icon } from "@iconify/react";
import React from "react";

const CopyCode = ({code}) => {
  return (
    <div className="shadow-md py-2 px-4 flex items-center justify-between rounded mb-5">
      <p className="text-[15px] truncate text-slate-700">
        {code}
      </p>
      <div className="p-1 border-sky-500 border-[1.5px] text-sky-500 rounded hover:bg-sky-100 cursor-pointer">
        <Icon icon="fluent:clipboard-16-regular" width={24} />
      </div>
    </div>
  );
};

export default CopyCode;
