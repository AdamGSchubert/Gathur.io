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
import { PostWithCommentList } from "./Posts/PostComments";
import { SearchResult } from "./NavBars/SearchResult";
import { EditPost } from "./Posts/EditPost";

export default function ApplicationViews({ isLoggedIn, user, 
  appLogoutCallback,loggedUserGroups }) {

  const [groups, setGroups]=useState([])
  const [groupPosts, setGroupPosts]=useState([])

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
            <Route path="login">
                  <Route index element={<Login />} />
                  <Route path="register" element={<Register />} />  
            </Route>
            
            <Route path="profile" element={<ProfileGen userProfile={user} appLogoutCallback={appLogoutCallback} />}/>
            
            <Route path="mygroups" element={<GroupNav/>}/>
            {/* <Route path=":searchTerm" element={<SearchResult/>}/> */}
            {/* </Route>
            <Route> */}
              <Route path="group">
                <Route path= ":name">
                  <Route index element={<GroupPage user={user} userGroups={loggedUserGroups} isLoggedIn={isLoggedIn}/> }/>
                    <Route  path= ":postTitleId">
                  <Route index element={<PostWithCommentList User={user} isLoggedIn={isLoggedIn}/>}/>
                  <Route path=":editId" element={<EditPost/>}/>
                  </Route>
                </Route>    
            
               </Route> 
            </Route>
        </Routes>
      </main>
    );
  };