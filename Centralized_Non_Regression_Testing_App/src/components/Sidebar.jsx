import React from "react";
import Bytel from "../assets/bytel.png";
import { NavLink } from "react-router-dom";
import Clipboard from "../assets/clipboard.png";
import Tasks from "../assets/tasks.png";

const Sidebar = () => {
  return (
    <div className="border w-56 bg-white fixed h-full">
      <div className="border flex justify-center items-center py-10">
        <img className="w-20" src={Bytel} alt="" />
      </div>
      <div className="flex flex-col items-center mt-7 gap-9">
        <NavLink
          to="/testscenarios"
          className="h-16 w-16 bg-zinc-100 flex items-center justify-center rounded-md"
        >
          <img className="w-6" src={Tasks} alt="" />
        </NavLink>
        <NavLink
          to="testcases"
          className="h-16 w-16 bg-zinc-100 flex items-center justify-center rounded-md"
        >
          <img className="w-6" src={Clipboard} alt="" />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
