'use client';

import type { IconButtonProps, BoxProps } from '@chakra-ui/react';
import { IconButton, Box } from '@chakra-ui/react';
import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import * as React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps): JSX.Element {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={true}
      {...props}
    />
  );
}

export type ColorMode = 'light' | 'dark';

export interface UseColorModeReturn {
  colorMode: ColorMode | undefined;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleColorMode = (): void => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode
  };
}
export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}

export function ColorModeIcon(): JSX.Element {
  const { colorMode } = useColorMode();
  if (!colorMode) return <LuSun />;
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />;
}

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
      >
        <LuSun />
      </IconButton>
    );
  }

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      {...props}
    >
      <ColorModeIcon />
    </IconButton>
  );
});

export const LightMode = React.forwardRef<HTMLDivElement, BoxProps>(
  function LightMode(props, ref) {
    return <Box data-theme="light" ref={ref} {...props} />;
  }
);

export const DarkMode = React.forwardRef<HTMLDivElement, BoxProps>(
  function DarkMode(props, ref) {
    return <Box data-theme="dark" ref={ref} {...props} />;
  }
);
