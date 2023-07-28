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


export const TopNavBar =( )=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

  
   
return ( <Nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
     
        
      
      <li className="nav-item">
        <a className="nav-link disabled">Disabled</a>
      </li>
    </ul>
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    <NavLink>
        {isLoggedIn ? <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <ul class="navbar-nav">
      {/* //<!-- Avatar --> */}
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center" onMouseOver={ <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            <a class="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Logout</a>
          </li>
        </ul>} id="navbarDropdownMenuLink"
          role="button" data-mdb-toggle="dropdown" aria-expanded="false">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp" class="rounded-circle"
            height="22" alt="Avatar" loading="lazy" href="#" />
        </a>
       
      </li>
    </ul>
  </div>
</nav></> : 

<img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" width={50}/>}
        
    </NavLink>
    
  </div>
</div>
</Nav>
/* <div> */
    /* <Navbar >
      <NavbarBrand href="/">Gathur</NavbarBrand>
      <NavLink href="/components/">Components</NavLink>
        <Nav>
          <NavItem>
            
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