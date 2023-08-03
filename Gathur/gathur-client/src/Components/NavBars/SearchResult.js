import { useEffect,useState } from "react"
import {Card,CardHeader,ListGroup,ListGroupItem,CardSubtitle } from "reactstrap"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"

import { isNullOrUndefined } from "../../Util"
import { CreateGroup } from "../Groups/CreateGroup"


export const SearchResult =({runSearch, results, user})=>{
    const navigate = useNavigate()

//const [searchData, setSearchData]=useState([])

// useEffect(()=>{
//     if(!isNullOrUndefined(results))
//     {
//         setSearchData(results)
//     }

// },[results])

const changeSearch =(data)=>{
    runSearch(data,null)
}
const closeSearch =()=>{
    runSearch(false,null)
    
}


return (<><div className="right">
    <button className="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrollingSearch" data-mdb-toggle="offcanvas" aria-controls="offcanvasExample">
    search Results
    </button>
    </div>

    <div className="offcanvas offcanvas-end show" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrollingSearch" aria-labelledby="offcanvasScrollingLabel">
  <div className="offcanvas-header">
    
    <button className="btn btn-secondary" type="button" 
    data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrollingSearch" 
    data-mdb-toggle="offcanvas" aria-controls="offcanvasExample"
    onClick={(e)=>{closeSearch()}}>
    close
    </button>
    </div>
    <div>
    <Card
  style={{
    width: '18rem'
  }}
>
  <CardHeader>
   search Results:
  </CardHeader>{

    results ?
    <ListGroup flush>
    { 
            results.map((group)=>(
            <ListGroupItem key={group.id}>
      <Link to={`group/${group.name}`}>g/{group.name}</Link>
     </ListGroupItem>
        ))   
    }
  </ListGroup>
  : <>
        <CardSubtitle>no groups found: </CardSubtitle>
        <CardSubtitle>   Like to Create the Group?</CardSubtitle>
        <CreateGroup currentUser={user} searchCallBk={changeSearch}/></>
   }
  
</Card>
</div>
    </div>
</>
    )
}