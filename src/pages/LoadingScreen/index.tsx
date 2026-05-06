import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api';
import { useQuery } from 'react-query';
import { toastError, toastSuccess } from '../../utils/toast';
import { Profile } from '../../types/profile';
import { Heading, Box, VStack, Progress, Link } from '@chakra-ui/react';

const LoadingScreen = (): JSX.Element => {
  const [state, setState] = useState('auth');

  const [isError, setIsError] = useState(false);
  const { eventKey, token } = useParams();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAttemptedLogging, setHasAttemptedLogging] = useState(false);

  useEffect(() => {
    if (token === 'pending') return;

    const authDelay = setTimeout(() => {
      setState('logging');

      const loggingDelay = setTimeout(() => {
        setState('done');

        const doneDelay = setTimeout(() => {
          navigate('/points', { replace: true });
        }, 2000);
        return () => {
          clearTimeout(doneDelay);
        };
      }, 1500);

      return () => {
        clearTimeout(loggingDelay);
      };
    }, 800);

    return () => {
      clearTimeout(authDelay);
    };
  }, []);

  const { data, isLoading } = useQuery<Profile>(
    ['get-profile'],
    async () => {
      const res = await axiosInstance.get('/profile');
      return res.data;
    },
    { enabled: true }
  );

  const logPointsAndRedirect = async (): Promise<void> => {
    if (!eventKey) {
      toastError('Event key is missing. Unable to log points.');
      return;
    }

    try {
      setIsProcessing(true);
      const response = await axiosInstance.patch('/profile', { eventKey });
      toastSuccess(response.data.message);
    } catch (error: any) {
      setIsError(true);
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while logging points.';
      toastError(errorMessage);
    } finally {
      setIsProcessing(false);
      setHasAttemptedLogging(true);
    }
  };

  const handleQAPoints = async (): Promise<void> => {
    if (!token) return;

    try {
      setIsProcessing(true);
      const response = await axiosInstance.patch('/profile/submitForumAnswer', {
        token
      });
      toastSuccess(response.data.message);
      window.location.href = `${String(
        import.meta.env.VITE_QA_URL
      )}/qa?postAnswer=true&token=${token}`;
    } catch (error: any) {
      setIsError(true);
      const errorMessage =
        error.response?.data?.message || 'Failed to log points';
      toastError(errorMessage);
    } finally {
      setIsProcessing(false);
      setHasAttemptedLogging(true);
    }
  };

  useEffect(() => {
    if (!isLoading && !isProcessing && !hasAttemptedLogging) {
      if (!data) {
        const loginUrl = new URL(
          `${String(axiosInstance.defaults.baseURL)}/auth/login`
        );

        if (token === 'pending') {
          loginUrl.searchParams.set('fromQA', 'true');
        } else {
          loginUrl.searchParams.set('fromQR', 'true');
          loginUrl.searchParams.set('eventKey', String(eventKey ?? ''));
          const returnTo = token
            ? `/#/submitAnswer/${token}`
            : `/#/loading/${eventKey ?? ''}`;
          loginUrl.searchParams.set('returnTo', returnTo);
        }

        window.location.href = loginUrl.toString();
        return;
      }

      if (data) {
        // QA forum answer flow - always go through Shibboleth to get fresh JWT
        if (token === 'pending') {
          const loginUrl = new URL(
            `${String(axiosInstance.defaults.baseURL)}/auth/login`
          );
          loginUrl.searchParams.set('fromQA', 'true');
          window.location.href = loginUrl.toString();
          return;
        }

        // QA forum answer flow
        if (token && token !== 'pending' && !hasAttemptedLogging) {
          setTimeout(() => {
            void handleQAPoints();
          }, 1500);
          return;
        }

        // Event check-in flow - eventKey comes from QR code scan
        if (eventKey && !hasAttemptedLogging) {
          void logPointsAndRedirect();
        }
      }
    }
  }, [data, eventKey, isLoading, isProcessing, hasAttemptedLogging, navigate]);

  const Content = (): React.ReactElement => {
    if (isError) {
      return (
        <Box>
          <Heading mb="10px">Sorry, something went wrong</Heading>
          <Box className="text-sm text-gray-500" fontSize="2xl" mb="10px">
            Please try manually logging your points here:
          </Box>
          <Link
            href={String(axiosInstance.defaults.baseURL)}
            fontSize="2xl"
            color="pink"
          >
            {String(axiosInstance.defaults.baseURL)}
          </Link>
        </Box>
      );
    }

    if (isLoading || state === 'auth') {
      return (
        <Box>
          <Heading mb="10px">Authenticating...</Heading>
          <Box className="text-sm text-gray-500" fontSize="2xl" mb="25px">
            Please wait while we verify your profile
          </Box>
        </Box>
      );
    }

    if (isProcessing || state === 'logging') {
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
        <Heading mb="10px">
          {token
            ? 'Answered a Question Successfully!'
            : 'Checked in successfully!'}
        </Heading>
        <Box className="text-sm text-gray-500" fontSize="2xl" mb="25px">
          {token
            ? 'Thanks for contributing to the Q&A forum!'
            : 'Thanks for joining us!'}
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
