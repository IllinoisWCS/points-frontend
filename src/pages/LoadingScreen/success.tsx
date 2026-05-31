import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import BadgeModal from '../../components/Badges/BadgeModal';
import axiosInstance from '../../api';
import allrounder from '../../assets/badges/all_rounder.png';
import corporate_consultant from '../../assets/badges/corporate_consultant.png';
import corporate_insider from '../../assets/badges/corporate_insider.png';
import corporate_intern from '../../assets/badges/corporate_intern.png';
import explorations_navigator from '@assets/badges/explorations_navigator.png';
import explorations_pioneer from '../../assets/badges/explorations_pioneer.png';
import explorations_rookie from '../../assets/badges/explorations_rookie.png';
import hello_world from '../../assets/badges/hello_world.png';
import mentoring_beacon from '../../assets/badges/mentoring_beacon.png';
import mentoring_guide from '../../assets/badges/mentoring_guide.png';
import mentoring_sprout from '../../assets/badges/mentoring_sprout.png';
import social_butterfly from '../../assets/badges/social_butterfly.png';
import social_caterpillar from '../../assets/badges/social_caterpillar.png';
import social_chrysalis from '../../assets/badges/social_chrysalis.png';

const badgeImageMap: Record<string, string> = {
  'all_rounder.png': allrounder,
  'corporate_consultant.png': corporate_consultant,
  'corporate_insider.png': corporate_insider,
  'corporate_intern.png': corporate_intern,
  'explorations_navigator.png': explorations_navigator,
  'explorations_pioneer.png': explorations_pioneer,
  'explorations_rookie.png': explorations_rookie,
  'hello_world.png': hello_world,
  'mentoring_beacon.png': mentoring_beacon,
  'mentoring_guide.png': mentoring_guide,
  'mentoring_sprout.png': mentoring_sprout,
  'social_butterfly.png': social_butterfly,
  'social_caterpillar.png': social_caterpillar,
  'social_chrysalis.png': social_chrysalis
};

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
