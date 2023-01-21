import { ReactText } from 'react';

export interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
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
  to: string;
}

export interface MobileNavbarProps extends FlexProps {
  onOpen: () => void;
  display?: {
    base: string;
    md: string;
  };
}
