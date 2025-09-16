import React, { useEffect, useState } from 'react'; // import the hooks
import axios from 'axios'; // import axios to fetch data
import Navbar from '../components/Navbar';
import Notecard from '../components/Notecard';
const Homepage = () => {
  const [notes, setNotes] = useState([]); // create a box to store notes

  // This runs automatically when the page loads
  useEffect(() => {
    axios.get('http://localhost:5001/api/notes') // fetch notes from backend
      .then(res => setNotes(res.data)) // store the notes in the box
      .catch(err => console.error(err)); // log error if fetching fails
  }, []); // empty array means "run only once when page loads"

  return (
    <div className='fullpage'>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 max-w-6xl mx-auto">
        {notes.map(note => (
          <Notecard key={note._id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </div>
  )
}

export default Homepage;
