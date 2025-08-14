import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import JobBoardContent from "../components/JobBoardContent";
import { getBookmarkedJobs } from "../lib/api/bookmarkedJobs";

export type Job = {
  id: string;
  title: string;
  orgName: string;
  location: string[];
  description: string;
  logoUrl: string;
  opType: string;
  datePosted: string;
};

const BookmarksPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    redirect("/login");
  }

  console.log('Access token in BookmarksPage:', session.accessToken);
  let data = { data: [] as Job[] };
  try {
    data = await getBookmarkedJobs(session.accessToken as string);
  } catch (error) {
    console.error('Error in BookmarksPage:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 py-6">My Bookmarks</h1>
        <hr className="border-t border-gray-200 my-4" />
        {data.data.length === 0 ? (
          <p data-testid="no-bookmarks-message" className="text-gray-500 text-center">
            No bookmarked jobs found.
          </p>
        ) : (
          <JobBoardContent jobs={data.data} />
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;


// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
// import JobBoardContent from "../components/JobBoardContent";

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

// const getBookmarkedJobs = async (accessToken: string): Promise<{ data: Job[] }> => {
//   // Step 1: Fetch bookmark IDs from /bookmarks
//   const bookmarksRes = await fetch("https://akil-backend.onrender.com/bookmarks", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });

//   console.log('Bookmarks fetch status:', bookmarksRes.status);
//   const errorText = await bookmarksRes.text();
//   console.log('Bookmarks error response:', errorText);

//   if (!bookmarksRes.ok) {
//     throw new Error(`Failed to fetch bookmarks: ${errorText}`);
//   }

//   const bookmarksData = JSON.parse(errorText); // Parse manually since we used text()
//   const bookmarkIds = bookmarksData.data?.map((item: any) => item.eventID) || [];

//   // Step 2: Fetch all jobs and filter by bookmarked IDs
//   const jobsRes = await fetch("https://akil-backend.onrender.com/opportunities/search", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });

//   console.log('Jobs fetch status:', jobsRes.status);
//   const jobsErrorText = await jobsRes.text();
//   console.log('Jobs error response:', jobsErrorText);

//   if (!jobsRes.ok) {
//     throw new Error(`Failed to fetch jobs: ${jobsErrorText}`);
//   }

//   const jobsData = JSON.parse(jobsErrorText);
//   const bookmarkedJobs = jobsData.data?.filter((job: Job) => bookmarkIds.includes(job.id)) || [];

//   return { data: bookmarkedJobs };
// };

// const BookmarksPage = async () => {
//   const session = await getServerSession(authOptions);
//   if (!session || !session.accessToken) {
//     redirect("/login");
//   }

//   console.log('Access token in BookmarksPage:', session.accessToken);
//   let data = { data: [] as Job[] };
//   try {
//     data = await getBookmarkedJobs(session.accessToken as string);
//   } catch (error) {
//     console.error('Error in BookmarksPage:', error);
//     // Optionally render an error message in the UI
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 py-6">My Bookmarks</h1>
//         <hr className="border-t border-gray-200 my-4" />
//         {data.data.length === 0 ? (
//           <p className="text-gray-500 text-center">No bookmarked jobs found.</p>
//         ) : (
//           <JobBoardContent jobs={data.data} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookmarksPage;