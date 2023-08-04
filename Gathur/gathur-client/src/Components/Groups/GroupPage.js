import { useEffect,useState, } from "react"
import { Card,CardBody,CardTitle,CardText} from "reactstrap";
import { Post } from "../Posts/Post";
import { PostByGroupId } from "../../Modules/PostManager";
import { CreatePost } from "../Posts/CreatePost";
import { UserJoinGroup, RemoveUserGroup, GetGroupByName } from "../../Modules/GroupManager";
import {useParams} from "react-router-dom"
import { isNullOrUndefined } from "../../Util";
import {useNavigate} from "react-router-dom";




export const GroupPage =({ user, userGroups,isLoggedIn })=>{
    const {name} = useParams()
    const navigate=useNavigate()

    const [groupPosts, setGroupPosts]=useState([])
    const [addpost, setAddPost]=useState(false)
    const [inGroup, setInGroup]=useState(false)
    const [GroupDetail, setGroupDetail]=useState({})
    const [reload, setReload]=useState(false)

    useEffect(()=>{
        if(!isNullOrUndefined(name)){
            GetGroupByName(name).then(setGroupDetail)
        }
    },[name])

    useEffect(()=>{
        //var groupTemp = GroupDetail
        if(!isNullOrUndefined(GroupDetail.id)){
           PostByGroupId(GroupDetail.id).then(setGroupPosts) 
        }else{
            
        }
        
    },[GroupDetail])

    useEffect(()=>{
        if(GroupDetail!=null){

       
        var xyz = userGroups.find((group)=>group.id==GroupDetail.id)
        if(xyz)
        {
            setInGroup(true)
        }
        else{
            setInGroup(false)
        } 
    }

    },[userGroups])

    //reloads
    // useEffect(()=>{},[inGroup])
    // useEffect(()=>{ if(!isNullOrUndefined(GroupDetail.id)){
    //                 PostByGroupId(GroupDetail.id).then(setGroupPosts) 
    //     }},[addpost])

        // useEffect(()=>{ if(!isNullOrUndefined(GroupDetail.id)){
        //     PostByGroupId(GroupDetail.id).then(setGroupPosts) 
        // }},[])

    // useEffect(()=>{ if(!isNullOrUndefined(GroupDetail.id)){
    //                 PostByGroupId(GroupDetail.id).then(setGroupPosts)
    //     }},[reload])

     useEffect(()=>{},[groupPosts])

        //callback functs
    const createPost = (data) => {
        setAddPost(data)
        if (!isNullOrUndefined(GroupDetail.id)) {
            PostByGroupId(GroupDetail.id).then(setGroupPosts)
        }
    }


        const removePost = (data) => {
            setReload(data)
            if (!isNullOrUndefined(GroupDetail.id)) {
                PostByGroupId(GroupDetail.id).then(setGroupPosts)
            }
        }
    //end of reloads and callbacks

    const JoinGroup =(e)=>{
        e.preventDefault()
        var addGroup = {
            GroupId: GroupDetail.id,
            UserId: user.id
        }
        UserJoinGroup(addGroup)
        setInGroup(true)
    }

    const RemoveGroup=(e)=>{
        e.preventDefault() 
        var removeGroup = {
            GroupId: GroupDetail.id,
            UserId: user.id
        }
        RemoveUserGroup(removeGroup)
        setInGroup(false)
    }


    return(<>
    <div className="container text-center">
        <div className="row">
            <div className="col-9" height="22">
                <Card className="my-2">
                    <CardTitle tag="h2">g/{GroupDetail.name}</CardTitle>
                    <CardText>{GroupDetail.description}</CardText>
                </Card>
            </div>
            <div className="col ">
                <Card className="my-2">
                    <CardBody>
                       {inGroup ? <button className="btn btn-lgbtn btn-outline-success" onClick={(e)=>{RemoveGroup(e)}}> Leave Group</button>
                        :<button className="btn btn-lgbtn btn-outline-success" onClick={(e)=>{JoinGroup(e)}}> Join Group</button>} 
                    </CardBody>
                </Card>
            </div>
        </div>
        <div className="col">{
            isLoggedIn ? <>{ addpost ? <CreatePost GroupId={GroupDetail.id} user={user} CancelPost={createPost} userGroupList={userGroups}/> 
                                    : <button onClick={(e)=>{createPost(true)}}>add a post</button>}</>     
            
            : <button onClick={(e)=>{navigate("/login")}}>add a post</button>
        }
            

        </div>
        </div>
        <div className="container text-left">
    <div className="col">
    <Card >
        {
            groupPosts.map((post)=>(
                <Post key={post.id} post={post} 
                Group={GroupDetail.name} 
                currentUser={user} 
                reloadCallBk={removePost}/>
            ))
        }
    </Card>
    </div>
    </div>
    
    </>)
}