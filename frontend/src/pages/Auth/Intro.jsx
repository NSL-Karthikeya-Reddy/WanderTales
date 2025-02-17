import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';
import logo from '../../assets/images/logo.png';

const IntroPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black overflow-hidden relative flex flex-col items-center justify-center">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
                <div className="absolute inset-0 dot-pattern" />
            </div>

            {/* Animated Gradient Orbs */}
            <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl -right-64 -top-64 animate-pulse" />
            <div className="absolute w-[500px] h-[500px] bg-gradient-to-l from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -left-32 top-1/3 animate-pulse" />
            <div className="absolute w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl -bottom-96 right-1/3 animate-pulse" />

            {/* Content Container - Adjusted for upward movement */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center mt-[-5rem]"> {/* Added negative top margin */}
                {/* Enhanced Logo Container */}
                <div className="mb-12 logo-container">
                    <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-xl rounded-full transform scale-110" />
                        <img
                            src={logo}
                            alt="WanderTales"
                            className="w-[550px] h-auto relative z-10 transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Animated Travel Icons */}
                <div className="flex justify-center gap-4 mb-6">
                    <span className="text-4xl bounce-animation delay-0">✈️</span>
                    <span className="text-4xl bounce-animation delay-100">🗺️</span>
                    <span className="text-4xl bounce-animation delay-200">🌎</span>
                    <span className="text-4xl bounce-animation delay-300">🧳</span>
                    <span className="text-4xl bounce-animation delay-400">📸</span>
                </div>

                {/* Welcome Text */}
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-6 fade-in">
                    Welcome to WanderTales
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-zinc-300 mb-12 leading-relaxed fade-in delay-100">
                    Your personal space to chronicle adventures, preserve memories, and relive your travel stories.
                    Capture the essence of every journey, one tale at a time. ✨
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 
                        hover:from-yellow-400 hover:to-yellow-300
                        rounded-xl text-black font-semibold text-lg
                        transform hover:scale-105 transition-all duration-300 
                        shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40"
                    >
                        Continue Journey 📍🗺️
                    </button>

                    <button
                        onClick={() => navigate('/signUp')}
                        className="w-full sm:w-auto px-8 py-4 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 
                        rounded-xl text-white font-semibold text-lg
                        hover:bg-zinc-700/80 transform hover:scale-105 transition-all duration-300
                        shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30
                        hover:border-zinc-600/50"
                    >
                        Start New Adventure 💫
                    </button>
                </div>
            </div>

            {/* Footer - Untouched */}
            <footer className="absolute bottom-0 w-full bg-black/30 backdrop-blur-md py-6 border-t border-zinc-800/30">
                <div className="container mx-auto text-center">
                    <p className="text-zinc-400 font-medium">
                        Created with
                        <span className="mx-1 animate-pulse inline-block">💝</span>
                        by NSL Karthikeya Reddy and Datta Srivathsava Gollapinni
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default IntroPage;