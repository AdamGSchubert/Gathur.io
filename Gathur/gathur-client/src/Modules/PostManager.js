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


export const PostByGroupId =(groupId)=>{
    return fetch(`${postApi}/${groupId}`)
    .then((res)=> {
        if(res.ok){
            return res.json()
        }
        else{
            throw new Error(
                " Posts by group id fetch did not return status 200"
            )
        }
    })
}

export const NewPost =(newPost)=>{
    return getToken().then((token)=>{
        return fetch(postApi,{
            method: "POST",
            headers:{
                authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(newPost)
        }).then((response) =>{
            if(response.ok){
                console.log("post successful")
            }
            else {
                throw new Error(
                    "new post failed"
                );
            }
        })    
    })
}


export const GetPostbyId=(postId)=>{
    return fetch(`${postApi}/getbyId?id=${postId}`)
    .then((response) =>{
        if(response.ok){
            return response.json() 
        } 
        else{
            throw new Error(
                "get post by Post Id has failed"
            )
        }
    }
  )
    
}
