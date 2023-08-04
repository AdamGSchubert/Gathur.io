import { useEffect, useState } from "react";
import {Card} from "reactstrap";
import { NewPost } from "../../Modules/PostManager";
import { isNullOrUndefined } from "../../Util";

export const CreatePost =({GroupId, user, CancelPost, userGroupList})=>{
    
    
    const [title, setTitle]=useState("")
    const [content, setContent]=useState("")
    const [author, setAuthorId]=useState("")
    const [meeting, setMeeting]=useState(false)
    const [discussion, setDiscussion]=useState(false) //true
    const [meetingZip, setMeetingZip] = useState("")
    const [meetingAdress, setMeetingAddress] = useState("")


    const [crosspost, setCrossPost]=useState(false)
    const [crossGroup, setcrossGroup]=useState(null)

   useEffect(()=>{
    if(isNullOrUndefined(crossGroup))
    {

    }

   },[crosspost])


    const meetingCheck =()=>{
        setMeeting(!meeting)
    }
    const discCheck =()=>{
        setDiscussion(!discussion)
    }
    const crossPosting =(e)=>{
        // e.preventDefault()
        setCrossPost(!crosspost)
        setcrossGroup(e)
    } 
    

    // const cancelPost =(data)=>{
    //     CancelPost(data);
    // }
    
    const CreatePost =(e)=>{
        //e.preventDefault()
         var type = null;
        if(meeting){
            type=2
        }else if(discussion)
        {type=1}

        var post={
            Title: title,
            GroupId: GroupId,
            Content: content,
            AuthorId: user.id,
            Zipcode: parseInt(meetingZip),
            Address: meetingAdress,
            PostTypeId: type
            }
        if(crosspost==true){
            //first post to main group
            NewPost(post)

            //create a new post2 obj that copies post object
               var post2 = Object.assign({}, post);
               
               post2.GroupId = parseInt(crossGroup)
               //update for second post in crossposted group
            NewPost(post2).then(CancelPost(false))
            
            //end
            
        }else{
           NewPost(post).then(CancelPost(false) )
            
        }

        

    }
//
    return(<><Card>
    <form onSubmit={(e)=>{CreatePost(e)}}> 
        <fieldset>
            <div className="container text-center" >
                <div className="row md-6">
                <div className="col">
                    <p>Please select the post type:</p>
                    <label htmlFor="meetingCheckbox" className="form-label">Meeting:</label>
                    <input className="form-check-input" type="radio" name="postType"  id="meetingCheckbox" onClick={(e)=>{meetingCheck()}} checked={meeting}/>
                    <label htmlFor="discCheckbox" className="form-label">Discussion:</label>
                    <input className="form-check-input" type="radio" name="postType"  id="discCheckbox" onClick={(e)=>{discCheck()}} checked={discussion}/>  
                    
                  
                    
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
                {//add key property to the options 
                    discussion ? (<>
                        <div className="col-3">
                            <label htmlFor="crosspost">Choose a group to Cross Post</label>
                            <select name="crosspost" id="crosspostGroup" onChange={(e)=>{crossPosting(e.target.value)}}>
                                <option value={null} selected>no Crosspost</option>
                            {
                                   //change to select
                            userGroupList.map((group)=>(
                                group.id != GroupId ? 
                                    <>
                                    <option value={group.id}>{group.name}</option>
                                    </>
                                : 
                                    <></>
                                ))
                            }
                            
                        </select>
                        </div>
                        </>)
                    :""
                }
                <div className="col">
                    <label htmlFor="postTitle" className="form-label">Post Title</label>
                    <input type="text" className="form-control" id="postTitle"  placeholder="title"onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="col">
                    <label htmlFor="postContent" className="form-label">Content</label>
                    <textarea className="form-control" id="postContent" rows="3"  onChange={(e)=>{setContent(e.target.value)}}/>
                </div>
                <div className="col">
                    
                    <input type="submit" value="Submit"/>
                    <button onClick={(e)=>{CancelPost(false)}}>Cancel</button>
                </div>
                </div>
            </div>
        </fieldset>
    </form>
    </Card>
    </>
    )
}