import React from 'react';
import { IconButton, Flex, Stack } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import { MobileNavbarProps } from './types';
import Logo from '../Logo';

import {
  useColorModeValue
} from '../ui/color-mode';

const MobileNavbar = ({
  onOpen,
  ...rest
}: MobileNavbarProps): React.ReactElement => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      p="3"
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
      >
        <FiMenu />
      </IconButton>

      <Stack maxH="100%" justify="center" overflow="hidden" maxW="60dvw">
        <Logo />
      </Stack>
    </Flex>
  );
};

export default MobileNavbar;
