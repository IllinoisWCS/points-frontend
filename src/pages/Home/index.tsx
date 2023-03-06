import React, { useEffect } from 'react';
import { Heading, Box, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Points from '../../components/Points';

import axiosInstance from '../../api';
import { Profile } from '../../types/profile';
import CheckIn from '../../components/Check-In';

const Home = (): React.ReactElement => {
  const { isLoading, isError, error, data } = useQuery<Profile, Error>(
    ['get-profile'],
    async () => {
      const res = await axiosInstance.get('/profile');
      console.log('RES.DATA', res.data);
      return res.data;
    }
  );

  useEffect(() => {
    console.log('DATA IN USEEFFECT', data);
    console.log('IS LOADING', isLoading);
  }, [isLoading, data]);

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
      <VStack
        align="unset"
        spacing="5"
        p="5"
        borderRadius="10"
        border="1px"
        borderColor="gray.100"
      >
        <CheckIn />
        <Points
          key={String(isLoading)}
          isLoading={isLoading}
          isError={isError}
          error={error}
          data={data}
        />
      </VStack>
    </Box>
  );
};

export default Home;
