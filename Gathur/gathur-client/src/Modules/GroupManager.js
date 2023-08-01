
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