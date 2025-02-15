import moment from "moment/moment";
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

const TravelStoryCard = ({
  imgUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl backdrop-blur-sm
      border border-zinc-700/50 bg-zinc-800/30 hover:bg-zinc-800/50
      transition-all duration-300 cursor-pointer animate-fadeIn
      hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden" onClick={onClick}>
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500
            group-hover:scale-110"
        />
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Favorite Button */}
      <button
        className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center
          bg-black/30 backdrop-blur-md rounded-xl border border-white/10
          transition-all duration-300 hover:scale-110 active:scale-95
          hover:bg-black/50 group/btn"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`text-xl transition-all duration-300
            ${isFavourite 
              ? "text-red-500 group-hover/btn:text-red-400" 
              : "text-zinc-400 group-hover/btn:text-white"}`}
        />
      </button>

      {/* Content */}
      <div className="p-5" onClick={onClick}>
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1">
            <h6 className="text-lg font-medium text-white mb-1 line-clamp-1">
              {title}
            </h6>
            <span className="text-sm text-yellow-400/90">
              🗓️ {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
          {story}
        </p>

        <div className="flex flex-wrap gap-2">
          {visitedLocation.map((location, index) => (
            <div key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 
                bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-700/50
                text-sm text-white shadow-lg shadow-black/20"
            >
              <MdLocationOn className="text-yellow-400" />
              {location}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;