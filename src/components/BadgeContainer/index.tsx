import React from 'react';
import { Box, Image } from '@chakra-ui/react';

interface BadgeContainerProps {
  badgeId: string;
  image: string;
}

const BadgeContainer = ({
  badgeId,
  image
}: BadgeContainerProps): React.ReactElement => {
  return (
    <Box
      key={badgeId}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="120px"
      height="120px"
      borderRadius="8px"
      backgroundColor="gray.100"
      cursor="pointer"
      transition="background-color 0.2s ease"
      _hover={{ backgroundColor: 'gray.300' }}
    >
      <Image
        src={image}
        alt={`badge-${badgeId}`}
        maxWidth="80px"
        maxHeight="80px"
      />
    </Box>
  );
};

export default BadgeContainer;
