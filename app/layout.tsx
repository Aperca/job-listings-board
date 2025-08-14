import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { BookmarkProvider } from './context/BookmarkContext';
import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {  return (
    <html lang="en">
      <body>
    <Providers>        <ToastContainer />
{children}</Providers>

      </body>
    </html>
  );
}

// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Job Board',
//   description: 'Find your dream job today!',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }