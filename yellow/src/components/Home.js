import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const navigate=useNavigate();
    const jobs=()=>{
        navigate('/jobs')
    }
    const Book=()=>{
        navigate('/bookmarks')
    }

  return (
    <div className='container'>
        <button onClick={jobs}>Jobs</button>
        <button onClick={Book}>BookMarks</button>
    </div>
  );
};

export default Home;
