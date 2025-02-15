import React, { useState } from "react";
import { MdOutlineDateRange, MdClose, MdCalendarToday } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import moment from "moment";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <div className="relative">
      {/* Date Button */}
      <button
        className="inline-flex items-center gap-2.5 px-4 py-2.5 
          bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 
          rounded-xl hover:bg-zinc-700/80 transition-all duration-300
          shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30
          group active:scale-95"
        onClick={() => setOpenDatePicker(true)}
      >
        <MdCalendarToday className="text-yellow-400 text-lg
          group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-white font-medium">
          {date
            ? moment(date).format("Do MMM YYYY")
            : moment().format("Do MMM YYYY")}
        </span>
      </button>

      {/* Date Picker Overlay */}
      {openDatePicker && (
        <div className="absolute top-full left-0 mt-2 z-50 animate-fadeIn">
          <div className="relative p-6 bg-zinc-800/90 backdrop-blur-xl rounded-2xl
            border border-zinc-700/50 shadow-2xl shadow-black/50">
            {/* Header with Close Button */}
            <div className="absolute top-0 left-0 right-0 px-4 py-3
              border-b border-zinc-700/50 flex items-center justify-between">
              <span className="text-yellow-400 font-medium flex items-center gap-2">
                <MdOutlineDateRange className="text-lg" />
                Select Date ✨
              </span>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg
                  bg-zinc-700/50 hover:bg-zinc-700 transition-all duration-300
                  hover:scale-110 active:scale-95 group"
                onClick={() => setOpenDatePicker(false)}
              >
                <MdClose className="text-lg text-zinc-400 
                  group-hover:text-yellow-400 group-hover:rotate-90
                  transition-all duration-300" />
              </button>
            </div>

            {/* Calendar with adjusted top padding */}
            <div className="pt-12">
              <DayPicker
                captionLayout="dropdown-buttons"
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setOpenDatePicker(false);
                }}
                className="!font-medium 
                  [&_.rdp-day]:!text-white/90
                  [&_.rdp-day_button:hover]:!bg-yellow-500/20 
                  [&_.rdp-day_button:focus]:!bg-yellow-500/20
                  [&_.rdp-button]:!text-yellow-400
                  [&_.rdp-day--selected]:!bg-yellow-500/30
                  [&_.rdp-day--selected]:!text-yellow-400
                  [&_.rdp-day--selected]:!font-bold
                  [&_.rdp-caption]:!mb-4"
              />
            </div>

            {/* Footer */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;