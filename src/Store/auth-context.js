import React, {useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout : () => {}
    onLogin : () => {}
})  


export const autContextProvider = (props) => {

    const [isLoggedIn , setIsLoggedIn] = useState()

    const logoutHandler = () => {
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        setIsLoggedIn(true)
    }



  return (
    <autContextProvider value={{isLoggedIn : isLoggedIn, onLogout: logoutHandler , onLogin : loginHandler}}>
        {props.children}
    </autContextProvider>
  )
}

export default AutContext