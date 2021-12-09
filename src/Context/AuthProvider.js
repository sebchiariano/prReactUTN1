import React,{useState} from "react"
import AuthContext from "./AuthContext"

function AuthProvider(props){
    const [userIsLogged, setUserIsLogged] = useState(localStorage.getItem("logged"));

    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));

    

    const loginUser = (info) =>{

        localStorage.setItem("logged", true);
        localStorage.setItem("userInfo",JSON.stringify(info))
        //sessionStorage.setItem("logged", true);
        //sessionStorage.setItem("userInfo",JSON.stringify(info))

        setUserIsLogged(true);

        setUserInfo(info);

    }

    const logoutUser = ()=>{

        localStorage.removeItem("logged");
        localStorage.removeItem("userInfo");

        //sessionStorage.removeItem("logged");
        //sessionStorage.removeItem("userInfo");

        setUserIsLogged(false);

        setUserInfo({});

    }

    return(
        <AuthContext.Provider
            value={{
                userIsLogged,
                loginUser,
                logoutUser,
                userInfo
            }}
            
        >

            {props.children}

        </AuthContext.Provider>
    )
}
export default AuthProvider;