import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function EditNote(){
    const [selectedNote,setselectedNote]=useState({})
    const [content,setContent]=useState('')
    const {id}=useParams()
    const navigate = useNavigate()
    async function handleSave()
    {
        const newNote = {
            title:selectedNote.title,
            content:content,
            date:selectedNote.date
        }
        console.log("selectedNote")
        console.log(selectedNote)
        const token = localStorage.getItem('tokenStorage')
        await axios.put(`${process.env.BASEURL}/api/notes/updatenote/${selectedNote._id}`,newNote,{
             headers:{Authorization:token}
        }).then(()=>{
             alert("Changes saved....")
        })
    }
    function handleChange(e)
    {
        console.log(e.target.value)
        setContent(e.target.value)
    }
    useEffect(()=>{
        async function func()
        {
          const token = localStorage.getItem('tokenStorage')
          console.log(token)
          console.log("tell the id")
          console.log(id)
          const res = await axios.get(`${process.env.BASEURL}/api/notes/getnoteById/${id}`,{
               headers:{Authorization:token}
          })
          console.log("Get element By id")
          console.log(res.data)
          setselectedNote(res.data)
          setContent(res.data.content)
          console.log(selectedNote)
        }
        func()
    },[])
    function closeNotes()
    {
        
           navigate('/')
        
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={closeNotes}>X</button>
                </div>
                
                <div className="title">{selectedNote.title}</div>
                <textarea rows="20" onChange={handleChange} value={content}>{content}</textarea>
                <div className="footer">
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default EditNote;
