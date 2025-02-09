import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api';
import { useQuery } from 'react-query';
import { toastError, toastSuccess } from '../../utils/toast';
import { Profile } from '../../types/profile';
import { Heading, Box, VStack, Progress, Link } from '@chakra-ui/react';

const LoadingScreen = (): JSX.Element => {
  const [isWaitingAuth, setIsWaitingAuth] = useState(true);
  const [isWaitingLogging, setIsWaitingLogging] = useState(true);
  const [isError, setIsError] = useState(false);
  const { eventKey } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAttemptedLogging, setHasAttemptedLogging] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsWaitingAuth(false);
    }, 500);
    return () => {
      clearTimeout(delay);
    };
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsWaitingLogging(false);
    }, 1200);
    return () => {
      clearTimeout(delay);
    };
  }, [isWaitingAuth]);

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
      setIsError(true);
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

  const Content = (): React.ReactElement => {
    if (isError) {
      return (
        <Box>
          <Heading mb="10px">Sorry, something went wrong</Heading>
          <Box className="text-sm text-gray-500" fontSize="2xl" mb="10px">
            Please try manually logging your points here:
          </Box>
          <Link href="http://127.0.0.1:8080">http://127.0.0.1:8080</Link>
          {/* <Link href='https://points.illinoiswcs.org'>
            https://points.illinoiswcs.org 
          </Link> */}
        </Box>
      );
    }

    if (isLoading || isWaitingAuth) {
      return (
        <Box>
          <Heading mb="10px">Authenticating...</Heading>
          <Box className="text-sm text-gray-500" fontSize="2xl" mb="25px">
            Please wait while we verify your profile
          </Box>
        </Box>
      );
    }

    if (isProcessing || isWaitingLogging) {
      return (
        <Box>
          <Heading mb="10px">Hang tight...</Heading>
          <Box className="text-sm text-gray-500" fontSize="2xl" mb="25px">
            We&apos;re logging your points
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <Heading mb="10px">You&apos;re checked in 🎉</Heading>
        <Box className="text-sm text-gray-500" fontSize="2xl" mb="25px">
          Thanks for joining us!
        </Box>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
      minW="300px"
    >
      <VStack alignItems="left">
        <Content />
        {isError ? (
          <div></div>
        ) : (
          <Progress
            size="sm"
            minW="300px"
            maxW="40vw"
            width="30vw"
            isIndeterminate
          />
        )}
      </VStack>
    </Box>
  );
};

export default LoadingScreen;
