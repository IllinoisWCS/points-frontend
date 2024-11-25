import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api';
import { useQuery } from 'react-query';
import { Profile } from '../../types/profile';

const LoadingScreen = (): JSX.Element => {
  const { eventKey } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<Profile>(['get-profile'], async () => {
    const res = await axiosInstance.get('/profile');
    return res.data;
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isPostAuth = queryParams.get('postAuth') === 'true';

    // Debug logging
    console.log('LoadingScreen State:', {
      isLoading,
      hasData: !!data,
      isPostAuth,
      eventKey,
      pathname: location.pathname
    });

    if (!isLoading) {
      if (!data && !isPostAuth) {
        // Use the FULL current path including eventKey
        const fullReturnPath = `/loading/${eventKey ?? ''}`;
        const loginUrl = new URL(
          `${String(axiosInstance.defaults.baseURL)}/auth/login`
        );

        loginUrl.searchParams.set('fromQR', 'true');
        loginUrl.searchParams.set('returnTo', fullReturnPath);

        console.log('Redirecting to login:', loginUrl.toString());
        window.location.href = loginUrl.toString();
        return;
      }

      if (data && eventKey && isPostAuth) {
        console.log('Processing attendance for event:', eventKey);
        const processAttendance = async (): Promise<void> => {
          try {
            await axiosInstance.post('/attendance', { eventKey });
            console.log(
              'Attendance processed successfully, navigating to points'
            );
            navigate('/points');
          } catch (error) {
            console.error('Error processing attendance:', error);
          }
        };
        void processAttendance().catch((error) => {
          console.error('Error in processing attendance:', error);
        });
      }
    }
  }, [eventKey, location, data, isLoading, navigate]);

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  return <div>Processing attendance...</div>;
};

export default LoadingScreen;
