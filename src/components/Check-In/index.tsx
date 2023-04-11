import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { VStack, Heading, Text, Button, Input, Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import axiosInstance from '../../api';
import { toastError, toastSuccess } from '../../utils/toast';
import Confetti from 'react-confetti';

const CheckIn = (): React.ReactElement => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [eventKey, setEventKey] = useState('');
  const [eventKeyError, setEventKeyError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if(isSubmitted) {
      setShowConfetti(true);// show confetti
      const timer = setTimeout(() => {// do after 3 seconds
        setShowConfetti(false);
        setIsSubmitted(false);
      },3000);
      return () => { clearTimeout(timer); };// clear timer
    }
  }, [isSubmitted]); // isSubmitted is a dependency!

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
    setIsSubmitted(true);
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
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={100}
          recycle={false}
          run={showConfetti}
        />
      </VStack>
    </Box>
  );
};

export default CheckIn;
