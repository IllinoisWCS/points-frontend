import React from 'react';

import BadgeContainer from '../../components/Badges/BadgeContainer';
import BadgeModal from '../../components/Badges/BadgeModal';
import allrounder from '../../assets/badges/all_rounder.png';
import { Heading, Box, Center, Text } from '@chakra-ui/react';
import { Profile } from '../../types/profile';
import axiosInstance from '../../api';
import { useQuery } from 'react-query';

const Badges = (): React.ReactElement => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const { isError, error, data } = useQuery<Profile, Error>(
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
  const name = String(names?.[0] ?? '');

  const handleClick = async (): Promise<void> => {
    // user clicked login
    window.location.href = `${String(
      axiosInstance.defaults.baseURL
    )}/auth/login`;
  };

  return (
    <Box>
      <Heading size="lg">{data ? `${name}'s Badges` : 'Badges'}</Heading>
      <Center mb="5">
        <Text fontSize="xl">
          {data ? (
            'Attend WCS Events to Collect ‘Em All!'
          ) : (
            <>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  void handleClick();
                }}
                style={{
                  color: '#E46167',
                  textDecoration: 'underline'
                }}
              >
                Login
              </a>
              {' to Collect ‘Em All!'}
            </>
          )}
        </Text>
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
    </Box>
  );
};

export default Badges;
