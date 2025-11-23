import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '../theme';
import router from './router';
import api from '../src/axios';
import { LanguageProvider } from './LanguageProvider';
import useOnlineSync from './hooks/useOnlineSync';
import 'virtual:pwa-register';


function App() {
  useOnlineSync();
  return (
    <LanguageProvider api={api}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </LanguageProvider>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
