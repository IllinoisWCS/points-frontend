import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { VStack, Heading, Text, Button, Input, Box } from '@chakra-ui/react';

import axiosInstance from '../../api';
import { toastError, toastSuccess } from '../../utils/toast';

import './style.css';

const CheckIn = (): React.ReactElement => {
  const [eventKey, setEventKey] = useState('');
  const [eventKeyError, setEventKeyError] = useState(false);

  const handleChangeKey = (event: BaseSyntheticEvent): void => {
    setEventKey(event.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    const isEventKeyError = eventKey === '';
    setEventKeyError(isEventKeyError);
    if (isEventKeyError) return;

    axiosInstance
      .patch('/profile', { eventKey })
      .then((res) => {
        toastSuccess(res.data.message);
      })
      .catch((err) => {
        toastError(err.response.data.message);
        console.log(err);
      });
  };

  useEffect(() => {
    // Temporary patch to ensure users are authenticated before checking in
    // TODO: Remove after implementing proper login flow
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axiosInstance.get('/profile');
  }, []);

  return (
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
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button onClick={handleSubmit}>Check-in</Button>
      </VStack>
    </Box>
  );
};

export default CheckIn;
