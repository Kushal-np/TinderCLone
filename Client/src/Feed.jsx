import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from './utils/constants';
import { addFeed } from './utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  console.log("Feed component rendered");
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed)

  const getFeed = async() =>{
    if(feed){
      return  ; 
    }
    try{
      const res = await axios.get(BASE_URL + "/user/feed" , {
        withCredentials:true
      });
      dispatch(addFeed(res.data.data));
      console.log("The data is : " , res.data)
    }
    catch(error){
        console.log(error.message)
    }
  }

  useEffect(()=>{
    getFeed();
  },[])
  return (
    <div className="h-auto flex">
      <div data-theme = "retro" className='bg-red-400' >
      <UserCard user={feed}/>
      </div>
    </div>
  )
}

export default Feed