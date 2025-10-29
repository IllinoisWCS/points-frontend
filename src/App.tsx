import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CheckIn from './pages/CheckIn';
import Points from './pages/Points';
import Events from './pages/Events';
import LoadingScreen from './pages/LoadingScreen';
import NavbarLayout from './layouts/NavbarLayout';
import SuccessPage from './pages/LoadingScreen/success';

// import MerchRectangle
// from './components/MerchDisplay/MerchRectangle/MerchRectangle';
// import merch1 from './assets/merch1.svg';
const App = (): React.ReactElement => {
  useEffect(() => {
    // Check URL parameters on page load
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    const eventKey = urlParams.get('eventKey');

    // If this is a check-in action, redirect to the loading route
    if (action === 'checkin' && eventKey) {
      // Clear the URL parameters
      window.history.replaceState(
        {},
        '',
        `${window.location.origin}${window.location.pathname}`
      );

      // Force navigation to the loading route
      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.location.href = `${newUrl}#/loading/${eventKey}`;

      // Force a reload to ensure the component loads fresh
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, []);

  return (
    <HashRouter>
      <ToastContainer />
      <NavbarLayout>
        {/* <MerchRectangle color="#D1EEEF" image={merch1}/> */}

        <Routes>
          <Route path="/" element={<CheckIn />} />
          <Route path="/points" element={<Points />} />
          <Route path="/events" element={<Events />} />
          <Route path="/loading/:eventKey" element={<LoadingScreen />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </NavbarLayout>
    </HashRouter>
  );
};

export default App;
