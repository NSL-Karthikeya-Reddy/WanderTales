import React from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Input/SearchBar";

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Blur Background */}
      <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50" />

      {/* Navbar Content */}
      <div className="relative px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2 -ml-20">
            <span className="text-3xl">✈️</span>
            <span className="text-3xl font-bold tracking-wide bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              WanderTales ✨
            </span>
          </div>

          {isToken && (
            <>
              {/* Search Section */}
              <div className="flex-1 max-w-2xl">
                <SearchBar
                  value={searchQuery}
                  onChange={({ target }) => {
                    setSearchQuery(target.value);
                  }}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                />
              </div>

              {/* Profile Section */}
              <div className="flex-shrink-0">
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
    </nav>
  );
};

// Add animation styles
const styles = `
  @keyframes gradientShift {
    0% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .gradient-line {
    background-size: 200% 100%;
    animation: gradientShift 3s linear infinite;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Navbar;