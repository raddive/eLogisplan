import React,{useState} from "react"
// import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs"

import { callWS} from "../components/utils";

// import AdminLanding from "../pages/Administracion/AdminLanding";


const {Consumer} = React.createContext()
const UserContext = React.createContext(undefined);


function UserDataProvider(props) {

    const [userData, setUserData] = useState({code:"",name:"",date:"",empresa:""});
    const [adminData, setAdminData] = useState({name:""});
    const [isAdmin, setIsAdmin] = useState(false);
    function setUser(newUser,curDate)
    {
        setUserData({ code: newUser.code,name: newUser.name,date:curDate,empresa:process.env.REACT_APP_EMPRESA});
        setIsAdmin(false);
    };
    function setAdmin(name)
    {
        setAdminData({ name: name});
        setIsAdmin(true);
    };


    function checkUser(userCode)
    {
        let error="";
        const params = { rquest:"loginJWT",user:userCode,empresa:process.env.REACT_APP_EMPRESA};
        callWS("GET",params,error)
        .then(data =>   { 
            if(data)
            {
                console.log(data);
                return true;
            }
            else
                return false;
        })
        .catch((error) => {
            console.log(error);
            return false;
         });
    }


    function registerJWTUser(formData)
    {
        // SALT should be created ONE TIME upon sign up
        const salt = bcrypt.genSaltSync(10)
        console.log(salt);
    
        const hashedPassword = bcrypt.hashSync(formData.password, salt) // hash created previously created upon sign up

        console.log(hashedPassword );
    }

    function checkJWTLogin(userData,password)
    {
        const match = bcrypt.compareSync(password, userData.password);
        if(!match) 
            return false;
        else
            return true;;
    };

    // function checkUser(userData,password)
    // {
    //     if(userData.NombreConductor===password)
    //         return true;
    //     else
    //         return false;
        
    // };
    function logOut()
    {
        setUserData({code:"",name:""})
    }
    function adminLogOut()
    {
        setAdminData({name:""})
        setIsAdmin(false);
    }
    
    // return (
    //     <UserContext.Provider value={userData}>
    //       <UserDispatchContext.Provider value={{checkUser:checkUser,setUser:setUser}}>
    //           {props.children}
    //       </UserDispatchContext.Provider>
    //     </UserContext.Provider>    
    // )
    return (
        <>
            <UserContext.Provider value={{userData,adminData,isAdmin, setUser,setAdmin,checkJWTLogin, checkUser,registerJWTUser,logOut,adminLogOut}}>
                    {props.children}
            </UserContext.Provider>    
        </>
    )
}

export {UserDataProvider, UserContext, Consumer as UserDataConsumer}