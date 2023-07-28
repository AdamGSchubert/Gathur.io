import { Card,CardBody,CardTitle,} from "reactstrap";


export const Post =({post})=>{

    return(
        <Card>
            <CardBody>
                <CardTitle>{post.title}</CardTitle>
                
                
            </CardBody>

        </Card>

    )
}