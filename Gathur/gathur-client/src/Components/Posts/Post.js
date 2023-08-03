import { Card,CardBody,CardTitle,CardText,CardSubtitle} from "reactstrap";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { isNullOrUndefined } from "../../Util";
import {useNavigate} from "react-router-dom";


export const Post =({post, Group})=>{

    const navigate=useNavigate()


    const [timeStamp, setTimeStamp]=useState("")
    const [author, setAuthor]=useState({})

    useEffect(()=>{
        if(post !=null && post!=undefined)
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
                    <button className="btn" onClick={(e)=>{navigate(`/group/${Group}/${encodeURIComponent(post.title)}pid=${post.id}`)}}
                        ><i className="fa fa-comments"></i></button>
                
                
            </CardBody>


        </Card>

    )
}