import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api';
import { useQuery } from 'react-query';
import { toastError, toastSuccess } from '../../utils/toast';
import { Profile } from '../../types/profile';
import { Heading, Box, VStack, Progress, Link } from '@chakra-ui/react';

const LoadingScreen = (): JSX.Element => {
  const [state, setState] = useState('auth');

  const [isError, setIsError] = useState(false);
  const { eventKey } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAttemptedLogging, setHasAttemptedLogging] = useState(false);

  useEffect(() => {
    // Store the current event key and visit ID
    const currentEventKey = eventKey ?? '';

    // Check if we've processed this event recently
    const lastProcessedEvent = localStorage.getItem('last_processed_event');
    const lastProcessedTime = localStorage.getItem('last_processed_time');

    // If we processed this exact event in the last minute, force a hard reload
    if (
      lastProcessedEvent === currentEventKey &&
      lastProcessedTime &&
      Date.now() - parseInt(lastProcessedTime) < 60000
    ) {
      console.log('Forcing reload for repeated event access');
      return;
    }

    // Otherwise, mark this as a new visit
    localStorage.setItem('last_processed_event', currentEventKey);
    localStorage.setItem('last_processed_time', Date.now().toString());

    // Continue with normal component flow
  }, [eventKey]);

  useEffect(() => {
    const authDelay = setTimeout(() => {
      setState('logging');

      const loggingDelay = setTimeout(() => {
        setState('done');

        const doneDelay = setTimeout(() => {
          navigate('/points', { replace: true });
        }, 900);
        return () => {
          clearTimeout(doneDelay);
        };
      }, 800);

      return () => {
        clearTimeout(loggingDelay);
      };
    }, 400);

    return () => {
      clearTimeout(authDelay);
    };
  }, []);

  const { data, isLoading } = useQuery<Profile>(['get-profile'], async () => {
    const res = await axiosInstance.get('/profile');
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
      toastSuccess(response.data.message);
    } catch (error: any) {
      setIsError(true);
      console.error('Error logging points:', error);
      const errorMessage =
        error.response?.data?.message ??
        'An error occurred while logging points.';
      toastError(errorMessage);
    } finally {
      setIsProcessing(false);
      setHasAttemptedLogging(true);
    }
  };

  useEffect(() => {
    if (!isLoading && !isProcessing && !hasAttemptedLogging) {
      if (!data) {
        console.log('Redirecting to login - no data');
        const loginUrl = new URL(
          `${String(axiosInstance.defaults.baseURL)}/auth/login`
        );

        loginUrl.searchParams.set('fromQR', 'true');
        loginUrl.searchParams.set('eventKey', String(eventKey ?? ''));
        loginUrl.searchParams.set('returnTo', `/#/loading/${eventKey ?? ''}`);

        window.location.href = loginUrl.toString();
        return;
      }

      // If we have data and eventKey, proceed with logging points
      // regardless of isPostAuth (since user might already be authenticated)
      if (data && eventKey) {
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
          {/* <Link href='http://127.0.0.1:8080' 
           fontSize="2xl" 
           color="pink"
          >
            http://127.0.0.1:8080
          </Link> */}
          <Link
            href="https://points.illinoiswcs.org"
            fontSize="2xl"
            color="pink"
          >
            https://points.illinoiswcs.org
          </Link>
        </Box>
      );
    }

    if (isLoading ?? state === 'auth') {
      return (
        <Box>
          <Heading mb="10px">Authenticating...</Heading>
          <Box className="text-sm text-gray-500" fontSize="2xl" mb="25px">
            Please wait while we verify your profile
          </Box>
        </Box>
      );
    }

    if (isProcessing ?? state === 'logging') {
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
