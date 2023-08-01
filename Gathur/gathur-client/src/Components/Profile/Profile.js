import { useEffect,useState } from "react"
import { logout } from "../../Modules/AuthManager"
import { useNavigate } from "react-router-dom";
import { Card,CardBody,CardTitle,CardText} from "reactstrap";

export const ProfileGen =( {userProfile, appLogoutCallback} )=>{
 const navigate = useNavigate()

   const [user, setUser]=useState({})

    useEffect(()=>{
        if(userProfile)
        {
            setUser(userProfile)
        }
     },[userProfile])

    const exit =()=>{
            //logout()
            //final place for callback from app.js
            appLogoutCallback(false);
            navigate("/");
    }

    return(<><div className="position-absolute top-50 start-50 translate-middle">
        <Card>
            <CardBody>
                <form>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                    
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={user.userName}/>
                    <button>update Username</button>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={user.email}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">zipcode</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={user.zipcode}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Radius (miles)</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={user.radius}/>
                    </div>
                    <div>
                      <button type="button" className="btn btn-danger"onClick={exit}>Logout</button>  
                    </div>
                </form>
                


            </CardBody>
        
        </Card></div>
    </>)
}