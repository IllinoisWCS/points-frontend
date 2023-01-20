import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import CheckIn from './pages/CheckIn';
import Points from './pages/Points';
import Events from './pages/Events';
import './App.css';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <div className="home-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<CheckIn />} />
            <Route path="/points" element={<Points />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
