import { useEffect,useState } from "react"
import { logout } from "../../Modules/AuthManager"
import { useNavigate } from "react-router-dom";
import { Card,CardBody,CardTitle,CardText} from "reactstrap";

export const ProfileGen =( {userProfile, appLogoutCallback} )=>{
 const navigate = useNavigate()

   // export const isLoggedIn = null;

    // useEffect(()=>{

    //  },[userProfile])

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
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Username</label>
                    
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={userProfile.userName}/>
                    <button>update Username</button>
                    </div>
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={userProfile.email}/>
                    </div>
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">zipcode</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={userProfile.zipcode}/>
                    </div>
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Radius (miles)</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder={userProfile.radius}/>
                    </div>
                    <div>
                      <button type="button" class="btn btn-danger"onClick={exit}>Logout</button>  
                    </div>
                </form>
                


            </CardBody>
        
        </Card></div>
    </>)
}