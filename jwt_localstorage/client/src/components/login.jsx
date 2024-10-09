import axios from "axios"
import { useState } from "react"
import { useAuth } from "../auth"
import {useNavigate} from "react-router-dom"



export const Login = () => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const navigate = useNavigate()

   const {setToken} = useAuth()
   const handlesubmit =async (e)=>{
         e.preventDefault()

         try{
                  const response = await axios.post("http://localhost:8000/login",{username , password})
                  setToken(response.data.token) ; 
                  navigate("/profile")
         }catch(e){
             console.log("Error: ", e);
         }
   }
   return (
      <div>
         <h2>Login </h2>
         <form onSubmit={handlesubmit}>
            <input
               type="text"
               value={username}
               onChange={(e) => { setUsername(e.target.value) }}
               placeholder="Enter Username"
            />
            <input
               type="password"
               value={password}
               onChange={(e) => { setPassword(e.target.value) }}
               placeholder="Enter Password "
            />
            <button type="submit">
               Submit
            </button>
         </form>
      </div>
   )
}