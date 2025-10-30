import React from 'react';
import { Box } from '@chakra-ui/react';

interface PointBarProps {
  numPoints: number;
  maxPoints: number;
}

const PointBar = ({ numPoints, maxPoints }: PointBarProps): JSX.Element => {
  const fillPercentage = (numPoints / maxPoints) * 100;

  return (
    <Box w="100%" p={4}>
      <Box position="relative" w="100%" h="50px">
        <Box
          position="absolute"
          w="100%"
          h="45px"
          bg="#4a9690"
          borderRadius="10px"
          overflow="hidden"
          boxShadow="0 3px 6px rgba(0, 0, 0, 0.15)"
        />

        <Box
          position="absolute"
          inset="0"
          border="8px solid"
          borderColor="#5eb9b4"
          borderRadius="10px"
          pointerEvents="none"
        />
        {fillPercentage > 0 && (
          <Box
            position="absolute"
            // left = "8px"
            // top = "8px"
            // right = "8px"
            top="8px"
            bottom="8px"
            left="8px"
            // h = "28px"
            w={`calc(${fillPercentage}%)`}
            minW="30px"
            bg="#e07470"
            borderRadius="4px"
            transition="width 0.5s ease"
          />
        )}

        {fillPercentage > 0 && (
          <Box
            position="absolute"
            left="12px"
            top="12px"
            h="8px"
            w={`calc(${fillPercentage}% - 10px)`}
            minW="20px"
            bg="#f0b3b0"
            borderRadius="4px"
            transition="width 0.5s ease"
          />
        )}

        {fillPercentage > 0 && (
          <Box
            position="absolute"
            left="8px"
            bottom="8px"
            h="10px"
            w={`calc(${fillPercentage}%)`}
            minW="20px"
            bg="#d85d5a"
            borderRadius="3px"
            transition="width 0.5s ease"
          />
        )}
      </Box>
    </Box>
  );
};
export default PointBar;
