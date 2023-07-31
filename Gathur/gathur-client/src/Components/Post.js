import { Card,CardBody,CardTitle,CardText} from "reactstrap";
import Link from 'react-router-dom';


export const Post =({post})=>{

    return(
        <Card
        className="my-2"
        color="secondary"
        outline
        >
            <CardBody>
                <CardTitle>{post.title}</CardTitle>
                <div>
                    <CardText>{post.content}</CardText>
                    </div>
                
                
            </CardBody>

        </Card>

    )
}