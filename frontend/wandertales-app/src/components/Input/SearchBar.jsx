import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const getPlaceholder = () => {
    const placeholders = [
      "Search stories ✨",
      "Find memories 💭",
      "Explore adventures 🌟",
      "Discover moments 🎈",
      "Search travels 🗺️"
    ];
    // Return a random placeholder
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  };

  return (
    <div
      className={`w-80 flex items-center px-4 bg-zinc-800/30 backdrop-blur-sm
        border rounded-xl transition-all duration-300 group
        ${isFocused 
          ? "border-yellow-500/50 shadow-lg shadow-yellow-500/10" 
          : "border-zinc-700/50 hover:border-zinc-600/50"
        }
      `}
    >
      {isFocused ? (
        <span className="text-base mr-3 animate-bounce">🔍</span>
      ) : (
        <FaMagnifyingGlass
          className={`text-base transition-colors duration-300 mr-3
            ${isFocused 
              ? "text-yellow-400" 
              : "text-zinc-400 group-hover:text-zinc-300"
            }
          `}
        />
      )}

      <input
        type="text"
        placeholder={getPlaceholder()}
        className="w-full text-[15px] font-medium bg-transparent py-3.5 outline-none
          text-white/90 placeholder:text-zinc-400
          transition-colors duration-300"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {value && (
        <IoMdClose
          className="text-xl text-zinc-400 cursor-pointer hover:text-zinc-300
            transition-all duration-300 hover:scale-110 active:scale-95
            animate-fadeIn"
          onClick={onClearSearch}
        />
      )}

      {value && (
        <button
          onClick={handleSearch}
          className="ml-3 px-3 py-1.5 text-sm font-medium
            bg-yellow-500/10 hover:bg-yellow-500/20
            text-yellow-400 hover:text-yellow-300
            rounded-lg transition-all duration-300
            hover:scale-105 active:scale-95
            flex items-center gap-1.5"
        >
          Search 
          <span className="animate-pulse">✨</span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;