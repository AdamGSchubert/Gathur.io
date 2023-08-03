import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {   Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,} from "reactstrap";
    import { Link  } from "react-router-dom"
import { logout } from "../../Modules/AuthManager";
import { SearchGroups } from "../../Modules/GroupManager";
import { isNullOrUndefined } from "../../Util";


export const TopNavBar =( {isLoggedIn, user, runSearch} )=>{
  const navigate = useNavigate()

     const [searchResults, setSearchResults]=useState([])
    const [searchTerm, setSearchTerm]=useState(null)

  // const search =(searchTerm)=>{
  //   //e.preventDefault
  //   SearchGroups(searchTerm).then(setSearchResults)
    


  // }

  useEffect(()=>{
    if(!isNullOrUndefined(searchTerm))
    {
      
      SearchGroups(searchTerm).then(setSearchResults)

    }
  },[searchTerm])

  const getUserImage =()=>{
    if(user){
      if (user.avatarImgUrl){
        return user.avatarImgUrl;
      }
    }
    return "/Images/abstract-user-flat-4.svg";

  }
  const search =(e)=>{
    e.preventDefault()
      runSearch(true,searchResults)
  }
   
return ( <nav className="navbar navbar-expand-lg bg-body-tertiary  " data-bs-theme="dark">
<div className="container-fluid">
  <a className="navbar-brand" href="/">Gathur</a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
    </ul>
    <form className="d-flex" role="search" onSubmit={(e)=>search(e)}>
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>(setSearchTerm(e.target.value))}/>
      <button className="btn btn-outline-success" type="submit" >Search</button>
    </form>
     
    {/* <button type="button" class="btn btn-danger"onClick={(e)=>(topLogout(e))}>Logout</button> */}
        {isLoggedIn==true ? (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* //<!-- Avatar --> */}
          <Link to="/profile">
            <img src={getUserImage()} className="rounded-circle" 
            height="22" width="22" alt="logged in avatar" loading="lazy"  />
          </Link>
          {/* <ul className="dropdown-menu">
          <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
            {/* <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li> 
          </ul> */}
          </nav>
        </> 
        
        )
        : 
        <><nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* //<!-- Avatar --> */}
          <Link to="/login">
            <img src="/Images/abstract-user-flat-4.svg" alt="logged out avatar" className="rounded-circle" width={50}/>
          </Link>
          <ul className="dropdown-menu">
          <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
            {/* <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li> */}
          </ul>
          </nav>
        
        
        
        </>

}
        
    
    

</div>
</div>
</nav>
/* <div> */
    /* <Navbar >
      <NavbarBrand href="/">Gathur</NavbarBrand>
      <NavLink href="/components/">Components</NavLink>
        <Nav>
          <NavItem>   to=("/Profile") : to=("/login")}
            
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
          <Nav>
            <NavItem>
            <NavbarText>Simple Text</NavbarText>
            </NavItem>
        </Nav>
      </Nav>
    </Navbar>
  </div> */
  
  )



}