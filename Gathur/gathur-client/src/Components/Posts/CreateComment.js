import { useEffect, useState } from "react";
import {Card} from "reactstrap";
import { AddComment } from "../../Modules/CommentManager";

export const CreateComment =({PostId, user, cancelComment })=>{
    
    
    
    const [content, setContent]=useState("")
    const [author, setAuthorId]=useState("")
   
   


    // const [newPost, setNewPost]=useState({})

   

   

    const cancelAddComment =(data)=>{
        cancelComment(data);
    }
    
    const CreateComment =(e)=>{
        e.preventDefault()
         
      

        var newComment={
            PostId: PostId,
            Content: content,
            AuthorId: user.id,
           
            }
        

        AddComment(newComment);
        cancelAddComment(false)

    }
//
    return(<><Card>
    <form onSubmit={(e)=>{CreateComment(e)}}> 
        <fieldset>
            <div className="container text-center" >
                <div className="row md-6">                   
                <div className="col">
                    <label htmlFor="commentContent" className="form-label">Comment:</label>
                    <textarea className="form-control" id="commentContent" rows="3" onChange={(e)=>{setContent(e.target.value)}}/>
                </div>
                <div className="col">
                    
                    <input type="submit" value="Submit"/>
                    <button onClick={(e)=>{cancelAddComment(false)}}>Cancel</button>
                </div>
                </div>
            </div>
        </fieldset>
    </form>
    </Card>
    </>
    )
}