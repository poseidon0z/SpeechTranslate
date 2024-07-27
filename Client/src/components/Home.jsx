import React from 'react';
import Homepage from "../assets/Homepage.png";
import Voice from "../assets/voiceRecorder.png";
import wavesImage from '../assets/waves.png';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({setContext,setMessage}) => {

  const [inpText,setInpText] = useState("");
  const [audio,setAudio] = useState(null);
  const [audioURL,setAudioURL] = useState("");
  const [audioRecorder,setAudioRecorder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const audioFormat = 'audio/webm;codecs=opus'; // Explicitly set the format
  const navigate = useNavigate();

  const handleUserInp = (event)=>{
    setInpText(event.target.value);
  }

  const handleSave = () => {
    setContext(inpText);
  }

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

  const startRecording = () => {
    if(audioRecorder){
      audioRecorder.start();
    }
  };

  const stopRecording = () => {
    if(audioRecorder){
      audioRecorder.stop();
      setShowPopup(true);
    }
  };

  const handleYes = () => {
    setShowPopup(false);
    //Send The Audio to Transcribe and translate
    navigate("/chat");
  }

  const handleTryAgain = () => {
    setShowPopup(false);
    setInpText("");
    setAudio(null);
    setAudioURL("");
    setAudioRecorder(null);
  }


  return (
    <div className='max-w-screen-sm'>
        <img src={wavesImage} alt="Waves" className='max-w-screen-sm w-screen'/>
        <p className="text-black-700 text-5xl text-center size-full ibm-plex-serif-regular">Speeasy</p>
        <img src={Homepage} alt="Home page image" className='mt-5'/>
        <div className= 'mt-6 w-60 text-black-400 text-sm font-roboto font-normal text-center m-auto'>"Transform your Tamil voice into English with ease! Speak, translate, and listen—bridging languages has never been simpler!"</div>
        <div className='max-w-screen-sm mt-6 m-auto flex justify-center'>
  <div className='p-5 bg-violetcustom inline-block rounded-custom border-dashed border-2 border-gray-500'>
    <p className="w-40 text-sm text-black-700 font-bold text-center titlecontent ibm-plex-serif-regular">Tell Us Your Situation: Share Your Context for Accurate Translations!</p>
  </div>
</div>

        <div className='flex max-w-screen-sm w-screen justify-evenly mt-6'>
            <form className='w-9/12'>
            <input type="text" placeholder="Eg: I want to buy 1kg potatoes" className="size-full px-2 py-4 border border-gray-500 "style={{ borderRadius: '1.5rem', borderColor: 'gray' }}
            onChange={handleUserInp}
            value={inpText}
            />
            </form>
            <div><button className='border-2 border-[green] bg-[green] text-[white] font-bold mx-2 px-2 py-3 my-2 text-md rounded-custom' onClick={()=>handleSave()}
            >Save</button></div>
            <div className='grid w-2/12 justify-items-center items-center p-4 border border-gray-500 mike' style={{ borderRadius: '50%', borderColor: '#932AFD' }}>
            <img
              src={Voice}
              onMouseDown={() => startRecording()}
              onMouseUp={() => stopRecording()}
              alt="Voice Recoarder"
            />
            </div>
        </div>
        {showPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-[black] bg-opacity-50'>
          <div className='bg-[white] p-8 rounded shadow-lg text-center'>
            <p className='mb-4'>You're looking for help doing : <strong>{inpText}</strong></p>
            <button className='border-2 border-[green] bg-[green] text-[white] font-bold mx-2 px-4 py-2 my-2 text-md rounded' onClick={handleYes}>
              Yes
            </button>
            <button className='border-2 border-[red] bg-[red] text-[white] font-bold mx-2 px-4 py-2 my-2 text-md rounded' onClick={handleTryAgain}>
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
