import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdClose, MdEdit, MdDelete, MdStar, MdStarBorder, MdCalendarToday } from "react-icons/md";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { DayPicker } from "react-day-picker";
import axiosInstance from "../../utils/axiosInstance";
import { getEmptyCardImg, getEmptyCardMessage } from "../../utils/helper";
import Navbar from "../../components/Navbar";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/Cards/EmptyCard";
import FilterInfoTitle from "../../components/Cards/FilterInfoTitle";

// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "your-cloud-name";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Keyframe animation styles
const styles = `
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
    animation: fadeIn 0.2s ease-out;
  }

  .calendar-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    z-index: 50;
    transform: translateY(8px);
  }
`;

// Add style tag to document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Cloudinary utility functions
const generateCloudinaryUrl = (imageUrl, transformations = '') => {
  if (!imageUrl) return null;
  
  // Handle already transformed Cloudinary URLs or non-Cloudinary URLs
  if (!imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }
  
  // Extract public ID if it's a Cloudinary URL
  let publicId;
  try {
    const urlObj = new URL(imageUrl);
    const pathParts = urlObj.pathname.split('/');
    const uploadIndex = pathParts.indexOf('upload');
    
    if (uploadIndex !== -1 && uploadIndex < pathParts.length - 1) {
      publicId = pathParts.slice(uploadIndex + 1).join('/');
    } else {
      // Can't parse properly, return original URL
      return imageUrl;
    }
  } catch (error) {
    console.error('Error parsing Cloudinary URL:', error);
    return imageUrl;
  }
  
  // Build new URL with transformations
  return `${CLOUDINARY_BASE_URL}/${transformations}/${publicId}`;
};

