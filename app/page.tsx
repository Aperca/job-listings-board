import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import SignOutButton from "./components/SignOutButton";
import JobBoardContent from "./components/JobBoardContent";

type Job = {
  id: string;
  title: string;
  orgName: string;
  location: string[];
  description: string;
  logoUrl: string;
  opType: string;
  datePosted: string;
}

const getJobs = async (): Promise<{ data: Job[] }> => {
  const res = await fetch("https://akil-backend.onrender.com/opportunities/search");
  if(!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}
const Home = async () => {
  const session = await getServerSession(authOptions);
  const data = await getJobs();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <hr className="border-t border-gray-200 my-4" />
        
        {/* Client-side job content */}
        <JobBoardContent jobs={data} />
      </div>
    </div>
  );

  
}

export default Home
