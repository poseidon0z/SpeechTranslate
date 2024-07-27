import React, { useState, useEffect } from 'react';
import mic from '/mic.png';

function Inputs() {
  const [tamilAudio, setTamilAudio] = useState(null);
  const [englishAudio, setEnglishAudio] = useState(null);
  const [tamilAudioURL, setTamilAudioURL] = useState('');
  const [englishAudioURL, setEnglishAudioURL] = useState('');
  const [tamilRecorder, setTamilRecorder] = useState(null);
  const [englishRecorder, setEnglishRecorder] = useState(null);
  const audioFormat = 'audio/webm;codecs=opus'; // Explicitly set the format

  useEffect(() => {
    const handleStream = (stream) => {
      const options = { mimeType: audioFormat };
      const tamilMediaRecorder = new MediaRecorder(stream, options);
      const englishMediaRecorder = new MediaRecorder(stream, options);

      tamilMediaRecorder.ondataavailable = (event) => {
        const audioBlob = event.data;
        setTamilAudio(audioBlob);
        setTamilAudioURL(URL.createObjectURL(audioBlob));
      };

      englishMediaRecorder.ondataavailable = (event) => {
        const audioBlob = event.data;
        setEnglishAudio(audioBlob);
        setEnglishAudioURL(URL.createObjectURL(audioBlob));
      };

      setTamilRecorder(tamilMediaRecorder);
      setEnglishRecorder(englishMediaRecorder);
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then(handleStream);
  }, []);

  const startRecording = (language) => {
    if (language === 'tamil' && tamilRecorder) {
      tamilRecorder.start();
    } else if (language === 'english' && englishRecorder) {
      englishRecorder.start();
    }
  };

  const stopRecording = (language) => {
    if (language === 'tamil' && tamilRecorder) {
      tamilRecorder.stop();
    } else if (language === 'english' && englishRecorder) {
      englishRecorder.stop();
    }
  };

  return (
    <div>
      <div className="flex bottom-0 border-t-[1px] bg-white border-dashed border-black w-full py-2">
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-1 items-center relative">
            <img
              src={mic}
              onMouseDown={() => startRecording('tamil')}
              onMouseUp={() => stopRecording('tamil')}
              alt="Tamil Mic"
            />
            <span>Tamil</span>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-1 items-center relative">
            <img
              src={mic}
              onMouseDown={() => startRecording('english')}
              onMouseUp={() => stopRecording('english')}
              alt="English Mic"
            />
            <span>English</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inputs;
