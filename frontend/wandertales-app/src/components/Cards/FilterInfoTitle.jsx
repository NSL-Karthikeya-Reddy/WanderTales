import moment from "moment";
import React from "react";
import { MdOutlineClose, MdFilterAlt } from "react-icons/md";

const FilterInfoTitle = ({ filterType, filterDates, onClear }) => {
  const DateRangeChip = ({ date }) => {
    const startDate = date?.from
      ? moment(date?.from).format("Do MMM YYYY")
      : "N/A";
    const endDate = date?.to ? moment(date?.to).format("Do MMM YYYY") : "N/A";

    return (
      <div className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm 
        border border-zinc-700/50 px-4 py-2 rounded-xl shadow-lg shadow-black/20
        animate-fadeIn">
        <span className="text-yellow-400">
          <MdFilterAlt className="text-lg" />
        </span>
        <p className="text-sm font-medium text-white">
          {startDate} - {endDate}
        </p>

        <button 
          onClick={onClear}
          className="ml-2 p-1 hover:bg-zinc-700/50 rounded-full 
            transition-all duration-300 hover:text-yellow-400
            active:scale-95"
        >
          <MdOutlineClose className="text-lg" />
        </button>
      </div>
    );
  };

  return (
    filterType && (
      <div className="mb-5 animate-fadeIn">
        {filterType === "search" ? (
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-medium text-white">
              ✨ Search Results
            </h3>
            <button 
              onClick={onClear}
              className="px-3 py-1.5 text-sm bg-zinc-800/80 backdrop-blur-sm 
                border border-zinc-700/50 rounded-xl hover:bg-zinc-700/80 
                transition-all duration-300 text-zinc-400 hover:text-yellow-400
                shadow-lg shadow-black/20 active:scale-95"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-medium text-white">
              🌍 Travel Stories from
            </h3>
            <DateRangeChip date={filterDates} />
          </div>
        )}
      </div>
    )
  );
};

export default FilterInfoTitle;