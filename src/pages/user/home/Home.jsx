import React,{useEffect, useState} from 'react'
import "./home.scss"
import LeftBar from '../../../components/user/leftbar/LeftBar'
import Navbar from '../../../components/user/navbar/Navbar'
import RightBar from '../../../components/user/rightBar/RightBar';
import { fetchUserDetails } from "../../../api/UserServices";
import SkeletonLoading from '../../../components/user/Loading/SkeletonLoading';
import {io} from 'socket.io-client'
import { useSelector } from 'react-redux';
import { socketUrl } from '../../../utils/ConstUrls';
const LazyPosts = React.lazy(()=>import('../../../components/user/posts/Posts'))

function Home() {

  const [socket,setSocket]=useState(null)
  const user = useSelector((state)=>state?.user?.user?.userName)
  console.log(user,"userda")

  useEffect(()=>{
    fetchUserDetails();
  },[])

  useEffect(()=>{
    setSocket(io(socketUrl))
  },[])

  useEffect(()=>{
    socket?.emit("newUser",user);
  },[socket,user])

 
  return (
    <div>
      <Navbar socket={socket}/>
      <div style={{ display: "flex" }}>
        <LeftBar/>
        <div style={{ flex: 6 }}>
      <div className="home">
      <React.Suspense fallback={<SkeletonLoading/>}>
      <LazyPosts socket={socket} user={user}/>
        </React.Suspense>  
  
      </div>
        </div>
        <RightBar />
      </div>
    </div>
  )
}

export default Home