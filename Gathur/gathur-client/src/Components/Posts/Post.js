import { Card,CardBody,CardTitle,CardText,CardSubtitle} from "reactstrap";
import {Link} from 'react-router-dom';


export const Post =({post, Group})=>{

    return(
        <Card
        className="my-2"
        color="secondary"
        outline
        key={post.id}
        >
            <CardBody>
                
                <CardTitle>
                    <Link to={`/group/${Group}/${post.title}`}>{post.title}</Link>
                    </CardTitle>
                    <CardSubtitle>u/{post.author.userName}</CardSubtitle>
                
                <div>
                    <CardText>{post.content}</CardText>
                    </div>
                    <button className="btn"><i className="fa fa-comments"></i></button>
                
                
            </CardBody>


        </Card>

    )
}