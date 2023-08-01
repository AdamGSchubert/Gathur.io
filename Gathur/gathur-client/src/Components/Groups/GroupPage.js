import { useEffect,useState } from "react"
import { Card,CardBody,CardTitle,CardText} from "reactstrap";
import { Post } from "../Posts/Post";
import { PostByGroupId } from "../../Modules/PostManager";
import { CreatePost } from "../Posts/CreatePost";


export const GroupPage =({GroupDetail,user })=>{

    const [groupPosts, setGroupPosts]=useState([])
    const [addpost, setAddPost]=useState(false)



    useEffect(()=>{
        PostByGroupId(GroupDetail.id).then(setGroupPosts)
    },[GroupDetail])

    const createPost =(data)=>{
        setAddPost(data)
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
                        <button className="btn btn-lgbtn btn-outline-success"> Join Group</button>
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