import { Base_Url } from "./baseUrl"
import { commonAPI } from "./commonApi"




// request to register an user
export const registerAPI = async(reqBody)=>{
    return await commonAPI('POST',`${Base_Url}/user/register`,reqBody,"")
}

//request to login
export const loginApi = async(reqBody)=>{
    return await commonAPI('POST', `${Base_Url}/user/login`,reqBody,"")
}

//request to add project
export const addProjectApi = async(reqBody,reqHeader)=>{
        return await commonAPI('POST',`${Base_Url}/addproject`,reqBody,reqHeader)
}

//request to get home project
export const HomeProjectApi = async()=>{
    return await commonAPI('GET',`${Base_Url}/home-project`,"","")
}

//request to get all projects

//query parameter = path?key=value
//eg : https://www.google.com/search?q=flower

export const allProjectApi = async(searchkey,reqHeader)=>{
    return await commonAPI('GET',`${Base_Url}/all-project?search=${searchkey}`,"",reqHeader)
}

//request to get userproject
export const userProjectApi = async(reqHeader)=>{
    return await commonAPI('GET',`${Base_Url}/user/all-project`,"",reqHeader)
}

//request to delete user project
export const deleteUserProjectApi = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${Base_Url}/user-project/delete/${id}`,{},reqHeader)
}

//request to edit the userproject
export const editUserProject = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${Base_Url}/project/edit/${projectId}`,reqBody,reqHeader)
}

//request to update userProfile
export const updateProfileApi = async(reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${Base_Url}/profile-update`,reqBody,reqHeader)
}

