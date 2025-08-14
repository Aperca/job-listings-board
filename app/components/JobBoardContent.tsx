'use client';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import JobCard from './JobCard';
import SignOutButton from './SignOutButton';

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

interface JobBoardContentProps {
  jobs: Job[];
}

const JobBoardContent = ({ jobs }: JobBoardContentProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Listing Board</h1>
            <p className="text-gray-600 mt-1">Find your dream job today!</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              data-testid="bookmarks-link"
              onClick={() => router.push('/bookmarks')}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition"
            >
              My Bookmarks
            </button>
            <SignOutButton />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Most relevant</option>
                <option>Newest first</option>
                <option>Oldest first</option>
              </select>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-200 my-4" />
        {jobs.length === 0 ? (
          <p data-testid="no-jobs-message" className="text-gray-500 text-center">
            No jobs found. Try adjusting your search!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoardContent;



// 'use client';
// import { useSession } from 'next-auth/react';
// import { redirect, useRouter } from 'next/navigation';
// import JobCard from './JobCard';
// import SignOutButton from './SignOutButton';

// type Job = {
//   id: string;
//   title: string;
//   orgName: string;
//   location: string[];
//   description: string;
//   logoUrl: string;
//   opType: string;
//   datePosted: string;
// };

// interface JobBoardContentProps {
//   jobs: Job[];
// }

// const JobBoardContent = ({ jobs }: JobBoardContentProps) => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   if (!session) {
//     redirect('/login');
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Job Listing Board</h1>
//             <p className="text-gray-600 mt-1">Find your dream job today!</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => router.push('/bookmarks')}
//               className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition"
//             >
//               My Bookmarks
//             </button>
//             <SignOutButton />
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Sort by:</span>
//               <select className="text-sm border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option>Most relevant</option>
//                 <option>Newest first</option>
//                 <option>Oldest first</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         <hr className="border-t border-gray-200 my-4" />
//         {jobs.length === 0 ? (
//           <p className="text-gray-500 text-center">No jobs found. Try adjusting your search!</p>
//         ) : (
//           <div className="grid grid-cols-1 gap-6">
//             {jobs.map((job) => (
//               <JobCard key={job.id} {...job} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobBoardContent;