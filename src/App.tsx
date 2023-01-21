import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

import Navbar from './components/Navbar';
import CheckIn from './pages/CheckIn';
import Points from './pages/Points';
import Events from './pages/Events';
import './App.css';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <ToastContainer />
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
