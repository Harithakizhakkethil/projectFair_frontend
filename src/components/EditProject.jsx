import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Base_Url } from '../Services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserProject } from '../Services/allApi';
import { edditProjectResponseContext } from '../Contexts/Context';


function EditProject({ project }) {

  const {setEditProjectResponse} = useContext(edditProjectResponseContext)
  /*  console.log(project); */
  //state to hold the details of the project

  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage: ""

  })

  //state to store the url of file
  const [preview, setPreview] = useState("")

  useEffect(() => {
    projectDetails.projectImage &&
      setPreview(URL.createObjectURL(projectDetails.projectImage)) // to convert the file into url

  }, [projectDetails.projectImage])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => {
    setProjectDetails({
      id: project._id,
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImage: ""
    })
    setPreview("")
  }

  const handleEdit = async(e) => {
    e.preventDefault()
    const{id,title,language,website,github,overview,projectImage} = projectDetails

    if(!id || !title || !language || !website || !github || !overview ){
      toast.info('Please fill the form completely')
    } else{
        //request body -formdata class object
            //if your request contains uploaded content the body have to send in format of formdata
            //1) create an object for formdata class
            const reqBody = new FormData()

            //To add data to the body - use append() - can add only one item at a time.
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
            preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

     const token = sessionStorage.getItem("token")    
     
     if (preview) {//upload
      const reqHeader = {
        "content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}` //bearer - no other credential or document is required to verify the request holder

      }

      const result = await editUserProject(id,reqBody,reqHeader)
      console.log(result);
      if(result.status == 200){
        toast.success('Project updated successfully')
        handleClose()
        setEditProjectResponse(result.data)
      }

    }
    else {//no upload
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await editUserProject(id,reqBody,reqHeader)
      console.log(result);
      if(result.status == 200){
        toast.success('Project updated successfully')
        handleClose()
        setEditProjectResponse(result.data)
      }
      
    } 
   
  }


  }

  return (
    <>
      <div>
        <button onClick={handleShow} className='btn'><FontAwesomeIcon icon={faPenToSquare} className='text-primary' /></button>
      </div>
      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 p-3">
              <label htmlFor="img">
                <input type="file" id='img' style={{ display: 'none' }} onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                <img src={preview ? preview : `${Base_Url}/uploads/${project.projectImage}`} alt="" className='w-100' />
              </label>
            </div>
            <div className="col-md-6 p-3">
              <div className='mt-3 mb-3'>
                <input type="text" placeholder='Project Title' className='form-control rounded' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>
              <div className='mt-3 mb-3'>
                <input type="text" placeholder='Language' className='form-control rounded' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} />
              </div>
              <div className='mt-3 mb-3'>
                <input type="text" placeholder='GitHub Link' className='form-control rounded' value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} />
              </div>
              <div className='mt-3 mb-3'>
                <input type="text" placeholder='Website Link' className='form-control rounded' value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} />
              </div>
              <div className='mt-3 mb-3 '>
                <textarea className='border rounded p-2' style={{ borderColor: 'grey' }} cols="41" rows="5" placeholder='overview' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning rounded" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success rounded" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer  theme='colored' position='top-center' autoClose={2000}/>

    </>
  )
}

export default EditProject