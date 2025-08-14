'use client';
import { useRouter } from 'next/navigation';
import BookmarkButton from './BookmarkButton';

type Job = {
  id: string;
  title: string;
  orgName: string;
  location: string[];
  description: string;
  logoUrl: string;
  opType: string;
  datePosted: string;
};

export default function JobCard({ id, title, orgName, location, description, logoUrl, opType, datePosted }: Job) {
  const router = useRouter();

  return (
    <div data-testid="job-card" className="relative border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md">
      <BookmarkButton jobId={id} />
      <img
        src={logoUrl || '/next.svg'}
        alt={`${orgName} logo`}
        className="w-12 h-12 mb-4"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{orgName}</p>
      <p className="text-gray-500">{location.join(', ')}</p>
      <p className="text-gray-500">{opType}</p>
      <p className="text-gray-700 mt-2">{description}</p>
      <p className="text-gray-500 mt-2">Posted: {new Date(datePosted).toLocaleDateString()}</p>
      <button
        onClick={() => router.push(`/jobs/${id}`)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        View Details
      </button>
    </div>
  );
}


// 'use client';
// import Link from 'next/link';
// import { useBookmarks } from '../context/BookmarkContext';
// import BookmarkButton from './BookmarkButton';

// type JobProps = {
//     id: string;
//     title: string;
//     orgName: string;
//     location: string[];
//     description: string;
//     logoUrl: string;
//     opType: string;
//     datePosted: string;
// }

// const JobCard = ({ id, title, orgName, location, description, logoUrl, opType, datePosted }: JobProps) => {
//   const imageUrl = logoUrl && logoUrl.trim() !== '' ? logoUrl : '/next.svg';
//   const formattedDate = new Date(datePosted).toLocaleDateString();

//   return (
//     <div className="relative border border-gray-200 shadow-md rounded-xl p-4 hover:shadow-lg transition flex gap-4 mb-6"> {/* Added relative here */}
//       <Link href={`/jobs/${id}`} passHref className="flex gap-4 w-full"> 
//         <img 
//           className="w-16 h-16 rounded-full object-cover border border-gray-200"
//           src={imageUrl}
//           alt={`${orgName} logo`}
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = '/next.svg';
//           }}
//         />
//         <div className="flex flex-col flex-1">
//           <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{title}</h2>
//           <p className="text-gray-600 text-sm mb-1">{orgName}</p>
//           <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
//             <span>{location.join(', ')}</span>
//             <span>•</span>
//             <span>{opType}</span>
//           </div>
//           <p className="text-sm text-gray-700 line-clamp-2 mb-3">{description}</p>
//           <div className="flex justify-between items-center">
//             <span className="text-xs text-gray-400">Posted: {formattedDate}</span>
//           </div>
//         </div>
//       </Link>
//       <BookmarkButton jobId={id} />
//     </div>
//   )
// }

// export default JobCard;