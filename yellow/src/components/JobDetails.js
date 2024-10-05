import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/JobDetails.css';

const JobDetail = () => {
  const { jobId } = useParams();
  console.log('Job ID from URL:', jobId); 

  const [job, setJob] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const back = () => {
    navigate('/jobs'); 
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        console.log('Fetching job details for ID:', jobId); 
        const response = await fetch(`https://testapi.getlokalapp.com/common/jobs/${jobId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch job details'); 
        }

        const data = await response.json();
        console.log('API Response:', data);

        const numericJobId = Number(jobId); 
        console.log('Converted jobId:', numericJobId);

        const jobDetail = data.results.find(job => job.id === numericJobId);
        console.log('Job found:', jobDetail);

        if (jobDetail) {
          setJob(jobDetail); 
        } else {
          throw new Error('Job not found');
        }
      } catch (error) {
        console.error('Error fetching job detail:', error); 
        setError(error.message || 'Error fetching job details');
      } finally {
        setIsLoading(false); 
      }
    };

    fetchJobDetail(); 
  }, [jobId]);
  if (isLoading) {
    return <p className="loading">Loading job details...</p>;
  }
  if (error) {
    return <p className="error">{error}</p>;
  }

  console.log('Job state updated:', job);
  return (
    <div>
      
    <div className="job-detail-container">
      <h1>{job?.title || 'Job title not available'}</h1>
      <p><strong>Company:</strong> {job?.company_name || 'N/A'}</p>
      <p><strong>Location:</strong> {job?.primary_details?.Place || 'N/A'}</p>
      <p><strong>Salary:</strong> {job?.primary_details?.Salary || 'N/A'}</p>
      <p><strong>Job Type:</strong> {job?.primary_details?.Job_Type || 'N/A'}</p>
      <p><strong>Experience:</strong> {job?.primary_details?.Experience || 'N/A'}</p>
      <p><strong>Fees Charged:</strong> {job?.primary_details?.Fees_Charged || 'N/A'}</p>
      <p><strong>Qualification:</strong> {job?.primary_details?.Qualification || 'N/A'}</p>
      <p><strong>Phone:</strong> {job?.whatsapp_no || 'N/A'}</p>
      <p><strong>Phone To Hr:</strong><button>{job?.button_text || 'N/A'}</button></p>
      <button onClick={back}>Back</button> {/* Back button to navigate to job list */}
    </div>
    </div>
  );
};

export default JobDetail;
