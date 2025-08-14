import { CalendarDays, Clock, MapPin } from 'lucide-react';

type AboutInfo = {
    posted_on: string;
  deadline: string;
  location: string;
  start_date: string;
  categories: string[];
  required_skills: string[];
}
const SideBar = ({about}:{about:AboutInfo}) => {
  return (
     <aside className="w-full space-y-6 p-4 bg-white rounded-lg shadow-md text-gray-900">
        <div className='flex flex-col'>
            {/* About */}
          <div className="space-y-4">
                <h3 className="text-lg text-black font-semibold">About</h3>
                    <div className='flex items-center gap-2'>
                        <CalendarDays className="h-4 w-4 text-gray-500" />
                        <span className='whitespace-nowrap'>Posted on:
                        <br />
                         {about.posted_on}</span>
                    </div>
                    <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Deadline:
                  <br />
 {about.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>Location:  <br />
{about.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                  <span>Start Date:  <br />
{about.start_date}</span>
                </div>
          </div>
          <hr className="border-t border-gray-200 my-4" />
          {/* categories */}
          <div className="space-y-2 mb-4">
                      <h3 className="text-lg font-semibold text-black">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                      {about.categories.map((cat, i) => (
                          <span
                          key={i}
                          className="bg-blue-100 text-blue-800 px-3 py-1 text-xs rounded-full"
                          >
                          {cat}
                          </span>
                      ))}
                      </div>
                  </div>

          {/* required_skills */}
          <div className="space-y-2 mt-4">
                          <h3 className="text-lg font-semibold text-black">Required Skills</h3>
                          <div className="flex gap-2">
                          {about.required_skills.map((skill, i) => (
                              <span
                              key={i}
                              className="bg-green-100 text-green-800 px-3 py-1 text-xs rounded-full  whitespace-nowrap"
                              >
                              {skill}
                              </span>
                          ))}
                          </div>
                      </div>
        </div>
  </aside>
  )
}

export default SideBar
