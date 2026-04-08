import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
  Box
} from '@chakra-ui/react';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleText: string;
  image: string;
  descriptionText: string;
}

const BadgeModal = ({
  isOpen,
  onClose,
  titleText,
  image,
  descriptionText
}: BadgeModalProps): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="0 8px 40px rgba(0,0,0,0.18)"
        maxW="360px"
        fontFamily="'Courier New', Courier, monospace"
        bg="white"
      >
        <ModalCloseButton
          top={3}
          right={3}
          borderRadius="full"
          size="sm"
          color="black"
          _hover={{ bg: 'gray.100' }}
          _focus={{ boxShadow: 'none' }}
        />

        <ModalBody py={8} px={8}>
          <VStack spacing={5} align="center">
            <Text
              fontSize="xl"
              fontWeight="800"
              letterSpacing="tight"
              textAlign="center"
              fontFamily="'Courier New', Courier, monospace"
              color="gray.800"
            >
              {titleText}
            </Text>

            <Box display="flex" alignItems="center" justifyContent="center">
              <Image
                src={image}
                alt={titleText}
                boxSize="160px"
                objectFit="contain"
              />
            </Box>

            <Text
              fontSize="md"
              textAlign="center"
              color="gray.700"
              fontFamily="'Courier New', Courier, monospace"
              lineHeight="1.5"
            >
              {descriptionText}
            </Text>

            <Box w="80%" h="1px" bg="gray.200" />

            <Text
              fontSize="sm"
              color="gray.500"
              textAlign="center"
              fontFamily="'Courier New', Courier, monospace"
            >
              Share your accomplishment with friends!
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BadgeModal;
