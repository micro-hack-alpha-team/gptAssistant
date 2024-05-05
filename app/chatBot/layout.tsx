'use client';
import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import AppWrappers from '../AppWrappers';
import '../style.css';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppWrappers>
          <div className="absolute top-8 left-[50%]">
            <h2 className="text-4xl font-bold animate-bounce -translate-x-[50%]">
              Ged Boost assistant
            </h2>
          </div>

          <div className=' pt-20'>
            {children}
            {/* <Component apiKeyApp={apiKey} {...pageProps} /> */}
          </div>

          {/* </ChakraProvider> */}
        </AppWrappers>
      </body>
    </html>
  );
}
