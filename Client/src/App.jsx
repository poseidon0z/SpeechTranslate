import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Chat from './Screens/Chat';

function App() {
  return (
    <>
  

    <BrowserRouter>
      <Routes>
        <Route path="chat" element={<Chat />} />

        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
