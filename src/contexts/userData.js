import React,{useState} from "react"
import {Navigate } from "react-router-dom";

const {Consumer} = React.createContext()
const UserContext = React.createContext(undefined);

function UserDataProvider(props) {

    const [userData, setUserData] = useState({code:"",name:"",date:""});
    function setUser(newUser,curDate)
    {
        setUserData({ code: newUser.CodigoConductor,name: newUser.NombreConductor,date:curDate});
    };
    function checkUser(userData,password)
    {
        if(userData.NombreConductor===password)
            return true;
        else
            return false;
        
    };
    function logOut()
    {
        setUserData({code:"",name:""})
        return <Navigate to='/' />
    }
    
    // return (
    //     <UserContext.Provider value={userData}>
    //       <UserDispatchContext.Provider value={{checkUser:checkUser,setUser:setUser}}>
    //           {props.children}
    //       </UserDispatchContext.Provider>
    //     </UserContext.Provider>    
    // )
    return (
        <UserContext.Provider value={{userData,setUser,checkUser,logOut}}>
              {props.children}
        </UserContext.Provider>    
    )
}

export {UserDataProvider, UserContext, Consumer as UserDataConsumer}