"use client";

import { useState, useEffect } from "react";

const Loader = () => {
  const loadingMessages = [
    "Verifying your credentials... :)",
    "Checking your login details... :)",
    "Logging you in securely... :)",
    "Setting things up for you... :)",
    "Just a moment... :)",
    "Making sure everything's in place... :)",
    "Getting you in safely... :)",
    "Authenticating user... :)",
    "One sec, brewing your dashboard... :)",
    "Finalizing login... :)",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");

  useEffect(() => {
    const messageInterval = setInterval(() => {
      // Start fade out
      setFadeState("fade-out");

      // After fade out completes, change message and fade in
      setTimeout(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % loadingMessages.length
        );
        setFadeState("fade-in");
      }, 500); // Match this with the CSS transition duration
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-12">
      {/* Three-dot loading animation */}
      <div className="flex space-x-2 mb-4">
        <div
          className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>

      <div
        className={`text-center text-sm md:text-base lg:text-lg font-medium text-gray-600 transition-opacity duration-500 ${
          fadeState === "fade-in" ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        {loadingMessages[currentMessageIndex]}
      </div>
    </div>
  );
};

export default Loader;
