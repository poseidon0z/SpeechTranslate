import React from 'react';
import mic from '/mic.png';

function Inputs() {
  return (
    <div className="flex bottom-0 border-t-[1px] bg-white border-dashed border-black w-full py-2">
      <div className="w-full flex justify-center">
        <div className="flex flex-col gap-1 items-center">
          <img src={mic}></img>
          <span>Tamil</span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col gap-1 items-center">
          <img src={mic}></img>
          <span>English</span>
        </div>
      </div>
    </div>
  );
}

export default Inputs;
