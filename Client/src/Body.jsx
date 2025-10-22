import React from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useEffect } from 'react'
import axios from 'axios'

const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(store => store.user)
    const fetchUser = async() =>{
        try{

            const res = await axios.get(BASE_URL +"/profile/view" , {
                withCredentials:true , 
            });
            dispatch(addUser(res.data))
        }
        catch(error){
            if(error.status === 401){

                navigate("/login")
            }
            console.log(error)
        }
    };

    useEffect(()=>{
        if(!userData){
            fetchUser();
        }
    },[])
  return (
    <div className="min-h-screen flex flex-col">
        <NavBar/>
        <main className="flex-1 p-4">
          <Outlet/>
        </main>
        <Footer />
    </div>
  )
}

export default Body