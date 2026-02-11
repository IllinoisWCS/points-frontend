import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import PinPoint from './PinPoint';
import PinPointModal from './PinPointModal';
// import logo from '../assets/logo.png';

interface PointBarProps {
  numPoints: number;
  maxPoints: number;
  milestones: number[];
}

const PointBar = ({
  numPoints,
  maxPoints,
  milestones
}: PointBarProps): JSX.Element => {
  // const numPoints = 20;
  const fillPercentage = (numPoints / maxPoints) * 100;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const handleStarClick = (point: number): void => {
    setSelectedPoint(point);
    setModalOpen(true);
  };
  return (
    <Box w="100%" position="relative" pt="80px" pb={4}>
      {milestones.map((m, i) => {
        const percentage = (m / maxPoints) * 100;
        return (
          <Box
            key={i}
            position="absolute"
            top="25px"
            left={`${Math.min(percentage, 99)}%`}
            transform="translateX(-50%)"
            zIndex={2}
          >
            <PinPoint
              numLabel={m}
              threshholdPassed={numPoints >= m}
              onClick={
                numPoints >= m
                  ? (): void => {
                      handleStarClick(m);
                    }
                  : undefined
              }
            />
          </Box>
        );
      })}

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
            top="8px"
            bottom="8px"
            left="8px"
            w={`calc(${fillPercentage}% - 16px)`}
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
            w={`calc(${fillPercentage}% - 22px)`}
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
            w={`calc(${fillPercentage}% - 16px)`}
            minW="20px"
            bg="#d85d5a"
            borderRadius="3px"
            transition="width 0.5s ease"
          />
        )}
      </Box>
      {selectedPoint !== null && (
        <PinPointModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          // image="/path/to/image.png"
          image="https://via.placeholder.com/150"
          message={
            `Reached ${selectedPoint} points! ` + 'Have officer scan to redeem.'
          }
        />
      )}
    </Box>
  );
};
export default PointBar;
