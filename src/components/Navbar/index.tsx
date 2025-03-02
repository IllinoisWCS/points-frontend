import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import {
  Heading,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  useColorMode,
  Button
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import { DarkModeToggle } from 'react-dark-mode-toggle-2';
import { useQuery } from 'react-query';
import axiosInstance from '../../api';
import { Profile } from '../../types/profile';
import { LinkItemProps, NavbarProps, NavItemProps } from './types';
import Logo from '../Logo';

const LinkItems: LinkItemProps[] = [
  { name: 'Home', icon: FiHome, to: '/' },
  { name: 'Points', icon: FiTrendingUp, to: '/points' },
  { name: 'Events', icon: FiCalendar, to: '/events' }
];

const Navbar = ({ onClose, ...rest }: NavbarProps): React.ReactElement => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isError, error, data } = useQuery<Profile, Error>(
    ['get-profile'],
    async () => {
      try {
        const res = await axiosInstance.get('/profile');
        return res.data;
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          (err as any).response &&
          ((err as any).response.status === 401 ||
            (err as any).response.status === 403)
        ) {
          return null;
        }
        throw err;
      }
    },
    {
      retry: (failureCount, error: any) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          return false;
        }
        return failureCount < 3;
      }
    }
  );

  const Greeting = (): React.ReactElement => {
    if (!data) return <></>;

    const names = data?.name.split(' ');
    const name = names[0];

    return (
      <Box p="4" m="4">
        <Text>Welcome back, {name}!</Text>
      </Box>
    );
  };

  if (isError) {
    console.log(error);
    return (
      <Box>
        <Heading size="lg">Temporary Error</Heading>
      </Box>
    );
  }

  const handleClick = async (): Promise<void> => {
    if (data) {
      // user clicked logout
      await axiosInstance.post('/auth/logout', {});
      window.location.href = '/';
    } else {
      // user clicked login
      window.location.href = `${String(
        axiosInstance.defaults.baseURL
      )}/auth/login`;
    }
  };

  if (isError) {
    console.log(error);
    return (
      <Box>
        <Heading size="lg">Temporary Error</Heading>
      </Box>
    );
  }

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Logo />
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Greeting />
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}
      <Flex align="center" p="4" mx="4">
        <DarkModeToggle
          onChange={toggleColorMode}
          isDarkMode={colorMode === 'light'}
          key={colorMode}
        />
      </Flex>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
      >
        <Button
          onClick={(e) => {
            void handleClick();
          }}
        >
          {data ? 'Logout' : 'Login'}
        </Button>
      </Flex>
    </Box>
  );
};

const NavItem = ({
  to,
  onClick,
  icon,
  children,
  ...rest
}: NavItemProps): React.ReactElement => {
  return (
    <RouteLink to={to} onClick={onClick}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'pink',
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
    </RouteLink>
  );
};

export default Navbar;
