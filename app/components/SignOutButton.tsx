'use client';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/login' });
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Failed to sign out. Please try again.');
      window.location.href = '/login';
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      Sign Out
    </button>
  );
}
