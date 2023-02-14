import React, { useState, BaseSyntheticEvent } from 'react';
import { VStack, Heading, Text, Button, Input, Box} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import axiosInstance from '../../api';
import { toastError, toastSuccess } from '../../utils/toast';

// changes
import Points from '../Points/points';

const CheckIn = (): React.ReactElement => {
  const [eventKey, setEventKey] = useState('');
  const [eventKeyError, setEventKeyError] = useState(false);

  const handleChangeKey = (event: BaseSyntheticEvent): void => {
    setEventKey(event.target.value);
  };

  const handleSubmit = (): void => {
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

  const { isError, error } = useQuery<Promise<void>, Error>(
    ['get-profile'],
    async () => {
      await axiosInstance.get('/profile');
    }
  );

  if (isError) {
    console.log(error);
    return (
      <Box>
        <Heading size="lg">Temporary Error</Heading>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="lg" pb="25px">
        Check-in
      </Heading>
      <VStack
        align="unset"
        spacing="5"
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
      <Points/>
    </Box>
  );
};

export default CheckIn;