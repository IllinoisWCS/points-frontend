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
import QAForumSuccessPage from './pages/QA Forum/success';

const App = (): React.ReactElement => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const submitAnswer = urlParams.get('submitAnswer');
    const token = urlParams.get('token');

    // submitted answer logic
    if (submitAnswer === 'true' && token) {
      // Clear URL parameters so JWT isn't lingering in the browser
      window.history.replaceState(
        {},
        '',
        `${window.location.origin}${window.location.pathname}`
      );

      //window.location.href = `https://points-api.illinoiswcs.org/submitAnswer/token=${token}`;
      //window.location.hash = `/submitAnswer/token=${token}`;
      //window.location.href = `https://points.illinoiswcs.org/#/submitAnswer/${token}`;
      const base = window.location.origin + window.location.pathname;
      window.location.href = `${base}#/submitAnswer/${token}`;
      return;
    }

    // check-in logic
    const action = urlParams.get('action');
    const eventKey = urlParams.get('eventKey');

    if (action === 'checkin' && eventKey) {
      // Clear URL parameters
      window.history.replaceState(
        {},
        '',
        `${window.location.origin}${window.location.pathname}`
      );

      // Navigate to loading route
      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.location.href = `${newUrl}#/loading/${eventKey}`;

      // Force reload to ensure component loads fresh
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
