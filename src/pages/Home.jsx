import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../assets/project.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { HomeProjectApi } from '../Services/allApi'



function Home() {
  const[isLogin,setIsLogin] = useState(false)
  const[project,setProject] = useState([])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }
  },[])

  const gethomeProject = async()=>{
    const result = await HomeProjectApi()
    /* console.log(result.data); */
    setProject(result.data)
  }

  console.log(project);

  useEffect(()=>{
    gethomeProject()
  },[])

  return (
   <>
      <div style={{width:'100%',height:'70vh',backgroundColor:'maroon'}}>
        <div className='container-fluid rounded'>
          <Row className='align-items-center p-5 text-light'>
            <Col sm={12} md={6}>
            <h1>  <FontAwesomeIcon icon={faStackOverflow} className='me-2 mt-5'/>Project Fair</h1>
            <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae dignissimos doloribus quia, impedit assumenda mollitia nesciunt,Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, veritatis? </p>
           
          {isLogin? <Link to={'/dashboard'}>
              <button className='btn btn-warning mt-3 '>Manage Project<FontAwesomeIcon icon={faArrowRight} /></button>
          </Link> 
          :
          <Link to={'/login'}>
              <button className='btn btn-warning mt-3 '>Get Start <FontAwesomeIcon icon={faArrowRight} /></button>
          </Link> }           
          </Col>
            <Col sm={12} md={6}>
              <img src={titleimage} alt="image" className='w-75' style={{marginTop:'50px'}}/>
            
            </Col>
          </Row>
  
        </div>
      </div>

    <div className='mt-5'>
        <h1 className='text-center'>Explore Our Projects</h1>

      <marquee scrollAmount={20}>
       <div className='d-flex mt-5 mb-5'>
         { project?.length>0?
         <div className='row'>
           
           {project.map((item)=>(<div className='col-md-4'><ProjectCard pro={item} /></div>)) }
           
            </div>:null
            }
          
       </div>
       </marquee>

       <div className='text-center mb-5'>
          <Link to={'/project'}>See More Projects</Link>
       </div>

    </div>

   </>
  )
}

export default Home