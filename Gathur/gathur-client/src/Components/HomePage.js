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
            <Post post={post}/>
            ))
            
        }

        {/* <p>list of posts</p> */}
    </>)
}