import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Link to="/chat">
        <div>Home</div>
      </Link>
      <Outlet />
    </>
  );
}

export default Home;
