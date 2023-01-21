import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import App from './App';
import './index.css';

const colors = {
  wcs: {
    pink: '#E46167',
    blue: '#64C7CC'
  }
};

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {}
    }
  },
  colors
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
