export const getBookmarkedJobs = async (accessToken: string): Promise<{ data: Job[] }> => {
    const bookmarksRes = await fetch("https://akil-backend.onrender.com/bookmarks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  
    console.log('Bookmarks fetch status:', bookmarksRes.status);
    const errorText = await bookmarksRes.text();
    console.log('Bookmarks error response:', errorText);
  
    if (!bookmarksRes.ok) {
      throw new Error(`Failed to fetch bookmarks: ${errorText}`);
    }
  
    const bookmarksData = JSON.parse(errorText);
    const bookmarkIds = bookmarksData.data?.map((item: any) => item.eventID) || [];
  
    const jobsRes = await fetch("https://akil-backend.onrender.com/opportunities/search", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  
    console.log('Jobs fetch status:', jobsRes.status);
    const jobsErrorText = await jobsRes.text();
    console.log('Jobs error response:', jobsErrorText);
  
    if (!jobsRes.ok) {
      throw new Error(`Failed to fetch jobs: ${jobsErrorText}`);
    }
  
    const jobsData = JSON.parse(jobsErrorText);
    const bookmarkedJobs = jobsData.data?.filter((job: Job) => bookmarkIds.includes(job.id)) || [];
  
    return { data: bookmarkedJobs };
  };