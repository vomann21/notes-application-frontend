import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {Router,Route,Link, Navigate, useNavigate} from 'react-router-dom'
import Register from './Register.js'
import '../App.css'
function Login(props)
{
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [err,setErr] = useState('')
    const navigate = useNavigate()
    const onSubmit= async(data)=>{
        try
        {
            setErr("")
            const {email,password}=data;
            const res = await axios.post('${process.env.BASEURL}/user/login',{
                 email:email,
                 password:password
            })
            localStorage.setItem('tokenStorage',res.data.token)
            if(res.data.token)
            {
               props.setisLogin(true)
            }
            setErr(res.data.message)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    return(
        <div className="login">
             <h1>Login</h1>
             <form onSubmit={handleSubmit(onSubmit)}>
                 <div className='form-field'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' placeholder='Email' {...register('email',{required:"Email is required"})}/>
                 </div>  
                 <p className='error-message'>{errors.email?.message}</p>
                 <div className='form-field'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' placeholder='Password' {...register('password',{required:"Password is required"})}/>
                 </div>
                 <p className='error-message'>{errors.password?.message}</p> 
                 <button type='submit'>Login</button> 
                 <p className='error-message'>{err}</p>
                 <p>Don't have an account? <Link style={{color:"blue"}} onClick={()=>{ return props.setisRegister(true)}}>Register</Link></p>
             </form>
        </div>
    )
}
export default Login