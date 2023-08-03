
import { getToken } from "./AuthManager";

const groupApi = "/api/Group";

export const GetUserGroups =()=>{
    return getToken().then((token)=>
        fetch(groupApi, { 
            method: "Get",
            headers: {
                Authorization: `Bearer ${token}`}
            })
        .then((res)=> {
            if(res.ok){
                return res.json()
            }
            else{
                throw new Error(
                    "Get User Groups did not return status 200"
                )
            }
        }))
}

export const GetGroupByName=(name)=>{
    return fetch(`${groupApi}/getByName?name=${name}`)
    .then((res)=>{
        if(res.ok)
        {
            return res.json()
        }
        else{
            throw new Error(
                "get group details by name return error."
            )
        }
    })
}

export const GetGroupById=(groupId)=>{
    return fetch(`${groupApi}/getbyId?id=${groupId}`)
    .then((response) =>{   
        if(response.ok){
        response.json()
        }
        else {
            throw new Error(" get group by Id did not return status 200" )
        }
    }
        )
    
}

export const GetAllGroups =()=>{
    return fetch(`${groupApi}/allGroups`)
    .then((res)=> {
        if(res.ok){
            return res.json()
        }
        else{
            throw new Error(
                "Get all Groups did not return status 200"
            )
        }
    })
}
//userGroupJoin needs userId and GroupId
export const UserJoinGroup =(userGroupJoin)=>{
    return getToken().then((token)=>{
        return fetch(`${groupApi}/JoinGroup`,{
            method: "Post",
            headers:{
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(userGroupJoin)
        }).then((res)=>{
        if(res.ok){
            console.log("successful group join")
        }
        else{
            throw new Error(
                "User join group failed"
            )
        }
        })
     })
}
export const RemoveUserGroup =(groupToRemove)=>{
    return getToken().then((token)=>{
        return fetch(`${groupApi}`,{
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(groupToRemove)
        }).then((res)=>{
        if(res.ok){
            console.log("successful group removal")
        }
        else{
            throw new Error(
                "User group removal failed"
            )
        }
        })
     })
}

export const SearchGroups =(search)=>{
    return fetch(`${groupApi}/search?searchTerm=${search}`)
    .then((res)=> {
        if(res.status == 200){
            return res.json()
        }
        else{
            return {
                "id": -1,
                "name": "Error",
                "description": "no groups found in search: Make new group?"
            }
        }
    })
}