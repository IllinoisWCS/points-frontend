import { extendTheme } from '@chakra-ui/theme-utils';

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {}
    }
  },
  colors: {
    pink: '#E46167',
    blue: '#64C7CC'
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true
  }
});

export default theme;
