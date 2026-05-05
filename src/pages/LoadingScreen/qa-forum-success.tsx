import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const QAForumSuccessPage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const toast = useToast();

  useEffect(() => {
    toast({
      id: 'qa-forum-success',
      title: 'Answered a question successfully',
      status: 'success',
      duration: 4000,
      isClosable: true
    });
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box
      p={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      {showConfetti && <Confetti width={width} height={height} />}
      <VStack spacing={5} textAlign="center">
        <Heading size="2xl" color="pink.500">
          Success!
        </Heading>
        <Text fontSize="lg" color="gray.600">
          You have successfully answered a question on the forum!
        </Text>
        <Button
          colorScheme="pink"
          onClick={() => {
            navigate('/');
          }}
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default QAForumSuccessPage;
