import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../auth"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
    const navigate = useNavigate()
    const { token } = useAuth()
    const [profile , setProfile] = useState({}) ; 

    useEffect(()=>{
        console.log("Inside userEffect")
        if(!token){
            navigate("/login")
        }
        axios.post("http://localhost:8000/profile", {},{ headers : {
            "Authorization" : `Bearer ${token}`
        }}).then((response)=>{
            console.log(response)
            setProfile(response.data.user)
        } ).catch(()=>{
                navigate('/login')
        })
    },[navigate , token])


    return (
        <div>
                        Hi
                        {
                            profile.username
                        }
        </div>
    )
}


