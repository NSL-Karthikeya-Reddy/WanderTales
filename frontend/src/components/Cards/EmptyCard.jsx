import React from 'react';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="No notes" className="w-24 mb-6" /> {/* Added margin-bottom */}

      <p className="w-1/2 text-center leading-7 mt-5"> {/* Removed font-medium, added container for better spacing*/}
        {message.split('\n').map((line, index) => ( // Split message into lines and map them to <p> tags
          <p key={index} className="text-xl text-slate-700 mb-4"> {/* Increased font size, added margin between lines */}
            {line}
          </p>
        ))}
      </p>
    </div>
  );
};

export default EmptyCard;