import React from "react";
import { useEffect,useState } from "react"
import { Card,CardBody,CardTitle,CardText} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { isNullOrUndefined } from "../Util";
import { Button} from "bootstrap";
import { register } from "../Modules/AuthManager";


export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [zip, setZip]=useState()
  const [radius, setRadius]=useState()
  const [pwStrength, setPWStrength]=useState(false)


  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        userName:userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        avatarImgUrl:imageLocation,
        radius: radius,
        zipcode: zip
      };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

    useEffect(()=>{
      if(!isNullOrUndefined(password))
      {
        if(password.length<=6){
          setPWStrength(true)
        }
      }
    },[password])



  return (<div className="position-absolute top-50 start-50 translate-middle">
  <Card>
    <form onSubmit={(e)=>{registerClick(e)}}>
      <fieldset>
        <div>
          <label htmlFor="Username">Username</label>
          <input
            id="Username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          /><label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="zipcode">zipcode</label>
          <input
            id="zipcode"
            type="text"
            onChange={(e) => setZip(e.target.value)}
          />
          <label htmlFor="Radius">Radius</label>
          <input
            id="Radius"
            type="text"
            onChange={(e) => setRadius(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageLocation">Profile Image URL</label>
          <input
            id="imageLocation"
            type="text"
            onChange={(e) => setImageLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {
          pwStrength ? <p>password must be 6 characters long</p> : ""
        }
        
        <div>
          <button type="submit">Register</button>
        </div>
      </fieldset>
    </form>
    </Card>
    </div>
  );
}
