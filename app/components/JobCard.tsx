'use client'
import Link from 'next/link';

type JobProps = {
    id: string;
    title: string;
    orgName: string;
    location: string[];
    description: string;
    logoUrl: string;
    opType: string; // Changed from string[] to string based on sample data
    datePosted: string;
}

const JobCard = ({id, title, orgName, location, description, logoUrl, opType, datePosted}: JobProps) => {
  const imageUrl = logoUrl && logoUrl.trim() !== '' 
    ? logoUrl 
    : '/next.svg';

  // Format date if needed
  const formattedDate = new Date(datePosted).toLocaleDateString();

  return (
    <Link href={`/jobs/${id}`} passHref>
      <div className="border border-gray-200 shadow-md rounded-xl p-4 hover:shadow-lg transition flex gap-4 mb-6 cursor-pointer">
        <img 
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
          src={imageUrl}
          alt={`${orgName} logo`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/next.svg';
          }}
        />
        <div className="flex flex-col flex-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{title}</h2>
          <p className="text-gray-600 text-sm mb-1">{orgName}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>{location.join(', ')}</span>
            <span>•</span>
            <span>{opType}</span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Posted: {formattedDate}</span>
            
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobCard