import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/api';
import { useQuery } from 'react-query';
import { toastError } from '../utils/toast';
import { Profile } from '../types/profile';
import { Heading, Box, VStack, Progress } from '@chakra-ui/react';

const VintageLoadingScreen = (): JSX.Element => {
  const { netId } = useParams<{ netId: string; }>();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const hasRedirected = useRef(false);

  const { data: profile, isLoading } = useQuery<Profile>(
    ['get-profile'],
    async () => {
      const res = await axiosInstance.get('/profile');
      return res.data;
    }
  );

  useEffect(() => {
    if (isLoading || isProcessing || hasAttempted || hasRedirected.current)
      return;

    if (!profile) {
      // Not logged in
      hasRedirected.current = true;
      const loginUrl = new URL(
        `${String(axiosInstance.defaults.baseURL)}/auth/login`
      );
      loginUrl.searchParams.set('fromQR', 'true');
      loginUrl.searchParams.set(
        'returnTo',
        `/#/vintage-loading/${netId ?? ''}`
      );
      window.location.href = loginUrl.toString();
      return;
    }

    void redeemCheckpoint();
  }, [profile, isLoading, isProcessing, hasAttempted]);

  const redeemCheckpoint = async (): Promise<void> => {
    if (!netId) {
      toastError('Missing user netId in QR code.');
      navigate('/not-authorized', { replace: true });
      return;
    }

    setIsProcessing(true);
    try {
      await axiosInstance.patch('/vintage/redeem', { targetNetId: netId });
      navigate('/vintage-success', { replace: true });
    } catch (error: any) {
      if (error.response?.status === 403) {
        navigate('/not-authorized', { replace: true }); // not an officer
      } else {
        toastError(error.response?.data?.message ?? 'Something went wrong.');
        navigate('/not-authorized', { replace: true });
      }
    } finally {
      setIsProcessing(false);
      setHasAttempted(true);
    }
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
        <Box>
          <Heading mb="10px">Verifying...</Heading>
          <Box className="text-sm text-gray-500" fontSize="2xl" mb="25px">
            Please wait while we verify your credentials
          </Box>
        </Box>
        <Progress
          size="sm"
          minW="300px"
          maxW="40vw"
          width="30vw"
          isIndeterminate
        />
      </VStack>
    </Box>
  );
};

export default VintageLoadingScreen;
