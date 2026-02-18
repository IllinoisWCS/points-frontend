import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import PinPoint from './PinPoint';
import PinPointModal from './PinPointModal';
import { getCheckpointCount } from '../../api/api';
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
  const fillPercentage = (numPoints / maxPoints) * 100;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const { data: nCheckpoints = 0 } = useQuery(
    ['get-checkpoint-count'],
    getCheckpointCount
  );

  const handleStarClick = (point: number): void => {
    setSelectedPoint(point);
    setModalOpen(true);
  };

  const numQRCodes = (
    totalPoints: number
  ): [numCheckpoints: number, numQRCodes: number] => {
    const redeemed = nCheckpoints ?? 0;
    const checkpointsEarned = milestones.filter((m) => m <= totalPoints).length;
    const numQRCodesAvailable = checkpointsEarned - redeemed;
    return [redeemed, numQRCodesAvailable];
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
      <Text fontSize="sm" color="gray.600" mt={2}>
        Redeemed: {numQRCodes(numPoints)[0]} | Available:{' '}
        {numQRCodes(numPoints)[1]}
      </Text>
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
