import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      {tags.length > 0 && (
        <div className="flex items-center gap-2.5 flex-wrap animate-fadeIn">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-[15px] font-medium
                bg-yellow-500/10 text-yellow-400
                px-4 py-2.5 rounded-xl border border-yellow-500/20
                group hover:bg-yellow-500/15 transition-all duration-300
                shadow-sm shadow-yellow-500/5"
            >
              <HiOutlineLocationMarker className="text-lg" />
              {tag}
              <button 
                onClick={() => handleRemoveTag(tag)}
                className="hover:bg-yellow-500/20 p-1 rounded-lg ml-1
                  transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <MdClose className="text-base" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <div
          className={`flex-1 bg-zinc-800/30 backdrop-blur-sm
            border rounded-xl transition-all duration-300
            ${isFocused 
              ? "border-yellow-500/50 shadow-lg shadow-yellow-500/10" 
              : "border-zinc-700/50 hover:border-zinc-600/50"
            }
          `}
        >
          <input
            type="text"
            value={inputValue}
            className="w-full text-[15px] font-medium bg-transparent 
              px-4 py-3.5 rounded-xl outline-none
              text-white/90 placeholder:text-zinc-400"
            placeholder="Enter destination name"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <button
          className="w-12 h-12 flex items-center justify-center rounded-xl
            bg-gradient-to-tr from-yellow-500 to-yellow-400 
            hover:from-yellow-400 hover:to-yellow-300
            transform hover:scale-110 transition-all duration-300 
            active:scale-95 shadow-lg shadow-yellow-500/30 
            hover:shadow-xl hover:shadow-yellow-500/40 group"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-black 
            group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;