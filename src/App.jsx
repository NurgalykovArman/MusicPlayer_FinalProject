import React from "react";
import { Routes, Route} from "react-router-dom";
import MainPage from "./components/mainPage";
import MusicPage from "./components/musicPlayer";
import './App.css';






function App() {
  return (
    <div className="App">
      <Routes>
        
          <Route path='/' element={<MainPage />} />
          <Route path="/music/:musicId" element={<MusicPage />} />
      
        
      </Routes>
    </div>
  );
}

export default App;
