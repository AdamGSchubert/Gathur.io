import { useEffect, useState } from "react";
import {Card} from "reactstrap";
import { NewPost } from "../../Modules/PostManager";

export const CreatePost =({GroupId, user, CancelPost })=>{
    
    
    const [title, setTitle]=useState("")
    const [content, setContent]=useState("")
    const [author, setAuthorId]=useState("")
    const [meeting, setMeeting]=useState(false)
    const [meetingZip, setMeetingZip] = useState("")
    const [meetingAdress, setMeetingAddress] = useState("")


    // const [newPost, setNewPost]=useState({})

   

    const meetingCheck =()=>{
        setMeeting(!meeting)
    }

    const cancelPost =(data)=>{
        CancelPost(data);
    }
    
    const CreatePost =(e)=>{
        e.preventDefault()
         var type = null;
        if(meeting){
            type=2
        }else{type=1}

        var post={
            Title: title,
            GroupId: GroupId,
            Content: content,
            AuthorId: user.id,
            MeetingZip: meetingZip,
            Address: meetingAdress,
            PostTypeId: type
            }
        

        NewPost(post);
        CancelPost(false)

    }
//
    return(<><Card>
    <form onSubmit={(e)=>{CreatePost(e)}}> 
        <fieldset>
            <div className="container text-center" >
                <div className="row md-6">
                <div className="col">
                    <label htmlFor="meetingCheckbox" className="form-label">Meeting?</label>
                    <input className="form-check-input" type="checkbox"  id="meetingCheckbox" onChange={(e)=>{meetingCheck()}} checked={meeting}/>
                    {/* {meeting ?  <input className="form-check-input" type="checkbox"  id="meetingCheckbox" onChange={(e)=>{meetingCheck(e)}} checked/> : 
                    <input className="form-check-input" type="checkbox"  id="meetingCheckbox" onChange={(e)=>{meetingCheck(e)}}/>} 
                   */}
                    
                </div>
                {
                    meeting ? <>
                        <div className="col">
                    <label htmlFor="meetingZip" className="form-label">Meeting zipcode</label>
                    <input type="zipcode" 
                    className="form-control" 
                    id="meetingZip" 
                    placeholder="14738"
                    onChange={(e)=>{setMeetingZip(e.target.value)}}/>
                    <label 
                    htmlFor="meetingAddress" className="form-label">Address</label>
                    <input type="address"  
                    className="form-control" 
                    id="meetingAddress" 
                    placeholder="750 Beech Rd.
                    Shepherdsville, KY 40165 "
                    onChange={(e)=>{setMeetingAddress(e.target.value)}}/>
                </div>
                    </>
                    : ""
                }
                <div className="col">
                    <label htmlFor="postTitle" className="form-label">Post Title</label>
                    <input type="text" className="form-control" id="postTitle" placeholder="title"onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="col">
                    <label htmlFor="postContent" className="form-label">Content</label>
                    <textarea className="form-control" id="postContent" rows="3" onChange={(e)=>{setContent(e.target.value)}}/>
                </div>
                <div className="col">
                    
                    <input type="submit" value="Submit"/>
                    <button onClick={(e)=>{cancelPost(false)}}>Cancel</button>
                </div>
                </div>
            </div>
        </fieldset>
    </form>
    </Card>
    </>
    )
}