import { useSession } from 'next-auth/react';

const BASE_URL = 'https://akil-backend.onrender.com';

export const getBookmarks = async (token: string): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/bookmarks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch bookmarks: ${res.statusText}`);
  }
  return await res.json();
};

export const addBookmark = async (eventId: string, token: string): Promise<any> => {
  const res = await fetch(`${BASE_URL}/bookmarks/${eventId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to add bookmark: ${res.statusText}`);
  }
  return await res.json();
};

export const removeBookmark = async (eventId: string, token: string): Promise<any> => {
  const res = await fetch(`${BASE_URL}/bookmarks/${eventId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to remove bookmark: ${res.statusText}`);
  }
  return await res.json();
};