import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteUserProjectApi, editUserProject, userProjectApi } from '../Services/allApi'
import { addProjectResponseContext, edditProjectResponseContext } from '../Contexts/Context'
import { Link } from 'react-router-dom'


function MyProject() {
const {addProjectResponse} = useContext(addProjectResponseContext)

const {editProjectResponse} = useContext(edditProjectResponseContext)

  const [userProject, setUserProject] = useState([])

  const getUserProject = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userProjectApi(reqHeader)
    console.log(result.data); 

    if (result.status == 200) {
      setUserProject(result.data)
    } else {
      console.log(result.response.data);
    }

  }

  console.log(userProject);

  const handleDelete = async(id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteUserProjectApi(id,reqHeader)
    console.log(result);
    if(result.status==200){
      getUserProject()
    }
    else{
      console.log(result.response.data);
    }
  }

  useEffect(() => {
    getUserProject()
  },[addProjectResponse,editProjectResponse])

  return (
    <div className='border p-4 rounded shadow'>
      <div className='mt-4 d-flex'>
        <h3 style={{ color: 'maroon' }}>My project</h3>
        <div className='ms-auto '>
          <AddProject />
        </div>

      </div>
      <div className='mt-4'>
        {userProject?.length > 0 ?
          userProject?.map((item) => (
            <div div className='border bg-light rounded p-2 d-flex mt-3'>
            <h5>{item.title}</h5>
            <div className='d-flex ms-auto'>
              <EditProject project={item} />
              <button className='btn'><Link to={item.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='text-success ms-3' /></Link></button>
              <button onClick={()=>handleDelete(item._id)} className='btn'><FontAwesomeIcon icon={faTrash} className='text-danger ms-3' /></button>
    
            </div>
          </div>
          ))
      :
  <h5 className='text-warning mt-5'>No Project Added Yet...</h5>}

</div>

</div >

  )
}

export default MyProject