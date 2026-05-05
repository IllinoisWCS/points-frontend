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
import QAForumSuccessPage from './pages/LoadingScreen/qa-forum-success';

const App = (): React.ReactElement => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // check-in logic
    const action = urlParams.get('action');
    const eventKey = urlParams.get('eventKey');

    if (action === 'checkin' && eventKey) {
      window.history.replaceState(
        {},
        '',
        `${window.location.origin}${window.location.pathname}`
      );

      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.location.href = `${newUrl}#/loading/${eventKey}`;

      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, []);

  return (
    <HashRouter>
      <ToastContainer />
      <NavbarLayout>
        <Routes>
          <Route path="/" element={<CheckIn />} />
          <Route path="/points" element={<Points />} />
          <Route path="/events" element={<Events />} />
          <Route path="/loading/:eventKey" element={<LoadingScreen />} />
          <Route path="/submitAnswer/:token" element={<LoadingScreen />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/qa-forum-success" element={<QAForumSuccessPage />} />
        </Routes>
      </NavbarLayout>
    </HashRouter>
  );
};

export default App;
