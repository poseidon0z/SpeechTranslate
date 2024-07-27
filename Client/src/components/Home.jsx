import React from 'react';
import Homepage from "../assets/Homepage.png";
import Voice from "../assets/voiceRecorder.png";
import wavesImage from '../assets/waves.png';
const Home = () => {
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
            <input type="text" placeholder="Eg: I want to buy 1kg potatoes" className="size-full px-2 py-4 border border-gray-500 "style={{ borderRadius: '1.5rem', borderColor: 'gray' }}/>
            </form>
            <div className='grid w-2/12 justify-items-center items-center p-4 border border-gray-500 mike' style={{ borderRadius: '50%', borderColor: '#932AFD' }}>
  <img src={Voice} alt="Voice recorder" />
</div>

        </div>
    </div>
  )
}

export default Home
