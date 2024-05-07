import { faFacebook, faInstagram, faLinkedinIn, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'




function Footer() {
  return (
    <>
       <div className="row p-5 " style={{backgroundColor:'maroon',color:'white'}} >
        
        <div className="col-md-4 ">
            <h3> <FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h3>
            <p className='mt-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, omnis, sint vitae rerum expedita iste dolores, earum est similique deserunt animi temporibus labore id? Alias cupiditate esse doloremque tenetur. Hic.</p>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2 ">
            <h3>Links</h3>
           <Link to={'/'} style={{textDecoration:'none',color:'white'}}> <h6 className='mt-4'>Home</h6></Link>
            <h6>Login</h6>
            <h6>Register</h6>
        </div>
        <div className="col-md-2">
            <h3 >Guides</h3>
            <h6 className='mt-4'>React</h6>
            <h6>React Bootstrap</h6>
            <h6>Bootswatch</h6>   
        </div>
        <div className="col-md-3">
            <h3>Contact Us</h3>
                <div className='d-flex mt-4'>
                    <input type="text" className='form-control' placeholder='Enter Mail Id' />
                    <button className='btn btn-warning ms-3'>Subscribe</button>
                </div>
                <div className='d-flex justify-content-evenly mt-3 '>
                <FontAwesomeIcon icon={faInstagram} size='2xl' />
                <FontAwesomeIcon icon={faLinkedinIn} size='2xl' />
                <FontAwesomeIcon icon={faTwitter} size='2xl' />
                <FontAwesomeIcon icon={faFacebook} size='2xl' />


                </div>
        </div>

       </div>
    </>
  )
}

export default Footer