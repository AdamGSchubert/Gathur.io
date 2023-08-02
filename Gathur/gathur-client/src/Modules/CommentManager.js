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