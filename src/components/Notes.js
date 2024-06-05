import Nav from "./notes/Nav"
import CreateNote from "./notes/CreateNote"
import EditNote from "./notes/EditNote"
import Home from "./notes/Home"
import {Route,Routes,Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from "axios"
import { useState,useEffect } from "react"
import Register from "./Register.js"
import Login from "./Login.js"
function Notes({setisLogin})
{
    
    return(
        <div className="notes-page" >
           
            <Nav className="header" setisLogin={setisLogin}></Nav>
               <Routes className='section'>
                   <Route path="/" element={<Home></Home>}></Route>
                   <Route path="/create" element={<CreateNote></CreateNote>}></Route>
                   <Route path="/edit/:id" element={<EditNote></EditNote>}></Route>
               </Routes>
              
        </div>
    )
}
export default Notes