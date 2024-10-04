import React from 'react';
import { useSwipeable } from 'react-swipeable';

const JobCard = ({ job, onBookmark, onDismiss }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => onDismiss(job),
    onSwipedRight: () => onBookmark(job),
  });

  return (
    <div className="job-card" {...handlers}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company_name}</p>
      <p><strong>Location:</strong> {job.primary_details?.Place || 'N/A'}</p>
      <p><strong>Salary:</strong> {job.primary_details?.Salary || 'N/A'}</p>
      <p><strong>Job Type:</strong> {job.primary_details?.Job_Type || 'N/A'}</p>
      <p><strong>Experience Required:</strong> {job.primary_details?.Experience || 'N/A'}</p>
      <p><strong>Qualification:</strong> {job.primary_details?.Qualification || 'N/A'}</p>
      <div className="job-actions">
        <button onClick={() => onBookmark(job)}>Bookmark</button>
        <button onClick={() => onDismiss(job)}>Dismiss</button>
      </div>
    </div>
  );
};

export default JobCard;
