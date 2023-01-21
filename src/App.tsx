import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

import CheckIn from './pages/CheckIn';
import Points from './pages/Points';
import Events from './pages/Events';
import './App.css';
import NavbarLayout from './layouts/NavbarLayout';

const App = (): React.ReactElement => {
  return (
    <NavbarLayout>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckIn />} />
          <Route path="/points" element={<Points />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </NavbarLayout>
  );
};

export default App;
