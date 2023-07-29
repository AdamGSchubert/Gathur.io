import { getToken } from "./AuthManager";

const postApi ="/api/Post"

//doesnt need auth for random posts on homepage
export const getRandomPosts =()=>{
    return fetch(postApi)
    .then((res)=> {
        if(res.ok){
            return res.json()
        }
        else{
            throw new Error(
                "Random Post fetch did not return status 200"
            )
        }
    })
    
}