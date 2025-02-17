import React from 'react';

const EmptyCard = ({ message }) => { // Removed imgSrc from props
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-1/2 text-center leading-7">
        {message.split('\n').map((line, index) => (
          <p key={index} className="text-xl text-slate-700 mb-4">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EmptyCard;