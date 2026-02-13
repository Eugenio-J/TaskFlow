// src/pages/Dashboard/DashboardPage.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import { projectService } from '../../services/projectService';
import Button from '../../components/common/Button/Button';
import Spinner from '../../components/common/Spinner/Spinner';
import Greeting from './Greeting';

export default function PlaygroundParent() {
   const [count, setCount] = useState(0);
   const [title, setTitle] = useState('Title');

  useEffect(() => {
    console.log("Count changed:", count);
    setTitle(`Title ${count}`)
  }, [count]); // dependency array

  return (
    <>
      <h1>{count}</h1>
      <button className='mr-5' onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>

      {count % 2 == 0 ? 
      <Greeting name='Even'/> : <Greeting name='Odd'/>
      }
      <Greeting name='Jericho'/>
      <Greeting name='Jericho'/>
      <Greeting name='Jericho'/>
      <Greeting name='Jericho'/>
      <h1>title: {title} - {count}</h1>

    </>
  );
}

