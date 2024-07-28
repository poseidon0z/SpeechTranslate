import React, { useState, useEffect } from 'react';
import background from '/background.png';
import arrows from '/arrows.png';
import ChatMessage from '../components/ChatMessage';
import Voice from '../assets/voiceRecorder.png';

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract Base64 string from Data URL
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function CAI({}) {
  const [messages, setMessages] = useState([]);
  const [audio, setAudio] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [audioRecorder, setAudioRecorder] = useState(null);

  const audioFormat = 'audio/webm;codecs=opus'; // Explicitly set the format
  console.log(messages);
  useEffect(() => {
    const handleStream = (stream) => {
      const options = { mimeType: audioFormat };
      const mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.ondataavailable = (event) => {
        const audioBlob = event.data;
        setAudio(audioBlob);
        setAudioURL(URL.createObjectURL(audioBlob));
      };
      setAudioRecorder(mediaRecorder);
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then(handleStream);
  }, []);

  const uploadAudio = async (audio, source) => {
    try {
      // Convert the audio Blob to Base64
      const base64Audio = await blobToBase64(audio);

      // Prepare the data to send
      const data = {
        audio: base64Audio,
        language: source,
      };

      console.log('Uploading audio with data:', data);

      const response = await fetch('http://localhost:5000/speechInput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setMessages([...messages, { message: result['result'], tamil: false }]);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const startRecording = () => {
    if (audioRecorder) {
      audioRecorder.start();
      console.log('Started english audio');
    }
  };

  const stopRecording = () => {
    if (audioRecorder) {
      audioRecorder.stop();
      console.log('stopped english audio');
    }
  };

  useEffect(() => {
    if (audio) {
      uploadAudio(audio, 'en-US');
    }
  }, [audio]);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'top',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
        className="pt-28 h-screen flex flex-col"
      >
        <div className="flex gap-4 items-center justify-center mb-4">
          <div className="w-20 text-center px-2 py-1 bg-[#E7D0FF] rounded-md">
            Tamil
          </div>
          <img src={arrows} className="h-full"></img>
          <div className="w-20 text-center px-2 py-1 bg-[#E7D0FF] rounded-md">
            English
          </div>
        </div>
        <div className="h-full overflow-y-auto ">
          {messages.map((item, index) => (
            <ChatMessage
              key={index}
              message={item.message}
              tamil={item.tamil}
              audio={item.URL}
            ></ChatMessage>
          ))}
        </div>
        <div className="flex justify-center bottom-0 border-t-[1px] bg-white border-dashed border-black w-full py-2">
          <div
            className="grid w-2/12 justify-items-center items-center p-4 border border-gray-500 mike"
            style={{ borderRadius: '50%', borderColor: '#932AFD' }}
          >
            <img
              src={Voice}
              onMouseDown={() => startRecording()}
              onMouseUp={() => stopRecording()}
              alt="Voice Recoarder"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CAI;
