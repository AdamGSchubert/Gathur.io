import { useEffect,useState } from "react"
import { Card,CardBody,CardTitle,CardText} from "reactstrap";
import { Post } from "../Posts/Post";
import { PostByGroupId } from "../../Modules/PostManager";
import { CreatePost } from "../Posts/CreatePost";
import { UserJoinGroup } from "../../Modules/GroupManager";



export const GroupPage =({GroupDetail,user })=>{

    const [groupPosts, setGroupPosts]=useState([])
    const [addpost, setAddPost]=useState(false)



    useEffect(()=>{
        PostByGroupId(GroupDetail.id).then(setGroupPosts)
    },[GroupDetail])

    const createPost =(data)=>{
        setAddPost(data)

    }

    const JoinGroup =(e)=>{
        e.preventDefault()
        var addGroup = {
            GroupId: GroupDetail.id,
            UserId: user.id
        }
        UserJoinGroup(addGroup)


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
                        <button className="btn btn-lgbtn btn-outline-success" onClick={(e)=>{JoinGroup(e)}}> Join Group</button>
                    </CardBody>
                </Card>
            </div>
        </div>
        <div className="col">
            { addpost ? <CreatePost GroupId={GroupDetail.id} user={user} CancelPost={createPost}/> : <button onClick={(e)=>{createPost(true)}}>add a post</button>}

        </div>
        </div>
        <div className="container text-left">
    <div className="col">
    <Card >
        {
            groupPosts.map((post)=>(
                <Post post={post}/>
            ))
        }
    </Card>
    </div>
    </div>
    
    </>)
}