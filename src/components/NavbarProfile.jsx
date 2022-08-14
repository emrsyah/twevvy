import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

function NavbarProfile({ img }) {
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      signOut(auth);
      navigate('/')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Menu className="relative" as="div">
      <Menu.Button className="flex shadow gap-3 py-2 px-4 hover:bg-gray-50 rounded-lg items-center bg-white">
        <p className="font-semibold sm:text-base text-sm text-slate-800">Account</p>
        {/* <img
            src={
              "https://avatars.dicebear.com/api/micah/emrsyhh.svg"
            }
            alt="profile"
            className="w-11 h-11 border-2 border-sky-400 rounded-full"
          /> */}
        <img
          src={img}
          alt="profile"
          className="sm:w-11 sm:h-11 h-7 w-7 border-2 border-sky-400 rounded-full"
        />
        {/* <div className="w-9 h-9 bg-sky-400 rounded-full"></div> */}
      </Menu.Button>
      <Menu.Items className="absolute right-0 flex sm:text-base text-sm flex-col py-1 rounded bg-white gap-[2px] mt-1 md:w-36 shadow-lg font-medium">
        <Menu.Item>
          {({ active }) => (
            <Link
              className={` px-2 md:px-4  py-[6px] !z-20 items-center cursor-pointer flex gap-[10px] ${
                active && "bg-gray-100"
              }`}
              to="/dashboard"
            >
              <Icon icon="bx:home-alt-2" width="18" /> 
              <p>Dashboard</p>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={` px-2 md:px-4 py-[6px] !z-20 items-center cursor-pointer flex gap-[10px]  ${
                active && "bg-gray-100 text-red-500"
              }`}
              onClick={logoutHandler}
            >
              <Icon icon="carbon:logout" width="18" />
              <p className="font-medium">Logout</p>
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default NavbarProfile;
