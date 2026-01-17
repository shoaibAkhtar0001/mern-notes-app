import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Notecard from '../components/Notecard';

const Homepage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get('https://mern-notes-app-1-mb9m.onrender.com/api/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="fullpage">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 max-w-6xl mx-auto">
        {notes.map(note => (
          <Notecard key={note._id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
