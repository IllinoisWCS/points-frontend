import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { redeemCheckpoint } from '../../api/checkpoints';

interface PinPointsProps {
  numLabel: number | string;
  threshholdPassed: boolean;
  onClick?: () => void;
}

const PinPoint = ({
  numLabel,
  threshholdPassed,
  onClick
}: PinPointsProps): JSX.Element => {
  // star
  if (threshholdPassed) {
    return (
      <Box
        position="relative"
        textAlign="center"
        cursor="pointer"
        onClick={onClick}
      >
        <Box
          width="70px"
          height="70px"
          bg="yellow.400"
          clipPath={`
  polygon(
    50% 0%, 60% 30%, 95% 30%, 68% 50%,
    80% 80%, 50% 60%, 20% 80%, 32% 50%,
    5% 30%, 40% 30%
  )
`}
          display="flex"
          justifyContent={'center'}
          alignItems="center"
        >
          <Text fontWeight="bold" fontSize="md" color="white">
            {numLabel}
          </Text>
        </Box>

        {/* Pin tail */}
        <Box
          width="12px"
          height="40px"
          bg="yellow.400"
          clipPath="polygon(50% 100%, 0% 0%, 100% 0%)"
          mx="auto"
          transform="translateY(-28px)"
        />
      </Box>
    );
  }

  return (
    <Box position="relative" textAlign="center">
      <Box
        width="48px"
        height="48px"
        bg="yellow.300"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontWeight="bold" fontSize="md" color="white">
          {numLabel}
        </Text>
      </Box>

      <Box
        width="10px"
        height="22px"
        bg="yellow.300"
        clipPath="polygon(50% 100%, 0% 0%, 100% 0%)"
        mx="auto"
        transform="translateY(-2px)"
      />
    </Box>
  );
};
export default PinPoint;
