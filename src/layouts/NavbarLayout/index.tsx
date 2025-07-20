import React, { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Drawer,
  useDisclosure,
} from '@chakra-ui/react';
import {useColorModeValue } from '../../components/ui/color-mode';
import Navbar from '../../components/Navbar';
import MobileNavbar from '../../components/Navbar/MobileNavbar';

const NavbarLayout = ({
  children
}: {
  children: ReactNode;
}): React.ReactElement => {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navbar onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer.Root
        autoFocus={false}
        isOpen={open}
        placement="start"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <Drawer.Backdrop />
        <Drawer.Content>
          <Navbar onClose={onClose} />
        </Drawer.Content>
      </Drawer.Root>
      <MobileNavbar display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="10">
        {children}
      </Box>
    </Box>
  );
};

export default NavbarLayout;
