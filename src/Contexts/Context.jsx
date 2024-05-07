import React, { createContext, useState } from 'react'



//context to add project
export const addProjectResponseContext = createContext()

export const edditProjectResponseContext = createContext()

export const logoutResponseContext = createContext()

function Context({children}) {
    //children is a predefined props used to share data between the components.

    const[addProjectResponse, setAddProjectResponse] = useState({})

    const[editProjectResponse, setEditProjectResponse] = useState({})

    const [authorToken , setAuthorToken] = useState(true)

  return (
    <>
      <addProjectResponseContext.Provider value={{addProjectResponse, setAddProjectResponse}}>
        <edditProjectResponseContext.Provider value={{editProjectResponse, setEditProjectResponse}}>
          <logoutResponseContext.Provider value={{authorToken, setAuthorToken}}>
            {children}
            </logoutResponseContext.Provider>
        </edditProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>  
    </>
  )
}

export default Context