const Home = () => {
  const navigate = useNavigate();
  
  // State Management
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  // API Calls
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const processStoriesWithCloudinaryUrls = (stories) => {
    return stories.map(story => ({
      ...story,
      // Create thumbnail version for cards
      thumbnailUrl: story.imageUrl ? 
        generateCloudinaryUrl(story.imageUrl, 'c_fill,g_auto,h_300,w_400,q_auto:good,f_auto') : null,
      // Create full-size optimized version for viewing
      optimizedImageUrl: story.imageUrl ?
        generateCloudinaryUrl(story.imageUrl, 'q_auto:good,f_auto') : null
    }));
  };

  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data?.stories) {
        const processedStories = processStoriesWithCloudinaryUrls(response.data.stories);
        setAllStories(processedStories);
      }
    } catch (error) {
      toast.error("Failed to fetch stories");
    }
  };

  // Event Handlers
  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data });
  };

  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  const updateIsFavourite = async (storyData) => {
    try {
      const response = await axiosInstance.put(
        `/update-is-favourite/${storyData._id}`,
        { isFavourite: !storyData.isFavourite }
      );

      if (response.data?.story) {
        toast.success("Story Updated Successfully");
        if (filterType === "search" && searchQuery) {
          onSearchStory(searchQuery);
        } else if (filterType === "date") {
          filterStoriesByDate(dateRange);
        } else {
          getAllTravelStories();
        }
      }
    } catch (error) {
      toast.error("Failed to update story");
    }
  };

  const deleteTravelStory = async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete-story/${data._id}`);
      if (response.data && !response.data.error) {
        toast.success("Story Deleted Successfully");
        setOpenViewModal({ isShown: false, data: null });
        getAllTravelStories();
      }
    } catch (error) {
      toast.error("Failed to delete story");
    }
  };

  // Handle image load errors
  const handleImageError = (storyId) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [storyId]: true
    }));
  };

  // Search and Filter Functions
  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/search", { params: { query } });
      if (response.data?.stories) {
        setFilterType("search");
        const processedStories = processStoriesWithCloudinaryUrls(response.data.stories);
        setAllStories(processedStories);
      }
    } catch (error) {
      toast.error("Search failed");
    }
  };

  const handleClearSearch = () => {
    setFilterType("");
    setSearchQuery("");
    getAllTravelStories();
  };

  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;

      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-stories/filter", {
          params: { startDate, endDate }
        });

        if (response.data?.stories) {
          setFilterType("date");
          const processedStories = processStoriesWithCloudinaryUrls(response.data.stories);
          setAllStories(processedStories);
          setShowCalendar(false);
        }
      }
    } catch (error) {
      toast.error("Failed to filter stories");
    }
  };

  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  };

  const resetFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType("");
    getAllTravelStories();
  };

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();
  }, []);

  // Click outside calendar handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCalendar && !event.target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black overflow-hidden relative flex flex-col">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl -right-64 -top-64 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-l from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -left-32 top-1/3 animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl -bottom-96 right-1/3 animate-pulse" />

      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto py-20 px-6 relative z-10 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            {filterType && (
              <FilterInfoTitle
                filterType={filterType}
                filterDates={dateRange}
                onClear={resetFilter}
              />
            )}
          </div>
          
          {/* Enhanced Calendar Dropdown */}
          <div className="relative calendar-container ml-4">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="px-4 py-2.5 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-xl
                flex items-center gap-2.5 hover:bg-zinc-700/80 transition-all duration-300
                shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30
                hover:border-zinc-600/50 active:scale-95"
            >
              <MdCalendarToday className="text-yellow-400 text-lg" />
              <span className="text-white font-medium">Filter by Date</span>
            </button>

            {showCalendar && (
              <div className="calendar-dropdown shadow-2xl shadow-black/50 backdrop-blur-xl
                bg-zinc-800/90 rounded-2xl p-6 animate-fadeIn border border-zinc-700/50 right-0 translate-y-2">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  className="!font-medium 
                    [&_.rdp-day]:!text-white/90
                    [&_.rdp-day_button:hover]:!bg-yellow-500/20 
                    [&_.rdp-day_button:focus]:!bg-yellow-500/20
                    [&_.rdp-button]:!text-yellow-400
                    [&_.rdp-day--selected]:!bg-yellow-500/30
                    [&_.rdp-day--selected]:!text-yellow-400
                    [&_.rdp-day--selected]:!font-bold"
                />
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Stories Grid with Cloudinary Optimized Images */}
        {allStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {allStories.map((item) => (
              <TravelStoryCard
                key={item._id}
                imgUrl={imageLoadErrors[item._id] ? getEmptyCardImg('image') : (item.thumbnailUrl || item.imageUrl)}
                title={item.title}
                story={item.story}
                date={item.visitedDate}
                visitedLocation={item.visitedLocation}
                isFavourite={item.isFavourite}
                onClick={() => handleViewStory({
                  ...item,
                  // Use optimized version for viewing
                  imageUrl: item.optimizedImageUrl || item.imageUrl
                })}
                onFavouriteClick={() => updateIsFavourite(item)}
                onImageError={() => handleImageError(item._id)}
              />
            ))}
          </div>
        ) : (
          <div className="animate-fadeIn">
            <EmptyCard
              imgSrc={getEmptyCardImg(filterType)}
              message={getEmptyCardMessage(filterType)}
            />
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <footer className="w-full bg-black/30 backdrop-blur-md py-6 flex items-center justify-center mt-auto border-t border-zinc-800/30">
        <div className="container mx-auto text-center">
          <p className="text-zinc-400 font-medium">
            Created with 
            <span className="mx-1 animate-pulse inline-block">💝</span> 
            by NSL Karthikeya Reddy and Datta Srivathsava Gollapinni
          </p>
        </div>
      </footer>

      {/* Enhanced Add Button */}
      <button
        className="fixed right-8 bottom-28 lg:right-12 lg:bottom-12 w-16 h-16 
          flex items-center justify-center rounded-2xl bg-gradient-to-tr from-yellow-500 to-yellow-400 
          hover:from-yellow-400 hover:to-yellow-300
          transform hover:scale-110 transition-all duration-300 active:scale-95 
          shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 group z-50"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-[32px] text-black group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Enhanced Modals */}
      <Modal
        isOpen={openAddEditModal.isShown}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(12px)",
            zIndex: 999,
          },
          content: {
            background: 'transparent',
            border: 'none',
            padding: '24px',
            maxWidth: '800px',
            margin: 'auto',
            overflow: 'visible'
          }
        }}
        appElement={document.getElementById("root")}
        className="modal-box animate-fadeIn"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          getAllTravelStories={getAllTravelStories}
          cloudName={CLOUDINARY_CLOUD_NAME}
        />
      </Modal>

      <Modal
        isOpen={openViewModal.isShown}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(12px)",
            zIndex: 999,
          },
          content: {
            background: 'transparent',
            border: 'none',
            padding: '24px',
            maxWidth: '800px',
            margin: 'auto',
            overflow: 'visible'
          }
        }}
        appElement={document.getElementById("root")}
        className="modal-box animate-fadeIn"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data}
          onClose={() => setOpenViewModal({ isShown: false, data: null })}
          onEditClick={() => {
            setOpenViewModal({ isShown: false, data: null });
            handleEdit(openViewModal.data);
          }}
          onDeleteClick={() => deleteTravelStory(openViewModal.data)}
          onImageError={() => handleImageError(openViewModal.data?._id)}
        />
      </Modal>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastClassName="!bg-zinc-900/90 !backdrop-blur-md !text-white !border !border-zinc-800/50 !rounded-xl !shadow-xl !shadow-black/20"
      />
    </div>
  );
};

export default Home;