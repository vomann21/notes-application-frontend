import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Home from "./Home"
function CreateNote()
{
    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate = useNavigate()
    const onSubmit=async(data)=>
    {
        
        const token = localStorage.getItem('tokenStorage')
        if(token)
        {
           try
           {
            const newNote = {
                title:data.title,
                content:data.content,
                date:data.date
            }

            console.log(newNote)
            const res=await axios.post(`${process.env.BASEURL}/api/notes/createnotes`,newNote,{
                headers:{Authorization:token}
            })
            console.log(res)
            navigate('/')
           }
           catch(err)
           {
             console.log(err)
           }
        }
    }
    return(
        <div className="create-note">
           <h2>CREATE NOTE</h2>
           <form onSubmit={handleSubmit(onSubmit)}>
                 <div className='form-field'>
                    <label htmlFor='title'>Title</label>
                    <input className="title" type='text' name='title' placeholder='title' {...register('title',{required:"title is required"})}/>
                 </div>  
                 <p className='error-message'>{errors.title?.message}</p>
                 <div className='form-field'>
                    <label htmlFor='content'>Content</label>
                    <textarea name='content' placeholder='content' rows="10" {...register('content',{})}/>
                 </div>
                 <p className='error-message'>{errors.password?.message}</p>
                 <div className='form-field'>
                    <label htmlFor='date'>Date: </label>
                    <input className="date" type='date' name='date' {...register('date',{required:"title is required"})}/>
                 </div>  
                 <p className='error-message'>{errors.title?.message}</p> 
                 <button type='submit'>Submit</button> 
            </form>
        </div>
    )
}
export default CreateNote