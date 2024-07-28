import React, { useState, useRef } from 'react';
import speaker from '/speakerIcon.png';

function ChatMessage({ message, tamil, audio }) {
  // Use useRef to persist the audio element
  const audioRef = useRef(null);

  // Function to handle audio play
  const handleAudioPlay = () => {
    if (audioRef.current) {
      // Reset audio playback if already playing
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  return (
    <div className="flex gap-4 items-center px-2">
      {tamil ? (
        <>
          <div className="flex justify-start m-2 mx-1">
            <div className="relative p-2 rounded-md bg-[#D6F6FF] text-black rounded-tl-none">
              {message}
            </div>
          </div>
          <img
            src={speaker}
            className="w-9 h-9 m-2 cursor-pointer"
            onClick={handleAudioPlay}
            alt="Play audio"
          />
        </>
      ) : (
        <div className="ml-auto flex gap-4 items-center">
          <img
            src={speaker}
            className="w-9 h-9 m-2 cursor-pointer"
            onClick={handleAudioPlay}
            alt="Play audio"
          />
          <div className="flex justify-end m-2 mx-1">
            <div className="relative p-2 rounded-md bg-[#FFDFD6] text-black rounded-tr-none">
              {message}
            </div>
          </div>
        </div>
      )}

      {/* Include the audio element, but keep it hidden */}
      <audio ref={audioRef} src={audio} />
    </div>
  );
}

export default ChatMessage;
