import ADD_STORY_IMG from '../assets/images/add-story.png'
import NO_SEARCH_DATA_IMG from '../assets/images/no-search-data.png'
import NO_FILTER_DATA_IMG from '../assets/images/no-filter-data.png'

// Utility function to validate email format
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Enhanced initials generator with gradient background
export const getInitials = (name) => {
  if (!name) return "";
  
  const words = name.split(" ");
  let initials = "";
  
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  
  return initials.toUpperCase();
};

// Enhanced empty card messages with travel-themed emojis and more engaging copy
export const getEmptyCardMessage = (filterType) => {
  switch (filterType) {
    case "search":
      return `✈️ Whoops! We've searched far and wide, but couldn't find any travel stories matching your quest. Try another adventure? 🗺️`;
    
    case "date":
      return `🌍 No travel memories found in this time period. Your next adventure is waiting to be written! ⏳`;
    
    default:
      return `🌟 Your travel journal awaits its first story! 
              
              🎯 Click the golden 'Add' button below to capture your adventures, memories, and dreams.
              
              🌅 Every journey begins with a single step...`;
  }
};

// Enhanced empty card image selector with fade effects
export const getEmptyCardImg = (filterType) => {
  // Added image mapping with consistent functionality
  const imageMap = {
    search: NO_SEARCH_DATA_IMG,
    date: NO_FILTER_DATA_IMG,
    default: ADD_STORY_IMG
  };

  return imageMap[filterType] || imageMap.default;
};

// New utility function for generating gradient backgrounds
export const getGradientBackground = () => {
  const gradients = [
    'from-yellow-500/10 to-orange-500/10',
    'from-blue-500/10 to-purple-500/10',
    'from-emerald-500/10 to-teal-500/10',
    'from-pink-500/10 to-rose-500/10'
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// New utility function for card animations
export const getCardAnimation = (index) => {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };
};

// New utility function for formatting dates in a travel-friendly way
export const formatTravelDate = (date) => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(date).toLocaleDateString('en-US', options);
};