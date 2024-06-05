import { useState, useEffect } from 'react';
import { Routes,Route,Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'timeago.js';
import EditNote from './EditNote';


function Home() {
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');
    const [id,setId]= useState(null)
    const [openModel, setOpenModel] = useState(false);

    const getNotes = async (token) => {
        console.log("Fetching notes");
        const res = await axios.get(`${process.env.BASEURL}/api/notes/getnotes`, {
            headers: { Authorization: token }
        });
        setNotes(res.data);
    };

    useEffect(() => {
        const token = localStorage.getItem('tokenStorage');
        if (token) {
            setToken(token);
            getNotes(token);
        }
    }, []);

    const deleteNote = async (id) => {
        const res = await axios.delete(`${process.env.BASEURL}/api/notes/deletenote/${id}`, {
            headers: { Authorization: token }
        });
        getNotes(token);
    };

    const readEdit = async(note) => {
        setOpenModel(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // ensures 2-digit day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // ensures 2-digit month
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <div className="note-wrapper">
            {notes.map((note) => (
                <div className="card" key={note._id}>
                    <h4 title={note.title}>{note.title}</h4>
                    <div className="text-wrapper">
                        <textarea rows={8} readOnly>{note.content}</textarea>
                    </div>
                    <div className="card-footer">
                        <p className="date">{formatDate(note.date)}</p>
                        <button onClick={() => setId(note._id)}><Link to={`edit/${note._id}`}>Read and Edit</Link></button>
                    </div>
                    <button className="close" onClick={() => deleteNote(note._id)}>X</button>
                </div>
            ))}
            
                <Routes>
                    <Route path='/edit/:id' element={<EditNote id={id}></EditNote>}></Route>
                </Routes>
            
        </div>
    );
}

export default Home;
