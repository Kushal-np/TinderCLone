import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import axios from 'axios'

const Body = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      })
      dispatch(addUser(res.data))
    } catch (error) {
      if (error.status === 401) {
        navigate("/login")
      }
      console.log(error)
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Darker Background Gradient (10% darker) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-100 via-pink-300 to-pink-800"></div>

      {/* Subtle animated glow spots (slightly darker and less opacity) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-pulse delay-1000"></div>

      <NavBar />
      <main className="flex-1 p-4 relative z-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Body
