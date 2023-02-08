import React, { useState, BaseSyntheticEvent } from 'react';
import { VStack, Heading, Text, Button, Input, Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import axiosInstance from '../../api';
import { toastError, toastSuccess } from '../../utils/toast';

// added by me
// import CheckInTEST from '../../components/CheckInTEST';
import PointsTEST from '../../components/PointsTEST';
// import Logo from '../../components/Logo';

const Home = (): React.ReactElement => {
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
        Home
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

      <VStack
        align="unset"
        spacing="5"
        bg="white"
        p="5"
        borderRadius="10"
        border="1px"
        borderColor="gray.100"
      >
        <PointsTEST></PointsTEST>
      </VStack>
    </Box>
  );
};

export default Home;
