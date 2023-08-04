import { useEffect, useState } from "react";


export const DeleteModal =({post})=>{


    const deleteConfirm =(postid)=>{
        console.log(post)
        console.log(postid.id)
        // if(!isNullOrUndefined(post.id)){
        //     //console.log(post)
        //     console.log(post.id)
        //     console.log(key)
        //     DeletePostbyId(post.id)
        //     .then((res) => {
        //         if(res.ok) {
        //             setModal(false)
        //             reloadCallBk(true)
        //             console.log("delete success")
                       
                    
                   
        //         }
        //     })
            
        }

        useEffect(()=>{
            (window).load(function(){        
                (`#${post.id}modal`).modal('show');
                 }) 
            
        },[])


    return (<><div className="modal fade show" id={`${post.id}modal`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
  <h1 className="modal-title fs-5" id="deleteModalLabel">Are you sure you want to delete this post?</h1>
  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
              <p>your post: "{post.title}" will be deleted this cannot be reversed</p>
        </div>
        <div className="modal-footer">
  <button type="button" className="btn btn-danger" data-bs-dismiss="modal" 
  onClick={(e)=>{deleteConfirm(post.id)}}>Delete</button>
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"  >Cancel</button>
  
        </div>
      </div>
    </div>
  </div>
</>)
}

