import React from 'react';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import moment from 'moment';

const ViewTravelStory = ({ storyInfo, onClose, onEditClick, onDeleteClick }) => {
  if (!storyInfo) return null;

  return (
    <div className="relative max-h-[90vh] bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl shadow-black/20 overflow-hidden animate-fadeIn">
      {/* Header Section with Gradient */}
      <div className="relative h-48 w-full bg-gradient-to-r from-zinc-800 via-yellow-500/10 to-zinc-800 p-6">
        {/* Title with larger size and gradient text */}
        <div className="h-full flex flex-col justify-between">
          <h2 className="text-4xl font-bold text-white mb-4 
            bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            {storyInfo.title}
          </h2>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
            <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg
              border border-white/10">
              <span className="text-lg">📍</span> 
              {Array.isArray(storyInfo.visitedLocation) 
                ? storyInfo.visitedLocation.join(', ')
                : storyInfo.visitedLocation}
            </span>
            <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg
              border border-white/10">
              <span className="text-lg">📅</span> 
              {moment(storyInfo.visitedDate).format('MMMM DD, YYYY')}
            </span>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
      </div>

      {/* Header Actions */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
        <button
          onClick={onEditClick}
          className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 
            hover:from-yellow-400 hover:to-yellow-300 text-black font-medium rounded-xl
            flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95
            shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30"
        >
          <MdEdit className="text-lg" /> Edit
        </button>
        <button
          onClick={onDeleteClick}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 
            hover:from-red-400 hover:to-red-300 text-white font-medium rounded-xl
            flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95
            shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30"
        >
          <MdDelete className="text-lg" /> Delete
        </button>
        <button
          onClick={onClose}
          className="p-2 text-zinc-400 hover:text-white transition-colors duration-300
            hover:bg-zinc-800/50 rounded-xl"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 max-h-[calc(90vh-192px)] overflow-y-auto custom-scrollbar">
        {/* Story Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg">
            {storyInfo.story}
          </p>
        </div>
      </div>
    </div>
  );
};

// Keep the same custom scrollbar and animation styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(39, 39, 42, 0.2);
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(234, 179, 8, 0.2);
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(234, 179, 8, 0.3);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ViewTravelStory;