import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
function Register(props)
{
    const navigate = useNavigate()
    const [err,setErr] = useState('')
    const {register,handleSubmit,formState:{errors}}=useForm();
    const onSubmit = async(data)=>{
       try{ 
         const {username,email,password}=data 
         const res = await axios.post(`${process.env.BASEURL}/user/register`,{
             username:username,
             email:email,
             password:password
         })
         console.log(res)
         if(res.status == 201)
            navigate('/')
         setErr(res.data.message)
        }
        catch(err)
        {
            console.log(err)
        }
         
    }
    return(
        <div className="Register">
             <h1>Sign Up</h1>
             <form onSubmit={handleSubmit(onSubmit)}>
                 <div className="form-field">
                     <label htmlFor="username">Username</label>
                     <input type="text" name="username" placeholder="Username" {...register('username',{required:"This field is required"})}></input>
                 </div>
                 <p className='error-message'>{errors.username?.message}</p>
                 <div className="form-field">
                     <label htmlFor="email">Email</label>
                     <input type="text" name="email" placeholder="Email" {...register('email',{required:"Email is required"})}></input>
                 </div>
                 <p className='error-message'>{errors.email?.message}</p>
                 <div className="form-field">
                     <label htmlFor="password">Password</label>
                     <input type="password" name="password" placeholder="Password" {...register('password',{required:"Password is required"})}></input>
                 </div>
                 <p className='error-message'>{errors.password?.message}</p>
                 <button type='submit'>Submit</button>

                 <p className={err === "registration successful" ? "success-message":"error-message"}>{err}</p>
                 <p>Already have and account? please <Link onClick={()=>{props.setisRegister(false)}}>login</Link> </p>
             </form>
        </div>
    )
}
export default Register