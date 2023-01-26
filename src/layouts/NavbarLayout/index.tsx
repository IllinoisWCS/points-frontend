import React, { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  DrawerOverlay
} from '@chakra-ui/react';

import Navbar from '../../components/Navbar';
import MobileNavbar from '../../components/Navbar/MobileNavbar';

const NavbarLayout = ({
  children
}: {
  children: ReactNode;
}): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navbar onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <Navbar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNavbar display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="10">
        {children}
      </Box>
    </Box>
  );
};

export default NavbarLayout;
