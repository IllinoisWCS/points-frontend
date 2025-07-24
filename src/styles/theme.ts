import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        pink: { value: '#E46167' },
        blue: { value: '#64C7CC' }
      }
    },
    semanticTokens: {
      colors: {
        'bg.canvas': {
          value: {
            base: 'white',
            _dark: 'gray.900'
          }
        },
        'fg.default': {
          value: {
            base: 'gray.900',
            _dark: 'white'
          }
        }
      }
    }
  }
});

const theme = createSystem(defaultConfig, config);
export default theme;
