import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard'; // Import the JobCard component
import '../styles/Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(
    JSON.parse(localStorage.getItem('bookmarkedJobs')) || []
  );
  const [dismissedJobs, setDismissedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      if (response.data && response.data.results) {
        const newJobs = response.data.results.filter(job => !dismissedJobs.includes(job.id));
        setJobs((prevJobs) => [...prevJobs, ...newJobs]);
      } else {
        console.error('Jobs data is missing in the API response');
      }
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
    setLoading(false);
  };

  const handleBookmark = (job) => {
    setBookmarkedJobs((prev) => [...prev, job]);
    localStorage.setItem('bookmarkedJobs', JSON.stringify([...bookmarkedJobs, job]));
  };

  const handleDismiss = (job) => {
    setDismissedJobs((prev) => [...prev, job.id]);
    setJobs((prevJobs) => prevJobs.filter(j => j.id !== job.id));
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight || loading
    ) {
      return;
    }
    // Only increment the page if there are more jobs to fetch
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="job-list-container">
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            onBookmark={handleBookmark}
            onDismiss={handleDismiss}
          />
        ))
      ) : (
        <p>No more jobs to display.</p>
      )}
      {loading && <p>Loading more jobs...</p>}
    </div>
  );
};

export default Jobs;
