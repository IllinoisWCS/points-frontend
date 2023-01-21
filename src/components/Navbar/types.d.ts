import { ReactText } from 'react';

export interface LinkItemProps {
  name: string;
  icon: IconType;
}

export interface NavbarProps extends BoxProps {
  onClose: () => void;
  display?: {
    base: string;
    md: string;
  };
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

export interface MobileNavbarProps extends FlexProps {
  onOpen: () => void;
  display?: {
    base: string;
    md: string;
  };
}
