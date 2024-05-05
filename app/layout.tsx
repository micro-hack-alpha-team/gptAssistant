'use client';
import React, { ReactNode } from 'react';

import "./style.css"
import Banner from '@/components/banner.tsx/banner';
export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className={`font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
          <Banner />
        </div>
      </body>
    </html>
  );
}
