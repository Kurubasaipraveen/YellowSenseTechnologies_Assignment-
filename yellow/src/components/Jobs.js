import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const data = await response.json();

      if (Array.isArray(data.results)) {
        setJobs(prevJobs => [...prevJobs, ...data.results]);
        setHasMore(data.results.length > 0);
      } else {
        throw new Error('Jobs data is not in the expected format');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Error fetching jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5 && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  const handleJobClick = (id) => {
    navigate(`/job/${id}`);
  };
  const bookmark=()=>{
    navigate('./bookmarks')
  }

  const handleBookmarkClick = (job, e) => {
    e.stopPropagation();
    const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    
    const isBookmarked = bookmarkedJobs.some(b => b.id === job.id);
    
    if (isBookmarked) {
      alert('Job already bookmarked!');
      return;
    }
    
    bookmarkedJobs.push(job);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
    
    alert('Job bookmarked!');
  };

  return (
    <div className="jobs-container">
      <button onClick={bookmark}>BookMarks Page</button>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
            <h2>{job.title}</h2>
            <p><strong>Location:</strong> {job.primary_details?.Place || 'N/A'}</p>
            <p><strong>Salary:</strong> {job.primary_details?.Salary || 'N/A'}</p>
            <p><strong>Phone:</strong> {job.whatsapp_no || 'N/A'}</p>
            <p><strong>Company:</strong> {job.company_name || 'N/A'}</p>
            
            <button onClick={(e) => handleBookmarkClick(job, e)}>
              Bookmark
            </button>
          </div>
        ))
      ) : (
        <p></p>
      )}
      {isLoading && <p>Loading more jobs...</p>}
      {error && <p>{error}</p>}
      {!hasMore && !isLoading && <p>No more jobs to load.</p>}
    </div>
  );
};

export default Jobs;
