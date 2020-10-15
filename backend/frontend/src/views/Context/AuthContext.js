import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export default ({ children }) => {
    const [user,setUser] = useState({
        user : "",
        role : ""
    });
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{

        AuthService.isAuthenticated().then(data =>{
            //console.log('Service')
            //console.log(data);
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            //console.log(isLoaded);
            setIsLoaded(true);
        });
    },[]);

    return (
        <div>
            {/* {!isLoaded ? <h1>Loading</h1> :  */}
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>
        </div>
    )
}
