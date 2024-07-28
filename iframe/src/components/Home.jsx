import React from 'react';
import Iframe from 'react-iframe';

const Home = () => {
  return (
    <div className='grid place-items-center h-screen'>
      <div className="smartphone">
        <div className="content ">
          <Iframe
            url="http://localhost:5173/"
            className='w-full h-full'
            // style={{ width: '100%', border: 'none', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
