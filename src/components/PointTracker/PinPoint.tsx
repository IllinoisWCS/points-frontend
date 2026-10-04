import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface PinPointsProps {
  numLabel: number | string;
  threshholdPassed: boolean;
  isRedeemed?: boolean;
  onClick?: () => void;
}

const PinPoint = ({
  numLabel,
  threshholdPassed,
  isRedeemed,
  onClick
}: PinPointsProps): JSX.Element => {
  const color = 'yellow.400';

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
          bg={color}
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
          bg={color}
          clipPath="polygon(50% 100%, 0% 0%, 100% 0%)"
          mx="auto"
          transform="translateY(-28px)"
        />
      </Box>
    );
  }

  return (
    <Box position="relative" textAlign="center" pt="11px">
      <Box
        width="48px"
        height="48px"
        bg={color}
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
        height="26px"
        bg={color}
        clipPath="polygon(50% 100%, 0% 0%, 100% 0%)"
        mx="auto"
        transform="translateY(-3px)"
      />
    </Box>
  );
};
export default PinPoint;
