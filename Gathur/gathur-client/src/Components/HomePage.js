import { useEffect,useState } from "react"
import { getRandomPosts } from "../Modules/PostManager"
import { Post } from "./Post"


export const HomeLanding =()=>{

    const [randomPosts, setRandomPosts]=useState([])

    useEffect(()=>{
        getRandomPosts().then(setRandomPosts)
    },[])


    return (<>
        {
            randomPosts.map((post)=>(
            <div padding={20}>   
            <Post post={post}/>
            </div> 
            ))
            
        }

        {/* <p>list of posts</p> */}
    </>)
}