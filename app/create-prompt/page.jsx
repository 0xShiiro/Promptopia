'use client'
import React,{useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
  const {data:session} = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false)
  const [post,setpost] = useState({
    prompt:"",
    tag:"",
  });
  const createPrompt = async(e)=>{
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = {
        prompt:post.prompt,
        userId:session?.user.id,
        tag:post.tag,
      }
      const res = await fetch('/api/prompt/new',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(body),
      })
      if(res.ok){
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }finally{
      setSubmitting(false);
    }
    
   
  }
  return (
    <div>
      <Form
      type="Create"
      post={post}
      setPost={setpost}
      submitting={submitting}
      handleSubmit={createPrompt}
      />
    </div>
  )
}

export default CreatePrompt
