import {Link} from 'react-router-dom'
import '../../index.css'
function Nav({setisLogin})
{
    const logOutFunc= ()=>{
        localStorage.clear()
        setisLogin(false)
    } 
    return(
        <header>
           <h1>Notes</h1>
           <ul className="links">
                <li className='link'><Link to='/'>Home</Link></li>
                <li className='link'><Link to='/create'>CreateNote</Link></li>
                <li className='link'><Link to='/' onClick={logOutFunc}>Logout</Link></li>
           </ul>
        </header>
    )
}
export default Nav