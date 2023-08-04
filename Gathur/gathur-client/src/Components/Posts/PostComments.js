import { useEffect, useState } from "react";
import { GetPostComments } from "../../Modules/CommentManager";
import {useParams} from "react-router-dom"
import { CommentList } from "./Comments";
import { GetPostbyId } from "../../Modules/PostManager";
import { Post } from "./Post";
import { GetGroupById } from "../../Modules/GroupManager";
import { isNullOrUndefined } from "../../Util";
import { CreateComment } from "./CreateComment";

export const PostWithCommentList =({User})=>{
    const {postTitleId}=useParams()
    const {name} =useParams
    
    
    const [comments, setComments]=useState([])
    const [postId, setPostId]=useState(null)
    const [post, setPost]=useState({})
    const [group, setGroup] =useState({})

    const [addComment, setAddComment]=useState(false)
    
    
    useEffect(()=>{
        if(postTitleId !=null && postTitleId!= undefined)
        {   var [title,id] = postTitleId.split("pid=")
        //console.log(postTitleId);
            if(!isNullOrUndefined(title) && !isNullOrUndefined(id))
            {
                setPostId(id)
                GetPostComments(id).then(setComments)
            }
            else{
                console.log(
                    "no id or title"
                )
            }
        }
    },[postTitleId])

    useEffect(()=>{
        if(!isNullOrUndefined(postId))
        {
            GetPostbyId(postId).then(setPost)
        }
        else{
            
        }
    },[postId])


    const createComment =(data)=>{
        // data.preventDefault()
        setAddComment(data)
        
    }
   
    

useEffect(()=>{
    // console.log(post)
    if(!isNullOrUndefined(post) && 
        !isNullOrUndefined(post.group) && 
        !isNullOrUndefined(post.group.id))
    {
        var groupid= post.group.id
        console.log(groupid)
        //GetGroupById(groupid).then(setGroup)
    }
    },[post])

    //reloads
    useEffect(()=>{
        if(!isNullOrUndefined(postId))
        {
            GetPostComments(postId).then(setComments) 
        }
    },[addComment])

    return(
        <> <div className="container text-left">
        <div className="col">
            <Post post={post} Group={group}/>
            
            <div className="col">
            { addComment ?  <CreateComment PostId={postId} user={User}  cancelComment={createComment}/>
            : <button onClick={(e)=>{createComment(true)}}>add comment</button>}
            

        </div>
            {
                comments.map((comment)=>(
                 <CommentList key={comment.id} Comments={comment}/>   
                ))
            }</div>
            </div>
            

            
        </>


    )
}