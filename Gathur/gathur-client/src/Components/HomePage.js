import { useEffect,useState } from "react"
import { getRandomPosts } from "../Modules/PostManager"
import { Post } from "./Posts/Post"


export const HomeLanding =()=>{

    const [randomPosts, setRandomPosts]=useState([])

    useEffect(()=>{
        getRandomPosts().then(setRandomPosts)
    },[])


    return (<>
        {
            randomPosts.map((post)=>(
            <div padding={20}>   
            <Post key={post.Id} post={post}/>
            </div> 
            ))
            
        }

        {/* <p>list of posts</p> */}
    </>)
}