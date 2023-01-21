import React from 'react';
import { IconButton, Flex, useColorModeValue, Text } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import './style.css';
import { MobileNavbarProps } from './types';
import Logo from '../Logo';

const MobileNavbar = ({
  onOpen,
  ...rest
}: MobileNavbarProps): React.ReactElement => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
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
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        {/* TODO: nest logo in something else & add padding */}
        <Logo />
      </Text>
    </Flex>
  );
};

export default MobileNavbar;
