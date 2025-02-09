import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api';
import { useQuery } from 'react-query';
import { toastError, toastSuccess } from '../../utils/toast';
import { Profile } from '../../types/profile';

const LoadingScreen = (): JSX.Element => {
  const { eventKey } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAttemptedLogging, setHasAttemptedLogging] = useState(false);

  const { data, isLoading } = useQuery<Profile>(['get-profile'], async () => {
    const res = await axiosInstance.get('/profile');
    console.log('Profile data received:', res.data);
    return res.data;
  });

  const logPointsAndRedirect = async (): Promise<void> => {
    if (!eventKey) {
      console.error('Event Key is missing.');
      toastError('Event key is missing. Unable to log points.');
      return;
    }

    try {
      console.log('Starting points logging process for event:', eventKey);
      setIsProcessing(true);

      const response = await axiosInstance.patch('/profile', { eventKey });
      console.log('Points logged successfully:', response.data);
      toastSuccess(response.data.message);
      navigate('/points', { replace: true });
    } catch (error: any) {
      console.error('Error logging points:', error);
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while logging points.';
      toastError(errorMessage);
    } finally {
      setIsProcessing(false);
      setHasAttemptedLogging(true);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isPostAuth = queryParams.get('postAuth') === 'true';

    console.log('Current state:', {
      hasData: !!data,
      eventKey,
      isPostAuth,
      isLoading,
      isProcessing,
      hasAttemptedLogging,
      currentPath: location.pathname
    });

    if (!isLoading && !isProcessing && !hasAttemptedLogging) {
      if (!data) {
        console.log('Redirecting to login - no data');
        const loginUrl = new URL(
          `${String(axiosInstance.defaults.baseURL)}/auth/login`
        );

        loginUrl.searchParams.set('fromQR', 'true');
        loginUrl.searchParams.set('eventKey', String(eventKey ?? ''));
        loginUrl.searchParams.set('returnTo', `/loading/${eventKey ?? ''}`);

        console.log('Redirecting to:', loginUrl.toString());
        window.location.href = loginUrl.toString();
        return;
      }

      // If we have data and eventKey, proceed with logging points
      // regardless of isPostAuth (since user might already be authenticated)
      if (data && eventKey) {
        console.log('User authenticated and eventKey present - logging points');
        void logPointsAndRedirect();
      } else {
        console.log('Missing required conditions:', {
          hasData: !!data,
          hasEventKey: !!eventKey
        });
      }
    }
  }, [
    data,
    eventKey,
    location,
    isLoading,
    isProcessing,
    hasAttemptedLogging,
    navigate
  ]);

  // Show appropriate loading states
  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div>Authenticating...</div>
        <div className="text-sm text-gray-500">
          Please wait while we verify your profile
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="text-center p-4">
        <div>Processing your attendance...</div>
        <div className="text-sm text-gray-500">Almost there!</div>
      </div>
    );
  }

  if (isLoading || isProcessing) {
    return (
      <div className="text-center p-4">
        <div>Loading...</div>
        <div className="text-sm text-gray-500">Please wait...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-4">
        <div>Uh oh, looks like we weren’t able to log you in.’</div>
      </div>
    );
  }
};

export default LoadingScreen;
