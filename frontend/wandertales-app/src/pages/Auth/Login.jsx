// src/pages/Login/Login.jsx
import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden relative flex flex-col">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(#FFF 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Animated background elements */}
      <div className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl right-10 -top-40 animate-pulse" />
      <div className="absolute w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -bottom-40 right-1/2 animate-pulse" />

      <main className="flex-1 flex items-center justify-center px-20">
        <div className="container mx-auto flex items-center justify-center">
          <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50 relative overflow-hidden">
            {/* Dark overlay with pattern */}
            <div className="absolute inset-0 bg-black/50" style={{
              backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), 
                               linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`,
              backgroundSize: '60px 60px',
              backgroundPosition: '0 0, 30px 30px',
              opacity: '0.1'
            }} />
            
            <div className="relative z-10">
              <h4 className="text-5xl text-yellow-400 font-bold leading-[58px]">
                Embark on Epic <br /> Adventures ✈️
              </h4>
              <p className="text-[15px] text-gray-200 leading-6 pr-7 mt-4">
                🌍 Chronicle your journey through time and space. 
                Every story matters, every moment counts. ⭐
              </p>
            </div>
          </div>

          <div className="w-2/4 h-[75vh] bg-zinc-900/90 backdrop-blur-sm rounded-r-lg relative p-16 shadow-lg shadow-yellow-500/10">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `repeating-linear-gradient(45deg, #FFF 0, #FFF 1px, transparent 0, transparent 50%)`,
              backgroundSize: '10px 10px'
            }} />

            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <h4 className="text-2xl font-bold text-yellow-400 mb-7">
                Welcome Back 👋
              </h4>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                  <span className="text-lg">📧</span>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white transition-all duration-300"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white transition-all duration-300"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs flex items-center gap-2">
                  <span>❌</span> {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg transform hover:scale-105 hover:bg-yellow-400 transition-all duration-300 active:scale-95"
              >
                SIGN IN 🚀
              </button>

              <p className="text-xs text-zinc-500 text-center">Or</p>

              <button
                type="button"
                className="w-full bg-zinc-800/50 text-yellow-400 font-bold py-3 rounded-lg border border-yellow-500 transform hover:scale-105 hover:bg-yellow-500 hover:text-black transition-all duration-300 active:scale-95"
                onClick={() => navigate("/signUp")}
              >
                CREATE NEW ACCOUNT ✨
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full bg-black/50 backdrop-blur-sm py-4 flex items-center justify-center">
        <div className="container mx-auto text-center">
          <p className="text-zinc-500">
            Created with 💝 by NSL Karthikeya Reddy and Datta Srivathsava Gollapinni
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;