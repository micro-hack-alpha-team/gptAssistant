'use client';
import React, { ReactNode } from 'react';
import { ChakraProvider, Box, Portal, useDisclosure } from '@chakra-ui/react';
import routes from '@/routes';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import AppWrappers from '../AppWrappers';
import "../style.css"
export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body>
        <AppWrappers>
         
            <Box>
              <Box
                pt={{ base: '60px', md: '100px' }}
                float="right"
                minHeight="100vh"
                height="100%"
                overflow="auto"
                position="relative"
                maxHeight="100%"
                width={"100%"}
                transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                transitionDuration=".2s, .2s, .35s"
                transitionProperty="top, bottom, width"
                transitionTimingFunction="linear, linear, ease"
              >
                <Portal>
                  <Box>
                    <Navbar
                      setApiKey={null}
                      onOpen={null!}
                      logoText={'Horizon UI Dashboard PRO'}
                      brandText={getActiveRoute(routes, "pathname")}
                      secondary={getActiveNavbar(routes, "pathname")}
                    />
                  </Box>
                </Portal>
                <Box
                  mx="auto"
                  p={{ base: '20px', md: '30px' }}
                  pe="20px"
                  minH="100vh"
                  pt="50px"
                >
                  {children}
                  {/* <Component apiKeyApp={apiKey} {...pageProps} /> */}
                </Box>
                <Box>
                  <Footer />
                </Box>
              </Box>
            </Box>
        
          {/* </ChakraProvider> */}
        </AppWrappers>
      </body>
    </html>
  );
}
