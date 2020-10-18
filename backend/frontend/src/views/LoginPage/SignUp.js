import React, { useState  } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Phone from "@material-ui/icons/Phone";
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
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import AuthService from '../services/AuthService';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(styles);


const getStyle = (props)=>{
    let baseClass = "alert ";
    if(props.message.msgError)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + " text-center";
}

const Message = props=>{
    return(
        <div className={getStyle(props)} role="alert">
          <h3>{props.message}</ h3>
        </div>
    )
}


const Signup = props=>{

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const [user,setUser] = useState({username: "",email:"",password : "",mobileno:"" });
  const [message,setMessage] = useState("");

  const onChange = e =>{
      setUser({...user,[e.target.name] : e.target.value});
  }

  const onSubmit = e =>{
      e.preventDefault();
      AuthService.register(user).then(data=>{
          console.log(data);
          if(data.status === 201)
          {
            setMessage("User account created successfully !")
            // setInterval(() => {
            //   console.log('Interval triggered');
            // }, 1000);
            props.history.push('/SignIn');
          }
          else {
            setMessage("Error !  Please check your details ")

          }


      });
  }

  const classes = useStyles();
  const { ...rest } = props;
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
          backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIoxU8Be1A3kN9hAdYyivR09h9663oWS7UzA&usqp=CAU)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
            {message !== ""? <Message message={message}/> : null}
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={onSubmit}  className={classes.form}>
                  <CardHeader className={classes.cardHeader}>
                    <h3> SIGN UP HERE !</h3>
                  </CardHeader>
                  <p className={classes.divider}> Become a member </p>
                  <CardBody>


                  <div style={{position: 'relative', display: 'inline-block'}}>
                  <People style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="USERNAME"
                      id="first"
                      name="username"
                      type="text"
                      style = {{width: "230px"}}
                      onChange = {onChange}
                      formControlProps={{
                        fullWidth: true

                      }}
                      inputProps={{
                        type: "text"
                      }}


                    />
                    </div>
                    <br />
                    <br />
                <div style={{position: 'relative', display: 'inline-block'}}>
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="EMAIL"
                      id="email"
                      name="email"
                      type="text"
                      style = {{width: "230px"}}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email"
                      }}
                      onChange = {onChange}
                    />
                  </div>
                  <br />
                  <br />

                <div style={{position: 'relative', display: 'inline-block'}}>
                  <Lock style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="PASSWORD"
                      id="pass"
                      name="password"
                      type="password"
                      style = {{width: "230px"}}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                      onChange = {onChange}
                    />
                    </div>

                      <br/>
                      <br />
            <div style={{position: 'relative', display: 'inline-block'}}>
                  <Phone style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                  <TextField
                      label="MOBILE NUMBER"
                      id="mobile-number"
                      name="mobileno"
                      style = {{width: "230px"}}
                      type="text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        autoComplete: "off"
                      }}
                      onChange = {onChange}
                    />

                    <br/>
                    <br />
                </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="transparent" size="lg">
                      Get started
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
export default Signup;
