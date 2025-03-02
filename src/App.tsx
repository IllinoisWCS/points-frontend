import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CheckIn from './pages/CheckIn';
import Points from './pages/Points';
import Events from './pages/Events';
import LoadingScreen from './pages/LoadingScreen';
import NavbarLayout from './layouts/NavbarLayout';
import SuccessPage from './pages/LoadingScreen/success';

const App = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavbarLayout>
        <Routes>
          <Route path="/" element={<CheckIn />} />
          <Route path="/points" element={<Points />} />
          <Route path="/events" element={<Events />} />
          <Route path="/loading/:eventKey" element={<LoadingScreen />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </NavbarLayout>
    </BrowserRouter>
  );
};

export default App;
