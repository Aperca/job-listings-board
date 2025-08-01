import SideBar from "@/app/components/SideBar"
import { MapPin, CalendarDays, Clock } from "lucide-react"
type JobDetail = {
    id: string;
    title: string;
    orgName: string;
    description: string;
    responsibilities: string;
    requirements: string;
    idealCandidate: string;
    location: string[];
    opType: string;
    startDate: string;
    deadline: string;
    datePosted: string;
    whenAndWhere: string;
    logoUrl: string;
    requiredSkills: string[];
    categories: string[];
}

type Props = {
     params: { id: string } 
}
const getSpecificJob = async (id: string): Promise<JobDetail> => {
    const res = await fetch(`https://akil-backend.onrender.com/opportunities/${id}`)
    if (!res.ok) throw new Error("Failed to fetch job detail")
    const data = await res.json();
    return data.data; y
}

const detailPage = async ({ params }: Props) => {
    const job = await getSpecificJob(params.id)

    const aboutInfo = {
        posted_on: job.datePosted || 'N/A',
        deadline: job.deadline || 'N/A',
        location: job.location?.join(', ') || 'Remote',
        start_date: job.startDate || 'N/A',
        categories: job.categories || [],
        required_skills: job.requiredSkills || [],
      };
    
 // Split responsibilities by newline
    const responsibilitiesList = job.responsibilities.split('\n').filter(item => item.trim() !== '');
      
 
    return (
        <div className="flex flex-col lg:flex-row gap-6 min-h-screen bg-gray-100 p-4 md:p-8">
            {/* Main content */}
            <main className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6">
                {/* Header */}
                <div className="flex gap-4 mb-6 items-start">
                    <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                        <img
                            src={job.logoUrl}
                            alt={`${job.orgName} logo`}
                            className="w-full h-full object-cover"
                
                        />
                    </div>

                    <div className="flex-grow min-w-0">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                        <p className="text-lg text-gray-700 mb-1">{job.orgName}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location.join(', ')}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <h2 className='font-bold text-black text-xl mb-3'>Description</h2>
                    <p className='text-gray-700'>{job.description}</p>
                </div>

                {/* Responsibilities */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-3">Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {responsibilitiesList.map((res, index) => (
                            <li key={index}>{res}</li>
                        ))}
                    </ul>
                </div>

                {/* Requirements */}
                {job.requirements && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-black mb-3">Requirements</h2>
                        <p className="text-gray-700">{job.requirements}</p>
                    </div>
                )}

                {/* Ideal Candidate */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-3">Ideal Candidate</h2>
                    <p className="text-gray-700">{job.idealCandidate}</p>
                </div>

                {/* When & Where */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-3">When & Where</h2>
                    <div className="flex items-start gap-2 text-gray-700">
                        <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p>{job.whenAndWhere}</p>
                    </div>
                </div>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/4">
                <SideBar about={aboutInfo} />
            </aside>
        </div>
    )
}

export default detailPage
