import { useEffect,useState } from "react"
import {Card,CardHeader,ListGroup,ListGroupItem } from "reactstrap"
import {Link} from "react-router-dom"
import { GetUserGroups } from "../../Modules/GroupManager"


export const GroupNav =({myUserGroups})=>{



return (<>
    <button className="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" data-mdb-toggle="offcanvas" aria-controls="offcanvasExample">
    My Groups
    </button>

<div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
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
        myUserGroups.map((group)=>(
            <ListGroupItem key={group.id}>
      <Link to={`group/${group.name}`}>g/{group.name}</Link>
     </ListGroupItem>
        ))   
    }
  </ListGroup>
</Card>
</div>
    </div>
</>
    )
}
