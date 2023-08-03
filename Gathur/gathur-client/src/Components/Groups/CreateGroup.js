import { useEffect,useState } from "react"
import { CreateNewGroup, GetGroupByName, UserJoinGroup } from "../../Modules/GroupManager"
import { isNullOrUndefined } from "../../Util"


export const CreateGroup =({currentUser, searchCallBk})=>{

    const [groupName, setGroupName]=useState("")
    const [groupDesc, setGroupDesc]=useState("")
    const [newlyCreated, setNewlyCreated]=useState({})

const addGroup =(e)=>{
    e.preventDefault()

    var newGroup={
        name:groupName,
        description: groupDesc
    }
    CreateNewGroup(newGroup)
    GetGroupByName(groupName).then(setNewlyCreated)

        
    if(!isNullOrUndefined(currentUser.Id) 
    && !isNullOrUndefined(newlyCreated.id)){
        var groupJoin={
            userId: currentUser.Id,
            GroupId: newlyCreated.id
        } 
        UserJoinGroup(groupJoin)
        searchCallBk(false,null)
    }
}


    return(
        <div>
        <form onSubmit={(e)=>{addGroup(e)}}>
            <fieldset>
                <label htmlFor="groupName">new Group Name:</label>
                <input id="groupName"onChange={(e)=>{setGroupName(e.target.value)}}/>
            </fieldset>
            <fieldset>
                <label htmlFor="groupDescript">new Group Description:</label>
                <textarea className="form-control" id="groupDescript" rows="4" onChange={(e)=>{setGroupDesc(e.target.value)}}/>
            </fieldset>
                <button>create Group</button>
        </form>
        </div>
    )
}