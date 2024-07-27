import React from 'react';
import speaker from '/speakerIcon.png';

function ChatMessage({ message, tamil, audio }) {
  const handleAudioPlay = () => {
    if (audio) {
      const audioElement = new Audio(audio);
      audioElement.play();
    }
  };

  const leftMessage = (
    <div className="flex gap-4 items-center px-2">
      <div className={`flex justify-start m-2 mx-1`}>
        <div
          className={`relative p-2 rounded-md bg-[#D6F6FF] text-black rounded-tl-none`}
        >
          {message}
        </div>
      </div>
      <img
        src={speaker}
        className="w-9 h-9 m-2 cursor-pointer"
        onClick={handleAudioPlay}
        alt="Play audio"
      />
    </div>
  );

  const rightMessage = (
    <div className="flex gap-4 items-center px-2">
      <img
        src={speaker}
        className="w-9 h-9 m-2 cursor-pointer"
        onClick={handleAudioPlay}
        alt="Play audio"
      />
      <div className={`flex justify-end m-2 mx-1`}>
        <div
          className={`relative p-2 rounded-md bg-[#FFDFD6] text-black rounded-tr-none`}
        >
          {message}
        </div>
      </div>
    </div>
  );

  return <>{tamil ? leftMessage : rightMessage}</>;
}

export default ChatMessage;
