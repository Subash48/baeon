import React, {useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({component : Component, roles, ...rest})=>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    console.log('priv'+user.role);
    return(
        <Route {...rest} render={props =>{
            if(isAuthenticated === false)
                return <Redirect to={{ pathname: '/SignIn',
                                       state : {from : props.location}}}/>

            if(roles.includes(user.role))
                return <Redirect to={{ pathname: '/',
                                 state : {from : props.location}}}/>
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;
