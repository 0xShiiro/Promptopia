'use client'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React,{useState,useEffect} from 'react'

const MyProfile = () => {
    const {data:session} = useSession();
    const [posts,setPosts] = useState([]);
    const handleEdit = async()=>{}
    const handleDelete = async()=>{}

    useEffect(()=>{
        const fetchposts = async()=>{
            try {
              const res = await fetch(`/api/user/${session?.user.id}/posts`);
              if(res.ok){
                const data = await res.json();
                console.log(data);
                setPosts(data);
              }
            } catch (error) {
              console.error(error);
            }
          }
          fetchposts();
      
    },[])
  return (
    <>
      <Profile 
        name="My Profile"
        desc="Welcome to my personalised profile"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      
      />
    </>
  )
}

export default MyProfile
