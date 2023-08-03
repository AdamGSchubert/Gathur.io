import { getToken } from "./AuthManager";

const commentApi= "/api/Comment"

export const  GetPostComments =(postId)=>{
   return fetch(`${commentApi}?postId=${postId}`)
    .then((response) =>{
        if(response.ok){
             return response.json()
        }
        else{
            throw new Error(
                `Post Id ${postId} comment fetch encountered an error.`
            )
        }
    })
    
}

export const AddComment=(newComment)=>{
    return getToken().then((token)=>{
        return fetch(commentApi,{
            method: "POST",
            headers:{
                authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(newComment)
        }).then((response) =>{
            if(response.ok){
                console.log("comment successful")
            }
            else {
                throw new Error(
                    "new comment failed"
                );
            }
        })    
    })
}