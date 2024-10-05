import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Jobs.css'
const JobCard = ({ job, onBookmark, onDismiss }) => {
  const navigate = useNavigate(); 

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log('Left swipe detected');
      onDismiss(job);
    },
    onSwipedRight: () => {
      console.log('Right swipe detected');
      onBookmark(job);
    },
    delta: 30, 
  });

  const fulldetails = () => {
    navigate(`/job/${job.id}`); 
  };

  return (
    <div className="job-card" {...handlers} onClick={fulldetails}>
      <h1>{job?.title || 'Job title not available'}</h1>
      <p><strong>Company:</strong> {job?.company_name || 'N/A'}</p>
      <p><strong>Location:</strong> {job?.primary_details?.Place || 'N/A'}</p>
      <p><strong>Salary:</strong> {job?.primary_details?.Salary || 'N/A'}</p>
      <p><strong>Job Type:</strong> {job?.primary_details?.Job_Type || 'N/A'}</p>
      <p><strong>Experience:</strong> {job?.primary_details?.Experience || 'N/A'}</p>
      <p><strong>Fees Charged:</strong> {job?.primary_details?.Fees_Charged || 'N/A'}</p>
      <p><strong>Qualification:</strong> {job?.primary_details?.Qualification || 'N/A'}</p>
      <p><strong>Phone:</strong> {job?.whatsapp_no || 'N/A'}</p>
      
    </div>
  );
};

export default JobCard;
