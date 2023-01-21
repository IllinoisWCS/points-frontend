import React from 'react';
// import { Link } from 'react-router-dom';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Text
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiMenu } from 'react-icons/fi';

import logo from '../../assets/logo.png';
import './style.css';
import {
  LinkItemProps,
  MobileNavbarProps,
  NavbarProps,
  NavItemProps
} from './types';

// const Navbar = (): React.ReactElement => (
//   <div className="navbar-container">
//     <a href="http://wcs.illinois.edu">
//       <img src={logo} alt="wcs logo" />
//     </a>
//     <div className="navbar">
//       <Link className="navbar-element" to="/">
//         Check-in
//       </Link>
//       <Link className="navbar-element" to="/points">
//         Points
//       </Link>
//       <Link className="navbar-element" to="/events">
//         Events
//       </Link>
//     </div>
//   </div>
// );

const LinkItems: LinkItemProps[] = [
  { name: 'Home', icon: FiHome },
  { name: 'Points', icon: FiTrendingUp },
  { name: 'Events', icon: FiCompass }
];

const Navbar = ({ onClose, ...rest }: NavbarProps): React.ReactElement => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <a href="http://wcs.illinois.edu">
            <img src={logo} alt="wcs logo" />
          </a>
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({
  icon,
  children,
  ...rest
}: NavItemProps): React.ReactElement => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export const MobileNavbar = ({
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
        Logo
      </Text>
    </Flex>
  );
};

export default Navbar;
