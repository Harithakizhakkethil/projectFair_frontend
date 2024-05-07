import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerAPI } from '../Services/allApi'
import { logoutResponseContext } from '../Contexts/Context'



function Authentication({register}) {

    const {authorToken,setAuthorToken} = useContext(logoutResponseContext)

    //state to store data
    const[userData,setUserData] = useState({
        username:'',
        email:'',
        password:''
    })
    console.log(userData);

    const navigate = useNavigate()

    const RegisterForm = register?true:false

    //function to register an user
    const handleRegister = async(e)=>{
        //inorder to prevent datalose
        e.preventDefault()
        const {username,email,password} = userData
        if(!username || !email || !password){
            toast.info('please fill the form completely')
        }
        else{
            //api call
              const result = await registerAPI(userData)
              console.log(result);
           /*  toast.success('proceed') */
           if(result.status == 200){
            toast.success('Registration Successful')
            setUserData({
                username:"",
                email:"",
                password:""
            })
            navigate('/login')
           }
           else{
            toast.error(result.response.data)
           }

        }
    }

    //function to login 
    const handleLogin = async(e)=>{
        e.preventDefault()

        const {email,password} = userData

        if(!email || !password){
            toast.info('Please fill the form completely')
        }else{
            const result = await loginApi(userData)
            console.log(result);
            if(result.status==200){
                //adding data to session storage
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                toast.success('Login Successfull')
                setAuthorToken(true)
                setUserData({
                    username:"",
                    email:"",
                    password:"" 
                })
                setTimeout(()=>{
                    navigate('/')
                },2000)
            }

        }
    }


  return (
   <>
        <div className='w-100 d-flex justify-content-center align-items-center  ' style={{height:'100vh'}}>
          <div className='w-75 container'>
            <Link to={'/'} style={{textDecoration:'none',color:'blue'}} ><h5 className='mb-3'><FontAwesomeIcon className='me-3' icon={faArrowLeft} />Back to Home </h5></Link>
            <div className='p-md-5 rounded text-light shadow' style={{backgroundColor:'maroon'}}>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img src="https://peddleup.com/assets/images/bg-login.png" className='w-100 p-4' alt="" />
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center flex-column p-md-3">
                        <h2 > <FontAwesomeIcon className='me-3 fs-1' icon={faStackOverflow} />Project Fair</h2>
                        
                        <h5 className='mt-3'>
                            {
                                RegisterForm?'Sign Up to Your Account':'Sign In to Your Account'
                            }
    
                        </h5>
                        <form  className='mt-3 w-100 p-3 p-md-5'>
                            { RegisterForm && <input type="text" placeholder='Enter Username' className='form-control rounded' value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />}
                            <input type="text" placeholder='Enter Email Id' className='form-control rounded mt-3' value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                            <input type="text" placeholder='Enter Password' className='form-control rounded mt-3' value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                        
                            {RegisterForm?
                            <div>
                                <button onClick={handleRegister} className='btn btn-warning mt-5 w-100 rounded'>Register</button>
                                <p className='mt-2'>Already a User? Click Here to <Link to={'/login'} style={{color:'blue'}}>Login</Link></p>
                           </div>: 
                            <div>
                                <button onClick={handleLogin} className='btn btn-warning mt-5 w-100 rounded'>Login</button>
                                <p className='mt-2'>New User? Click Here to <Link to={'/register'} style={{color:'blue'}}>Register</Link></p> 
                            </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
          </div>  
        </div>

        <ToastContainer  theme='colored' position='top-center' autoClose={2000}/>
   </>
  )
}

export default Authentication
