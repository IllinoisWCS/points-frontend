'use client';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import theme from '../../styles/theme';

export function Provider(props: ColorModeProviderProps): JSX.Element {
  return (
    <ColorModeProvider {...props}>
      <ChakraProvider value={theme}>{props.children}</ChakraProvider>
    </ColorModeProvider>
  );
}
