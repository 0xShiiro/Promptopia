'use client'
import React,{useEffect,useState} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data,handleTagClick})=>{
  return(
    <div className="prompt_layout mt-16">
      {data.map((post)=>(
        <PromptCard 
        key={post._id}
        post = {post}
        handleTagClick = {handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setPosts] = useState([])
  const handleSearchChange=()=>{
  }
  useEffect(()=>{
    const fetchposts = async()=>{
      try {
        const res = await fetch('/api/prompt');
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
    <div>
      <section className="feed">
        <form  className="relative w-full flex-center">
          <input 
          type="text" 
          className="search_input w-full peer" 
          value={searchText}
          onChange={handleSearchChange}
          required
          placeholder='Search for a tag or username'
          />
        </form>

        <PromptCardList data={posts} handleTagClick={()=>{}}/>
      </section>
    </div>
  )
}

export default Feed
