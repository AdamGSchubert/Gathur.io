import {Card,CardHeader,ListGroup,ListGroupItem } from "reactstrap"
import {Link} from "react-router-dom"

export const GroupNav =()=>{


return (<>
    <button className="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" data-mdb-toggle="offcanvas" aria-controls="offcanvasExample">
    My Groups
    </button>

<div  className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div className="offcanvas-header">
    {/* <h5 className="offcanvas-title" id="offcanvasExampleLabel">Groups</h5> */}
    <button className="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" data-mdb-toggle="offcanvas" aria-controls="offcanvasExample">
    hide
    </button>
    </div>
    <div>
    <Card
  style={{
    width: '18rem'
  }}
>
  <CardHeader>
    My Gathur Groups
  </CardHeader>
  <ListGroup flush>
    {
        //for each item in the my group list
    //     <ListGroupItem>
    //   <Link to="/">An item</Link>
    // </ListGroupItem>
        
    }
    <ListGroupItem>
      <Link to="/">An item</Link>
    </ListGroupItem>
    <ListGroupItem>
      A second item
    </ListGroupItem>
    <ListGroupItem>
      And a third item
    </ListGroupItem>
  </ListGroup>
</Card>
</div>
    </div>
  
  
  
</>
    )
}
