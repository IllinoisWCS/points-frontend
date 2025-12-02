import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface PinPointsProps {
  numLabel: number | string;
  threshholdPassed: boolean;
}

const PinPointStar: React.FC<{
  size?: number;
  fill?: string;
  points?: number;
}> = ({ size = 300, fill = '#FAEA58', points = 8 }) => {
  const radiusOuter = size / 2;
  const radiusInner = radiusOuter / 2.2;

  // generate points for star path
  const starPath =
    Array.from({ length: points * 2 }, (_, i) => {
      const angle = (Math.PI / points) * i;
      const r = i % 2 === 0 ? radiusOuter : radiusInner;
      const x = r * Math.sin(angle);
      const y = -r * Math.cos(angle);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ') + ' Z';

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      style={{ position: 'absolute', inset: 0 }}
    >
      <path d={starPath} fill={fill} stroke="#FAEA58" strokeWidth={1} />
    </svg>
  );
};

const PinPoint = ({
  numLabel,
  threshholdPassed
}: PinPointsProps): JSX.Element => {
  if (threshholdPassed) {
    return (
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {/* Pin head (star) */}
        <Box
          width="70px"
          height="70px"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PinPointStar size={70} />
          <Text fontWeight="bold" fontSize="lg" color="white" zIndex={1}>
            {numLabel}
          </Text>
        </Box>

        {/* Pin tail */}
        <Box
          position="absolute"
          top="45px"
          width="13px"
          height="40px"
          bg="#FAEA58"
          clipPath="polygon(50% 100%, 0% 0%, 100% 0%)"
          mx="auto"
        />
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {/* Pin head (normal circle) */}
      <Box
        width="45px"
        height="45px"
        bg="#FAEA58"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        marginTop="8px"
      >
        <Text fontWeight="bold" fontSize="lg" color="white">
          {numLabel}
        </Text>
      </Box>

      {/* Pin tail */}
      <Box
        position="absolute"
        top="45px"
        width="13px"
        height="40px"
        bg="#FAEA58"
        clipPath="polygon(50% 100%, 0% 0%, 100% 0%)"
        mx="auto"
      />
    </Box>
  );
};

export default PinPoint;
