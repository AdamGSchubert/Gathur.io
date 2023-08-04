import { Card,CardBody,CardTitle,CardText,CardSubtitle} from "reactstrap";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { isNullOrUndefined } from "../../Util";
import {useNavigate} from "react-router-dom";
import {BsFillTrashFill} from "react-icons/bs";
import {FaComments} from "react-icons/fa";
 import {AiFillEdit} from "react-icons/ai"
import { DeletePostbyId } from "../../Modules/PostManager";
import { CreatePost } from "./CreatePost";
import { EditPost } from "./EditPost";


export const Post =({post, Group, currentUser, reloadCallBk })=>{

    const navigate=useNavigate()


    const [timeStamp, setTimeStamp]=useState("")
    const [author, setAuthor]=useState({})
    const [userAuthor, setUserAuthor]=useState(false)
    const [modal, setModal]=useState(false)
    const [update, setUpdate]=useState(false)

    useEffect(()=>{
        if(!isNullOrUndefined(post))
        {
            var abc=new Date(post.submitTime).toLocaleDateString(`en-us`)
            setTimeStamp(abc)
        }
    },[post])
    useEffect(()=>{
        // if(post.author!=null && post.author!=undefined)
        if(!isNullOrUndefined(post.author)
            && 
            !isNullOrUndefined(post.author.userName))
        {
           
             setAuthor(post.author)
            
           
        }
    },[post])

    useEffect(()=>{
        if(!isNullOrUndefined(currentUser) && !isNullOrUndefined(post.author.id))
        {
            if(currentUser.id ==post.author.id){
                setUserAuthor(true)
                }
                else{
                    setUserAuthor(false)
                }
        }
            

    },[currentUser])

    useEffect(()=>{},[modal])

    const deleteConfirm =(postid)=>{
        console.log(post)
        console.log(postid.id)
        if(!isNullOrUndefined(post.id)){
            //console.log(post)
            console.log(post.id)
            //console.log(key)
            DeletePostbyId(post.id)
            .then((res) => {
                if(res.ok) {
                    setModal(false)
                    reloadCallBk(true)
                    console.log("delete success")
                       
                    
                   
                }
            })
            
        }
        
    }

    

    return(
        <Card
        className="my-2"
        color="secondary"
        outline
        key={post.id}
        >
            <CardBody>
                
                <CardTitle>
                    <Link to={`/group/${Group}/${encodeURIComponent(post.title)}pid=${post.id}`}>{post.title}</Link>
                    </CardTitle>
                   {
                    
                        <CardSubtitle>  u/{author.userName} </CardSubtitle>

                    }
                
                <div>
                    <CardText>{post.content}</CardText>
                    </div>
                    <div className="clearfix"></div>
                    <div className="md-3"><p>submitted: {timeStamp}</p></div>
                    <div>
                    <button className="btn" onClick={(e)=>{navigate(`/group/${Group}/${encodeURIComponent(post.title)}pid=${post.id}`)}}
                        ><FaComments/></button>  

                                        
                        
                         {
                        userAuthor ?
                            <> <button type="button" className="btn " data-bs-toggle={modal ? "modal": "modal" } 
                            data-bs-target={`#post${post.id}`} onClick={(e)=>setModal(true)}>
                            <BsFillTrashFill/></button>
                            {//update post button
                            }
                             
                              <Link to={`/group/${Group}/${encodeURIComponent(post.title)}pid=${post.id}/edit`}>

                                <button type="button" className="btn" ><AiFillEdit/></button></Link>
                                 
                            
                            <div className="modal fade" id={`post${post.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <button type="button" className="btn btn-danger" data-bs-dismiss={modal ? "modal": "modal" } 
                                onClick={(e)=>{deleteConfirm(post)}}>Delete</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss={modal ? "modal": "modal" } 
                                onClick={(e)=>setModal(false)}>Cancel</button>
                                
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            
                            
                            
                            
                            </>
                        : ""
                        } 
                </div>
                
            </CardBody>


        </Card>

    )
}