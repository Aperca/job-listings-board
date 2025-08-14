'use client';
import { useSession } from 'next-auth/react';
import { useBookmarks } from '../context/BookmarkContext';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'react-toastify';

export default function BookmarkButton({ jobId }: { jobId: string }) {
  const { status } = useSession();
  const { toggleBookmark, isBookmarked, loading } = useBookmarks();

  const handleClick = async () => {
    if (status !== 'authenticated') {
      toast.error('Please sign in!');
      return;
    }
    try {
      await toggleBookmark(jobId);
    } catch (error) {
      toast.error('Failed to update bookmark. Please try again.');
    }
  };

  if (status === 'loading') return <span>...</span>;

  return (
    <button
      data-testid="bookmark-button"
      onClick={handleClick}
      disabled={loading}
      className="absolute top-2 right-2"
    >
      {isBookmarked(jobId) ? (
        <BookmarkCheck data-testid="bookmark-check-icon" className="w-5 h-5 text-blue-500" />
      ) : (
        <Bookmark data-testid="bookmark-icon" className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}


// 'use client';
// import { useSession } from 'next-auth/react';
// import { useBookmarks } from '../context/BookmarkContext';
// import { Bookmark, BookmarkCheck } from 'lucide-react';
// import { useState } from 'react';

// export default function BookmarkButton({ jobId }: { jobId: string }) {
//   const { data: session, status } = useSession();
//   const { isBookmarked, toggleBookmark } = useBookmarks();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleClick = async () => {
//     if (status !== 'authenticated') {
//       alert('Please sign in!');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await toggleBookmark(jobId);
//     } catch (error) {
//       alert('Failed to update bookmark. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="absolute top-2 right-2 p-1"
//       aria-label={isBookmarked(jobId) ? 'Remove bookmark' : 'Add bookmark'}
//       disabled={isLoading || status !== 'authenticated'}
//     >
//       {status === 'loading' ? (
//         <span className="w-5 h-5 text-gray-400">...</span> // Loading indicator
//       ) : isBookmarked(jobId) ? (
//         <BookmarkCheck className="w-5 h-5 text-blue-500 fill-current" />
//       ) : (
//         <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500" />
//       )}
//     </button>
//   );
// }