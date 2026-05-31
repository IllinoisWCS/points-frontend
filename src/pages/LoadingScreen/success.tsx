import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import BadgeModal from '../../components/Badges/BadgeModal';
import axiosInstance from '../../api';
import { badgeImageMap } from '../../utils/badgeImageMap';

const SuccessPage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const location = useLocation();
  const [badgeQueue, setBadgeQueue] = useState<Badge[]>([]);

  useEffect(() => {
    const newBadgeNames: string[] = location.state?.newBadges ?? [];
    if (newBadgeNames.length > 0) {
      axiosInstance
        .get('/badges')
        .then((res) => {
          const catalog: Badge[] = res.data;
          const earned = newBadgeNames
            .map((name) => catalog.find((b) => b.name === name))
            .filter(Boolean) as Badge[];
          setBadgeQueue(earned);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
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
          You have successfully checked in.
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
      {badgeQueue.length > 0 && (
        <BadgeModal
          isOpen={true}
          onClose={() => {
            setBadgeQueue((prev) => prev.slice(1));
          }}
          titleText={badgeQueue[0].name}
          image={badgeImageMap[badgeQueue[0].image] ?? ''}
          descriptionText={badgeQueue[0].description}
          isEarned={true}
        />
      )}
    </Box>
  );
};

export default SuccessPage;
