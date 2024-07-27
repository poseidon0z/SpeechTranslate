import React, { useState } from 'react';
import background from '/background.png';
import arrows from '/arrows.png';
import ChatMessage from '../components/ChatMessage';
import Inputs from '../components/Inputs';

function Chat() {
  const [messages, setMessages] = useState([]);
  console.log(messages);

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
        <Inputs messages={messages} setMessages={setMessages}></Inputs>
      </div>
    </>
  );
}

export default Chat;
