import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Chat from './Screens/Chat';
import { useState } from 'react';

function App() {
  const [context, setContext] = useState('');
  const [message, setMessage] = useState('');

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="chat" element={<Chat context={context} />} />
          <Route
            path="/"
            element={<Home setContext={setContext} setMessage={setMessage} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
