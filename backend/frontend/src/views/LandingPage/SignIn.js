import React, { useState,useContext } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Message from "./Sections/Messages.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import AuthService from '../services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(styles);



  const Signin = props=>{
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
    const [user,setUser] = useState({username: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }


    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
          console.log('data');
          console.log(authContext);
            console.log(data);
            const { isAuthenticated,user} = data;
            if( isAuthenticated && user.role === "unverified")
            {
              setMessage('Please check your mail and verify your account')

            }
            else if(isAuthenticated && user.role==="merchant" ){
                setMessage('Login successful ! Welcome back to BAEON')
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push("/dash");
            }
            else if(isAuthenticated && user.role==="user"){
              setMessage('Login successful ! Welcome back to BAEON')

              authContext.setUser(user);
              authContext.setIsAuthenticated(isAuthenticated);
              props.history.push("/AddMerchant");
          }
            else
                setMessage('There was an error logging you in');
        });
    }
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="BAE"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(https://i.pinimg.com/originals/36/f0/94/36f0949c623b61a235fd6645fa507236.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}
      >
        <br/>
        <br/>
         {message ? <Message message={message}/> : null}
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={onSubmit} className={classes.form}>
                  <CardHeader  className={classes.cardHeader}>
                    <h3> <b> SIGN IN HERE! </b> </h3>
                  </CardHeader>
                  <p className={classes.divider}>  </p>
                  <CardBody>

                <div style={{position: 'relative', display: 'inline-block'}}>
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 25}}/>

                    <TextField
                      label="EMAIL"
                      id="email"
                      name="username"
                      style = {{width: "230px"}}
                      onChange={onChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                      }}
                    />
                    </div>

                      <br/>
                      <br/>
                <div style={{position: 'relative', display: 'inline-block'}}>
                  <Lock style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 25 }}/>
                    <TextField
                      label="PASSWORD"
                      id="pass"
                      name="password"
                      style = {{width: "230px"}}
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={onChange}
                      inputProps={{
                        type: "password",
                        autoComplete: "off"
                      }}
                    />
                  </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="transparent" size="lg">
                     <h3> <b> LOGIN </b> </h3>
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
export default Signin;
