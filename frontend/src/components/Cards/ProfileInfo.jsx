import React from "react";
import { getInitials } from "../../utils/helper";
import { MdLogout } from "react-icons/md";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-4 animate-fadeIn">
        {/* Profile Avatar */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl 
          bg-gradient-to-tr from-yellow-500/20 to-yellow-400/20 
          backdrop-blur-sm border border-yellow-400/20 
          shadow-lg shadow-black/20">
          <span className="text-yellow-400 font-medium text-lg">
            {getInitials(userInfo ? userInfo.fullName : "")}
          </span>
        </div>

        <div className="flex flex-col">
          {/* User Name */}
          <p className="text-sm font-medium text-white">
            {userInfo.fullName || ""}
          </p>
          
          {/* Logout Button */}
          <button
            className="text-sm text-zinc-400 hover:text-yellow-400 
              flex items-center gap-1.5 mt-0.5 transition-colors duration-300 
              group"
            onClick={onLogout}
          >
            <MdLogout className="text-base group-hover:rotate-90 transition-transform duration-300" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;