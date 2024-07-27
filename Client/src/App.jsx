import Chat from './Screens/Chat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="chat" element={<Chat />} />

        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
