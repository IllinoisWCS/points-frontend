import React, { useState, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  VStack,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Center
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import axiosInstance from '../../api';
import { toastError, toastSuccess } from '../../utils/toast';
import { Profile } from '../../types/profile';

const CheckIn = (): React.ReactElement => {
  const [eventKey, setEventKey] = useState('');
  const [eventKeyError, setEventKeyError] = useState(false);
  const navigate = useNavigate();

  const handleChangeKey = (event: BaseSyntheticEvent): void => {
    setEventKey(event.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    const isEventKeyError = eventKey === '';
    setEventKeyError(isEventKeyError);
    if (isEventKeyError) return;

    if (!data) {
      toastError(
        <div>
          Not logged in.{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              void handleClick();
            }}
            style={{ color: '#f9dcf6', textDecoration: 'underline' }}
          >
            Login
          </a>
        </div>
      );
      return;
    }

    axiosInstance
      .patch('/profile', { eventKey })
      .then((res) => {
        toastSuccess(res.data.message);
        navigate('/success');
      })
      .catch((err) => {
        toastError(err.response?.data?.message || 'An error occurred');
        console.log(err);
      });
  };

  const { data } = useQuery<Profile, Error>(
    ['get-profile'],
    async () => {
      try {
        const res = await axiosInstance.get('/profile');
        return res.data;
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          (err as any).response &&
          ((err as any).response.status === 401 ||
            (err as any).response.status === 403)
        ) {
          return null;
        }
        throw err;
      }
    },
    {
      retry: (failureCount, error: any) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          return false;
        }
        return failureCount < 3;
      }
    }
  );

  const handleClick = async (): Promise<void> => {
    if (data) {
      // user clicked logout
      await axiosInstance.post('/auth/logout', {});
      window.location.href = '/';
    } else {
      // user clicked login
      window.location.href = `${String(
        axiosInstance.defaults.baseURL
      )}/auth/login`;
    }
  };

  return (
    <Box>
      <Box>
        <Heading size="lg" pb="25px">
          Check-in
        </Heading>
        <VStack
          align="unset"
          spacing="5"
          bg="white"
          p="5"
          borderRadius="10"
          border="1px"
          borderColor="gray.100"
        >
          <Text fontSize="lg" fontWeight="medium">
            Event Key
          </Text>
          <Input
            isInvalid={eventKeyError}
            placeholder="Enter the event key..."
            value={eventKey}
            onChange={handleChangeKey}
          />
          <Button onClick={handleSubmit}>Check-in</Button>
        </VStack>
      </Box>

      <Heading size="lg" pb="25px">
        <Center>Leaderboard</Center>
      </Heading>
      <VStack
        align="unset"
        spacing="5"
        bg="white"
        p="5"
        borderRadius="10"
        border="1px"
        borderColor="gray.100"
      >
        {data?.map((user, idx) => (
          <Box key={idx} p="5">
            <Text fontSize="lg" fontWeight="medium">
              {user.name}
            </Text>
            <Text className="muted">{user.points}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CheckIn;
