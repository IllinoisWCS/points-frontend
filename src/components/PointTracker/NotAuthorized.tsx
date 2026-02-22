import React, { useEffect } from 'react';
import { Box, Heading, Text, Button, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotAuthorizedPage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    toast({
      title: 'Please find an officer to scan your redemption QR code',
      status: 'error',
      duration: 4000,
      isClosable: true
    });
  }, []);

  return (
    <Box
      p={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <VStack spacing={5} textAlign="center">
        <Heading size="2xl" color="pink.500">
          Not Authorized
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Only officers can verify and redeem vintage merchandise.
        </Text>
        <Button colorScheme="pink" onClick={() => { navigate('/'); }}>
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotAuthorizedPage;
