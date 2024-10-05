import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import JobDetail from './components/JobDetails'; // Import the JobDetail component
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/job/:jobId" element={<JobDetail />} /> {/* Ensure this matches */}
      </Routes>
    </Router>
  );
};

export default App;
