'use client';
import React, { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

// import dynamic from 'next/dynamic';

// const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
//   ssr: false,
// });

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    // <NoSSR>
    <ChakraProvider>{children}</ChakraProvider>
    // </NoSSR>
  );
}
