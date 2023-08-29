import { useState, createContext, useEffect } from "react";

const LoggedUserContext = createContext();

export function LoggedUserProvider({children}) {
  const [loggedUser, setLoggedUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');
  
  
  
    function test(){
      return 'test'
    }
 

    async function getLoggedUser(email){
      if(email){
        if(email.indexOf('@') !== -1){
          const response = await fetch(`api/user`, {
            method: 'POST',
            body: JSON.stringify({email})
          })
          const data = await response.json();
          setLoggedUser(data)
        }
      }
    }

    async function updateWishLists(email, newWishlist){
      if(email){
        if(email.indexOf('@') !== -1){
          try {
            setLoader(true)
            const response = await fetch(`api/user/wishlists/add`, {
              method: 'PATCH',
              body: JSON.stringify({email, newWishlist})
            })
  
            if(response.ok){
              const data = await response.json();
              setLoggedUser(data);
              setLoader(false)
            }
          } catch (error) {
            console.log(error.message)
          }
      }
    }
  }

    async function deleteWishlist(email, wishlistName){
      try {
        const response = await fetch(`api/user/wishlists/delete`, {
          method: 'PATCH',
          body: JSON.stringify({email, wishlistName})
        })
      
        if(response.ok){
          const data = await response.json();
          setLoggedUser(data)
        }

      } catch (error) {
        console.log(error.message)
      }
    
    }

    const registerUser = async(registerDetails) => {
      try {
        const response = await fetch('api/user/register', {
          method: 'POST',
          body: JSON.stringify({registerDetails})
        })
        if(response.ok){
          const data = await response.json();
          if(data.error){
            setRegisterError(data.error)
          }else{
            setRegisterError('')
            setLoggedUser(data);
            localStorage.setItem('email', data.email)
            window.location.reload()
          }
        }

      } catch (error) {
        console.log(error.message)
      }
    }

    const loginUser = async(loginDetails) => {
        try {
        const response = await fetch('api/user/login', {
          method: 'POST',
          body: JSON.stringify({loginDetails})
        })

        if(response.ok){
          const data = await response.json();
          if(data.error){
            setLoginError(data.error)
          }else{
            setLoginError('')
            setLoggedUser(data);
            localStorage.setItem('email', data.email)
            window.location.reload()
          }
        }
        
      } catch (error) {
        console.log(error.message)
      }
    }
  
    async function savePost(id, email, wishlistName, property){
        const response = await fetch(`api/property/save/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({email, wishlistName, property }),
        })
        const data = await response.json();
        setLoggedUser(data)
      }

    async function unSavePost(id, email) {
        const response = await fetch(`api/property/unsave/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({email}),
        })
        const data = await response.json();
        setLoggedUser(data)
       }



    return (
        <LoggedUserContext.Provider value={{test, loggedUser, setLoggedUser, getLoggedUser, updateWishLists, deleteWishlist, savePost, unSavePost, loader, registerUser, loginUser, registerError, loginError, setRegisterError, setLoginError}}>
            { children }
        </LoggedUserContext.Provider>
    )
}


export default LoggedUserContext;