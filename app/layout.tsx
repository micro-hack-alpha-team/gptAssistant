'use client';
import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import "./style.css"
import Header from '@/components/header/header';
import Banner from '@/components/banner.tsx/banner';
export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <Header />
          {children}
          <Banner />
        </div>
      </body>
    </html>
  );
}
