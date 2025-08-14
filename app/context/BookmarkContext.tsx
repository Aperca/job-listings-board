'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getBookmarks, addBookmark, removeBookmark } from '../lib/api/bookmarks';
import { useSession } from 'next-auth/react';

type BookmarkDataItem = {
  eventID: string;
};

type BookmarkContextType = {
  bookmarks: string[];
  toggleBookmark: (eventId: string) => Promise<void>;
  isBookmarked: (eventId: string) => boolean;
  loading: boolean;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // For optional global loading
  const { data: session, status } = useSession();

  useEffect(() => {
    const loadBookmarks = async () => {
      if (status !== 'authenticated' || !session?.accessToken) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getBookmarks(session.accessToken);
        const bookmarkIds: string[] = Array.isArray(data.data) ? data.data.map((item: BookmarkDataItem) => item.eventID) : [];
        setBookmarks(bookmarkIds);
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };
    if (status === 'authenticated') loadBookmarks();
    else setBookmarks([]);
  }, [session, status]);

  const toggleBookmark = async (eventId: string) => {
    if (status !== 'authenticated' || !session?.accessToken) {
      alert('Please sign in to bookmark jobs.');
      return;
    }
    try {
      if (bookmarks.includes(eventId)) {
        await removeBookmark(eventId, session.accessToken);
        setBookmarks(prev => prev.filter(id => id !== eventId));
      } else {
        await addBookmark(eventId, session.accessToken);
        setBookmarks(prev => [...prev, eventId]);
      }
    } catch (error) {
      console.error('Bookmark operation failed:', error);
      alert('Failed to update bookmark. Please try again.');
    }
  };

  const isBookmarked = (eventId: string) => bookmarks.includes(eventId);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, loading }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};