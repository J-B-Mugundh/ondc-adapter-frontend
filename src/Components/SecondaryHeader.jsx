import React, { useState } from "react";
import GoogleTranslate from "./GoogleTranslate";

const SecondaryHeader = () => {
  const [language, setLanguage] = useState("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth] = useState(window.speechSynthesis);
  const [utterance, setUtterance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleReadAloud = () => {
    const pageText = document.body.innerText;

    if (!pageText.trim()) {
      alert("No readable text found on this page.");
      return;
    }

    if (isPlaying && utterance) {
      synth.resume();
      setIsPlaying(true);
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(pageText);
    newUtterance.lang = "en-US";
    newUtterance.rate = 1;
    newUtterance.pitch = 1;
    newUtterance.volume = 1;

    newUtterance.onboundary = (event) => {
      setCurrentIndex(event.charIndex);
    };

    newUtterance.onend = () => {
      console.log("Reading complete!");
      setIsPlaying(false);
    };

    synth.cancel();
    synth.speak(newUtterance);
    setUtterance(newUtterance);
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (synth.speaking) {
      synth.pause();
      setIsPlaying(false);
    }
  };

  return (
    <header className="flex justify-between items-center  text-white py-2 px-2">
      {/* Left Side: Title */}
      

      {/* Right Side: Language Dropdown and Controls */}
      <div className="flex items-center space-x-4">
        <div className="read-aloud-section">
          <button
            onClick={handleReadAloud}
            className="read-aloud-button bg-green-500 text-white py-2 px-4 rounded-md text-sm"
          >
            Read Aloud
          </button>
          {isPlaying && (
            <button
              onClick={handlePause}
              className="pause-button bg-red-500 text-white py-2 px-4 rounded-md text-sm"
            >
              Pause
            </button>
          )}
        </div>

        <div className="ml-4">
          <GoogleTranslate />
        </div>
      </div>
    </header>
  );
};

export default SecondaryHeader;
