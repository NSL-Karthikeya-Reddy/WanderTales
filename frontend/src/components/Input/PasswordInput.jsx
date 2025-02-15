import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div
      className={`flex items-center bg-zinc-800/30 backdrop-blur-sm px-5 rounded-xl 
        border transition-all duration-300
        ${isFocused 
          ? "border-yellow-500/50 shadow-lg shadow-yellow-500/10" 
          : "border-zinc-700/50 hover:border-zinc-600/50"
        }
      `}
    >
      <input
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"}
        className="w-full text-white/90 placeholder:text-zinc-400 bg-transparent 
          py-3.5 mr-3 rounded-xl outline-none text-[15px] font-medium
          transition-colors duration-300"
      />

      {isShowPassword ? (
        <FaRegEye
          size={20}
          className="text-yellow-400 cursor-pointer hover:text-yellow-300 
            transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={20}
          className="text-zinc-400 cursor-pointer hover:text-zinc-300
            transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;