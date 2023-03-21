import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CheckIn from './pages/Home';
import Points from './pages/Points';
import Events from './pages/Events';
import NavbarLayout from './layouts/NavbarLayout';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavbarLayout>
        <Routes>
          <Route path="/" element={<CheckIn />} />
          <Route path="/points" element={<Points />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </NavbarLayout>
    </BrowserRouter>
  );
};

export default App;
