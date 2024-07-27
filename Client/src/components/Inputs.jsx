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
        if (event.data.size > 0) {
          const audioBlob = event.data;
          setTamilAudio(audioBlob);
          setTamilAudioURL(URL.createObjectURL(audioBlob));
          console.log('Tamil audio blob set:', audioBlob);
        }
      };

      englishMediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const audioBlob = event.data;
          setEnglishAudio(audioBlob);
          setEnglishAudioURL(URL.createObjectURL(audioBlob));
          console.log('English audio blob set:', audioBlob);
        }
      };

      setTamilRecorder(tamilMediaRecorder);
      setEnglishRecorder(englishMediaRecorder);
      console.log('Media recorders initialized:', { tamilMediaRecorder, englishMediaRecorder });
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then(handleStream).catch((error) => {
      console.error('Error accessing media devices:', error);
    });
  }, []);

  const startRecording = (language) => {
    if (language === 'tamil' && tamilRecorder && tamilRecorder.state === 'inactive') {
      tamilRecorder.start();
      console.log('Started recording Tamil audio');
    } else if (language === 'english' && englishRecorder && englishRecorder.state === 'inactive') {
      englishRecorder.start();
      console.log('Started recording English audio');
    } else {
      console.log('Recorder not ready or already recording:', language);
    }
  };

  const stopRecording = (language) => {
    if (language === 'tamil' && tamilRecorder && tamilRecorder.state === 'recording') {
      tamilRecorder.stop();
      console.log('Stopped recording Tamil audio');
    } else if (language === 'english' && englishRecorder && englishRecorder.state === 'recording') {
      englishRecorder.stop();
      console.log('Stopped recording English audio');
    } else {
      console.log('Recorder not ready or not recording:', language);
    }
  };

  const uploadAudio = async (audioBlob, language) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm'); // Add filename to the blob
    console.log("form",formData);

    try {
        console.log('Uploading audio:', { language });
        const response = await fetch('http://localhost:5000/speechInput', {
            method: 'POST',
            body: formData, // Send FormData directly
        });
        const result = await response.json();
        console.log('Server response:', result);
    } catch (error) {
        console.error('Error uploading audio:', error);
    }
};


  useEffect(() => {
    if (tamilAudio) {
      console.log('Tamil audio state changed:', tamilAudio);
      uploadAudio(tamilAudio, 'ta-IN');
    }
  }, [tamilAudio]);

  useEffect(() => {
    if (englishAudio) {
      console.log('English audio state changed:', englishAudio);
      uploadAudio(englishAudio, 'en-US');
    }
  }, [englishAudio]);

  return (
    <div>
      <div className="flex bottom-0 border-t-[1px] bg-white border-dashed border-black w-full py-2">
        <div className="w-full flex flex-col items-center">
          <img
            src={mic}
            alt="Tamil Mic"
          />
          <span>Tamil</span>
          <button onClick={() => startRecording('tamil')}>Start Tamil</button>
          <button onClick={() => stopRecording('tamil')}>Stop Tamil</button>
          {tamilAudioURL && <audio controls src={tamilAudioURL}></audio>}
        </div>
        <div className="w-full flex flex-col items-center">
          <img
            src={mic}
            alt="English Mic"
          />
          <span>English</span>
          <button onClick={() => startRecording('english')}>Start English</button>
          <button onClick={() => stopRecording('english')}>Stop English</button>
          {englishAudioURL && <audio controls src={englishAudioURL}></audio>}
        </div>
      </div>
    </div>
  );
}

export default Inputs;
