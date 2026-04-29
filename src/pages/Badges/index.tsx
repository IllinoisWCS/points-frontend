import React from 'react';
import { useQuery } from 'react-query';
import BadgeContainer from '../../components/Badges/BadgeContainer';
import BadgeModal from '../../components/Badges/BadgeModal';
import allrounder from '../../assets/badges/all_rounder.png';
import axiosInstance from '../../api';
import { Heading, Box, Center } from '@chakra-ui/react';
import { Profile } from '../../types/profile';

const Badges = (): React.ReactElement => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const { isError, error, data } = useQuery<Profile | null, Error>(
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
      retry: (failureCount: number, error: any) => {
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

  if (isError) {
    console.log(error);
    return (
      <Box>
        <Heading size="lg">Temporary Error</Heading>
      </Box>
    );
  }

  const names = data?.name?.split(' ');
  const firstName = names?.[0] ?? '';

  return (
    <>
      <Center>
        <Heading size="xl" pb="25px">
          {firstName ? `${firstName}'s Badge Display` : 'Badge Display'}
        </Heading>
      </Center>
      <Center>
        <Heading size="med" pb="25px">
          {firstName
            ? 'Attend WCS Events to Collect \'Em All!'
            : 'Login to Collect \'Em All!'}
        </Heading>
      </Center>

      <BadgeContainer
        badgeId={''}
        image={''}
        isEarned={false}
        onClick={() => {
          setModalOpen(true);
        }}
      />
      <BadgeModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        titleText={'Template Badge Title'}
        image={allrounder}
        descriptionText={'This is a template badge description.'}
      />
    </>
  );
};

export default Badges;
