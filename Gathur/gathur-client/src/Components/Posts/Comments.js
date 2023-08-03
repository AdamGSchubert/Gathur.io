import { useEffect, useState } from "react";
import { Card,CardBody,CardTitle,CardText,CardSubtitle} from "reactstrap";

export const CommentList =({Comments})=>{

    const [timeStamp, setTimeStamp]=useState("")

    

    useEffect(()=>{
        if(Comments !=null && Comments!=undefined)
        {
            var abc=new Date(Comments.submitTime).toLocaleDateString(`en-us`)
            setTimeStamp(abc)
        }
    },[Comments])

    return (
        <><div className="container text-right">
            <div className="col">
            <Card>
            <CardSubtitle tag="h6">u/{Comments.author.userName}:</CardSubtitle>
            <CardBody>
                <CardTitle tag="h5">"{Comments.content }"</CardTitle>
            
                <Card className="text-end my-2">
                <div className="md-3"><p>submitted: {timeStamp}</p></div>
                </Card>
            </CardBody>    
        </Card>
        </div>
        </div>
        
        
        </>
    )
}