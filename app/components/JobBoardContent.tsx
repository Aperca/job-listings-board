import { useSession } from 'next-auth/react';
import JobCard from "./JobCard";
import { redirect } from "next/navigation";


const JobBoardContent = async () => {
   
    const { data: session } = useSession();
  
    if (!session) {
      redirect("/auth/signin");
    }
  
    return (
        <div className="min-h-screen bg-gray-50">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col lg:flex-row justify-between items start lg:items-center py-6 gap-4'>
                  <div>
                    <h1 className='text-3xl font-bold text-gray-900'>Job Board</h1>
                    <p className='text-gray-600 mt-1'>Find your dream job today!</p>
                  </div>
    
                  <div className='flex items-center gap-4'>
                      <p className="text-sm text-black font-medium"> Sort by:</p>
                      <select className='text-sm border border=gray-300 rounded-md py-2 px-4 focus'>
                      <option>Most relevant</option>
                      <option>Newest first</option>
                      <option>Oldest first</option>
                      </select>
                  </div>
                </div>
                <hr className="border-t border-gray-200 my-4" />
    
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {data.data.map((job) => (
                <JobCard 
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  orgName={job.orgName}
                  location={job.location}
                  description={job.description}
                  logoUrl={job.logoUrl}
                  opType={job.opType}
                  datePosted={job.datePosted}
                />
              ))}
            </div>
            </div>
        </div>
      )
  }

export default JobBoardContent
