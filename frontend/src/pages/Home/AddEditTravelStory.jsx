import React, { useState } from "react";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import DateSelector from "../../components/Input/DateSelector";
import ImageSelector from "../../components/Input/ImageSelector";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-toastify";

// Add custom styles to head
const styles = `
  /* Custom Scrollbar Styles */
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

  /* Animations */
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

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || null
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add New Travel Story
  const addNewTravelStory = async () => {
    try {
      setIsSubmitting(true);
      let imageUrl = "";

      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/add-travel-story", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success("✨ Story Added Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Travel story
  const updateTravelStory = async () => {
    try {
      setIsSubmitting(true);
      const storyId = storyInfo._id;
      let imageUrl = "";

      let postData = {
        title,
        story,
        imageUrl: storyInfo.imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      };

      if (typeof storyImg === "object") {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes?.imageUrl || "";
        postData = { ...postData, imageUrl };
      }

      const response = await axiosInstance.put(`/edit-story/${storyId}`, postData);

      if (response.data && response.data.story) {
        toast.success("🌟 Story Updated Successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title.trim()) {
      setError("Please enter the title");
      return;
    }

    if (!story.trim()) {
      setError("Please enter the story");
      return;
    }

    setError("");
    if (type === "edit") {
      updateTravelStory();
    } else {
      addNewTravelStory();
    }
  };

  const handleDeleteStoryImg = async () => {
    try {
      const deleteImgRes = await axiosInstance.delete("/delete-image", {
        params: { imageUrl: storyInfo.imageUrl },
      });

      if (deleteImgRes.data) {
        const storyId = storyInfo._id;
        const postData = {
          title,
          story,
          visitedLocation,
          visitedDate: moment().valueOf(),
          imageUrl: "",
        };

        await axiosInstance.put(`/edit-story/${storyId}`, postData);
        setStoryImg(null);
        toast.success("🗑 Image Deleted Successfully");
      }
    } catch (error) {
      toast.error("Failed to delete Image");
    }
  };

  return (
    <div className="relative max-h-[90vh] bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl shadow-black/20 overflow-hidden animate-fadeIn">
      {/* Header Section */}
      <div className="p-6 border-b border-zinc-700/50 bg-black/20">
        <div className="flex items-center justify-between">
          <h5 className="text-2xl font-medium text-white flex items-center gap-2">
            {type === "add" ? (
              <>✨ Add New Story</>
            ) : (
              <>🌟 Update Story</>
            )}
          </h5>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3">
              {type === "add" ? (
                <button 
                  className={`px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 
                    hover:from-yellow-400 hover:to-yellow-300 text-black font-medium rounded-xl
                    flex items-center gap-2 transition-all duration-300 
                    hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100
                    shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30`}
                  onClick={handleAddOrUpdateClick}
                  disabled={isSubmitting}
                >
                  <MdAdd className="text-lg" />
                  {isSubmitting ? "ADDING..." : "ADD STORY"}
                </button>
              ) : (
                <button 
                  className={`px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400
                    hover:from-yellow-400 hover:to-yellow-300 text-black font-medium rounded-xl
                    flex items-center gap-2 transition-all duration-300
                    hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100
                    shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30`}
                  onClick={handleAddOrUpdateClick}
                  disabled={isSubmitting}
                >
                  <MdUpdate className="text-lg" />
                  {isSubmitting ? "UPDATING..." : "UPDATE STORY"}
                </button>
              )}

              <button 
                className="p-2 text-zinc-400 hover:text-white transition-colors duration-300
                  hover:bg-zinc-800/50 rounded-xl"
                onClick={onClose}
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-2 animate-shake">
                ⚠ {error}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto custom-scrollbar">
        <div className="flex-1 flex flex-col gap-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              TITLE ✍
            </label>
            <input
              type="text"
              className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3
                text-xl text-white placeholder-zinc-500 outline-none
                focus:border-yellow-500/50 focus:bg-zinc-800/80 transition-all duration-300"
              placeholder="A Day at the ..... ✨"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>

          {/* Date Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              VISITED DATE 📅
            </label>
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          {/* Image Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              STORY IMAGE 🖼
            </label>
            <ImageSelector
              image={storyImg}
              setImage={setStoryImg}
              handleDeleteImg={handleDeleteStoryImg}
            />
          </div>

          {/* Story Text Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              YOUR STORY 📝
            </label>
            <textarea
              className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3
                text-white placeholder-zinc-500 outline-none resize-none
                focus:border-yellow-500/50 focus:bg-zinc-800/80 transition-all duration-300
                custom-scrollbar"
              placeholder="Share your amazing journey ✈"
              rows={10}
              value={story}
              onChange={({ target }) => setStory(target.value)}
            />
          </div>

          {/* Location Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">
              VISITED LOCATIONS 📍
            </label>
            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;