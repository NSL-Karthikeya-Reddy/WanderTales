import React, { useEffect, useRef, useState } from "react";
import { MdFileUpload, MdDeleteOutline, MdOutlineImage } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    handleDeleteImg();
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (previewUrl && typeof previewUrl === "string" && !image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className={`w-full h-[220px] relative overflow-hidden rounded-2xl
            border-2 border-dashed transition-all duration-300 group
            ${isDragging 
              ? 'border-yellow-400/70 bg-zinc-800/50' 
              : 'border-zinc-700/50 bg-zinc-800/30'
            }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-yellow-400/5 
            group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 transition-all duration-300" />
          
          <button
            className="w-full h-full flex flex-col items-center justify-center gap-5 
              backdrop-blur-sm relative z-10"
            onClick={onChooseFile}
          >
            {/* Icon Container */}
            <div className="w-16 h-16 flex items-center justify-center rounded-xl
              bg-zinc-900/50 border border-zinc-700/50 group-hover:scale-110
              transition-transform duration-300 shadow-lg shadow-black/20">
              {isDragging ? (
                <MdFileUpload className="text-3xl text-yellow-400" />
              ) : (
                <MdOutlineImage className="text-3xl text-yellow-400" />
              )}
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="text-white font-medium mb-1">
                {isDragging ? '✨ Drop your image here ✨' : '📸 Upload your travel photo'}
              </p>
              <p className="text-sm text-zinc-400">
                Drag & drop or click to browse
              </p>
            </div>
          </button>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden animate-fadeIn
          shadow-xl shadow-black/30 group">
          <img 
            src={previewUrl} 
            alt="Selected" 
            className="w-full h-[300px] object-cover transition-transform 
              duration-500 group-hover:scale-105" 
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Delete Button */}
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
              bg-black/30 backdrop-blur-md rounded-xl border border-white/10
              opacity-0 group-hover:opacity-100 transition-all duration-300
              hover:bg-black/50 hover:scale-110 active:scale-95"
            onClick={handleRemoveImage}
          >
            <MdDeleteOutline className="text-xl text-white hover:text-red-400
              transition-colors duration-300" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;