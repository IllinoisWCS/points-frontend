import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import PinPoint from './PinPoint';
import PinPointModal from './PinPointModal';
import { getCheckpointCount } from '../../api/checkpoints';
import { useQuery } from 'react-query';

interface PointBarProps {
  numPoints: number;
  maxPoints: number;
  milestones: number[];
  netId?: string;
}

const PointBar = ({
  numPoints,
  maxPoints,
  milestones,
  netId
}: PointBarProps): JSX.Element => {
  const fillPercentage = (numPoints / maxPoints) * 100;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [selectedRedeemed, setSelectedRedeemed] = useState(false);
  const { data: nCheckpoints = 0 } = useQuery(
    ['get-checkpoint-count'],
    getCheckpointCount,
    { refetchInterval: 3000 }
  );

  const redeemed = nCheckpoints ?? 0;
  const passedMilestones = milestones.filter((m) => m <= numPoints);
  const redeemedSet = new Set(passedMilestones.slice(0, redeemed));

  const handleStarClick = (point: number, isRedeemed: boolean): void => {
    setSelectedPoint(point);
    setSelectedRedeemed(isRedeemed);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!modalOpen || selectedPoint === null) return;
    if (redeemedSet.has(selectedPoint)) {
      setModalOpen(false);
    }
  }, [nCheckpoints]);

  return (
    <Box w="100%" position="relative" pt="80px" pb={4}>
      {milestones.map((m, i) => {
        const percentage = (m / maxPoints) * 100;
        const isPassed = numPoints >= m;
        const isRedeemed = redeemedSet.has(m);

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
              threshholdPassed={isPassed}
              isRedeemed={isRedeemed}
              onClick={
                isPassed
                  ? () => {
                      handleStarClick(m, isRedeemed);
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
          message={
            `Reached ${selectedPoint} points! ` +
            (selectedRedeemed
              ? 'Already redeemed.'
              : 'Have officer scan to redeem.')
          }
          netId={selectedRedeemed ? undefined : netId}
          image={''}
        />
      )}
    </Box>
  );
};

export default PointBar;
