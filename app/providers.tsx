'use client';
import { BookmarkProvider } from './context/BookmarkContext';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return  (
    <SessionProvider>
      <BookmarkProvider>
        {children}
      </BookmarkProvider>
  </SessionProvider>
)
}