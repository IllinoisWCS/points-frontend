import React from 'react';

import BadgeContainer from '../../components/Badges/BadgeContainer';
import BadgeModal from '../../components/Badges/BadgeModal';
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
import not_tiered from '../../assets/badges/not_tiered.png';
import social_butterfly from '../../assets/badges/social_butterfly.png';
import social_caterpillar from '../../assets/badges/social_caterpillar.png';
import social_chrysalis from '../../assets/badges/social_chrysalis.png';
import tier1 from '../../assets/badges/tier1.png';
import tier2 from '../../assets/badges/tier2.png';
import tier3 from '../../assets/badges/tier3.png';
import { Heading, Box, Center, Text } from '@chakra-ui/react';
import { Profile } from '../../types/profile';
import axiosInstance from '../../api';
import { useQuery } from 'react-query';

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
  'not_tiered.png': not_tiered,
  'social_butterfly.png': social_butterfly,
  'social_caterpillar.png': social_caterpillar,
  'social_chrysalis.png': social_chrysalis,
  'tier1.png': tier1,
  'tier2.png': tier2,
  'tier3.png': tier3
};

const Badges = (): React.ReactElement => {
  const [badgeCatalog, setBadgeCatalog] = React.useState<Badge[]>([]);
  const [earnedBadgeNames, setEarnedBadgeNames] = React.useState<string[]>([]);
  const [selectedBadge, setSelectedBadge] = React.useState<Badge | null>(null);

  React.useEffect(() => {
    void (async (): Promise<void> => {
      try {
        const [badgesRes, profileRes] = await Promise.all([
          axiosInstance.get('/badges'),
          axiosInstance.get('/profile')
        ]);
        setBadgeCatalog(badgesRes.data);
        setEarnedBadgeNames(profileRes.data.badges ?? []);
      } catch (err) {
        console.error('Failed to fetch badges or profiles', err);
      }
    })();
  }, []);

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
    <>
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
      </Box>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {badgeCatalog.map(
          (badge): React.ReactElement => (
            <BadgeContainer
              key={badge._id.toString()}
              badgeId={badge._id.toString()}
              image={
                earnedBadgeNames.includes(badge.name)
                  ? badgeImageMap[badge.image] ?? ''
                  : badge.isTiered
                  ? badge.tier === 1
                    ? tier1
                    : badge.tier === 2
                    ? tier2
                    : tier3
                  : not_tiered
              }
              isEarned={earnedBadgeNames.includes(badge.name)}
              onClick={() => {
                setSelectedBadge(badge);
              }}
            />
          )
        )}
      </div>

      {selectedBadge && (
        <BadgeModal
          isOpen={true}
          onClose={() => {
            setSelectedBadge(null);
          }}
          titleText={
            earnedBadgeNames.includes(selectedBadge.name)
              ? selectedBadge.name
              : '???'
          }
          image={
            earnedBadgeNames.includes(selectedBadge.name)
              ? badgeImageMap[selectedBadge.image] ?? ''
              : selectedBadge.isTiered
              ? selectedBadge.tier === 1
                ? tier1
                : selectedBadge.tier === 2
                ? tier2
                : tier3
              : not_tiered
          }
          descriptionText={
            earnedBadgeNames.includes(selectedBadge.name)
              ? selectedBadge.description
              : selectedBadge.unearnedDescription
          }
          isEarned={earnedBadgeNames.includes(selectedBadge.name)}
        />
      )}
    </>
  );
};

export default Badges;
