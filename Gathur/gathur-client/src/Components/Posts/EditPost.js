import { useEffect, useState, } from "react";
import {Card} from "reactstrap";
import { isNullOrUndefined } from "../../Util";
import {useNavigate,useParams} from "react-router-dom";
import { GetPostbyId, updatePost } from "../../Modules/PostManager";


export const EditPost =()=>{
    const navigate=useNavigate()
    //const {window.location(path)}=useParams()

    const [UpdatePost, setUpdatePost]=useState({})
    
    const [postType, setPostType]=useState()
    const [title, setTitle]=useState()
    const [content, setContent]=useState()
    const [address,setAddress ]=useState([])
    const [zipcode, setZipcode]=useState([])

    

    useEffect(()=>{
        if(!isNullOrUndefined(UpdatePost)
        &&    !isNullOrUndefined(UpdatePost.title)
        && !isNullOrUndefined(UpdatePost.content)
        && !isNullOrUndefined(UpdatePost.postType.id)
         ){
            setTitle(UpdatePost.title)
            setContent(UpdatePost.content)
            setPostType(UpdatePost.postType.id)
            setAddress(UpdatePost.address)
            setZipcode(UpdatePost.zipcode)
         }

    },[UpdatePost])

    useEffect(()=>{
        if(window.location.pathname){
            var pidPath = window.location.pathname.replace("/edit", "")
            var pid = pidPath.substring(pidPath.indexOf("pid=") + 4);
            GetPostbyId(pid).then(post => setUpdatePost(post))
        }

    },[])

    const saveEdits =(e)=>{ 
        var correctedPost={
            Id: UpdatePost.id,
            Title: title,
            Content: content,
            Zipcode: null,
            Address: null,
            PostTypeId: postType,
            AuthorId: UpdatePost.author.id,
            GroupId: UpdatePost.group.id
        }
        if(postType==2){
          correctedPost.Zipcode =parseInt(zipcode)
          correctedPost.Address= address

          updatePost(correctedPost)
        }

        console.log(updatePost)
        updatePost(correctedPost).then(navigate('/'))

    }
    const cancelUpdate =()=>{
        navigate("/")
    }

   return(<Card>
    <form onSubmit={(e)=>{saveEdits(e)}}> 
        <fieldset>
            <div className="container text-center" >
                <div className="row md-6">
                <div className="col">
                    <p>Please select the post type:</p>
                    <label htmlFor="meetingCheckbox" className="form-label">Meeting:</label>
                    <input className="form-check-input" type="radio" name="postType"  id="meetingCheckbox" onClick={(e)=>{}} checked={postType==2 ? true:false }/>
                    <label htmlFor="discCheckbox" className="form-label">Discussion:</label>
                    <input className="form-check-input" type="radio" name="postType"  id="discCheckbox" onClick={(e)=>{}} checked={postType==1 ? true:false }/>  
                    
                  
                    
                </div>
                {
                    postType==2 ? <>
                        <div className="col">
                    <label htmlFor="meetingZip" className="form-label">Meeting zipcode</label>
                    <input type="zipcode" 
                    className="form-control" 
                    id="meetingZip" 
                    placeholder="14738"
                    value={zipcode}
                    onChange={(e)=>{setZipcode(e.target.value)}}/>
                    <label 
                    htmlFor="meetingAddress" className="form-label">Address</label>
                    <input type="address"  
                    className="form-control" 
                    id="meetingAddress" 
                    value={address}
                    placeholder="750 Beech Rd.
                    Shepherdsville, KY 40165 "
                    onChange={(e)=>{setAddress(e.target.value)}}/>
                </div>
                    </>
                    : ""
                }
               
                <div className="col">
                    <label htmlFor="postTitle" className="form-label">Post Title</label>
                    <input type="text" className="form-control" id="postTitle" value={title} placeholder="title"onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="col">
                    <label htmlFor="postContent" className="form-label">Content</label>
                    <textarea className="form-control" id="postContent" rows="3" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
                </div>
                <div className="col">
                    
                    <input type="submit" value="Submit"/>
                    <button onClick={(e)=>{cancelUpdate()}}>Cancel</button>
                </div>
                </div>
            </div>
        </fieldset>
    </form>
    </Card>)
}