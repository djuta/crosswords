import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldUseAuth = process.env.USE_AUTH === 'true';
  const Root = shouldUseAuth ? UserProvider : React.Fragment;
  return (
    <Root>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Root>
  );
}
