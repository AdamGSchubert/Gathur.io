import React from "react";
import { useEffect,useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { HomeLanding } from "./HomePage";
import { ProfileGen } from "./Profile/Profile";
import { GroupNav } from "./NavBars/UserGroups";
import { GetAllGroups } from "../Modules/GroupManager";
import { GroupPage } from "./Groups/GroupPage";

export default function ApplicationViews({ isLoggedIn, user, appLogoutCallback }) {

  const [groups, setGroups]=useState([])

  useEffect(()=>{
    GetAllGroups().then(setGroups)
  },[])

    return (
      <main>
        <Routes>
          <Route path="/">
            <Route
              index
              element={isLoggedIn ? <HomeLanding /> : <HomeLanding />}
            />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<ProfileGen userProfile={user} appLogoutCallback={appLogoutCallback} />}/>
            <Route path="register" element={<Register />} />
            <Route path="mygroups" element={<GroupNav/>}/>
            </Route>
            <Route>
              <Route path="group">
                {
                   groups.map((group)=>
                   <Route key={group.id} path={`/group/${group.name}`} element={<GroupPage GroupDetail={group} user={user}/> }/>)
                }
                  
               </Route> 
            </Route>
        </Routes>
      </main>
    );
  };