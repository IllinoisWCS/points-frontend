import React from 'react';
import BadgeContainer from '../../components/Badges/BadgeContainer';
import BadgeModal from '../../components/Badges/BadgeModal';
import { badgeImageMap } from '../../utils/badgeImageMap';
import axiosInstance from '../../api';
import { Box, Heading, Center, Text } from '@chakra-ui/react';
import { Profile } from '../../types/profile';
import { useQuery } from 'react-query';

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
              'Attend WCS Events to Collect \u2019Em All!'
            ) : (
              <>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    void handleClick();
                  }}
                  style={{ color: '#E46167', textDecoration: 'underline' }}
                >
                  Login
                </a>
                {' to Collect \u2019Em All!'}
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
                    ? badgeImageMap['tier1.png']
                    : badge.tier === 2
                    ? badgeImageMap['tier2.png']
                    : badgeImageMap['tier3.png']
                  : badgeImageMap['not_tiered.png']
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
                ? badgeImageMap['tier1.png']
                : selectedBadge.tier === 2
                ? badgeImageMap['tier2.png']
                : badgeImageMap['tier3.png']
              : badgeImageMap['not_tiered.png']
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
