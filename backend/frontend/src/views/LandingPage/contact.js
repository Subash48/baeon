/*import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
// Sections for this page
import WorkSection from "./Sections/WorkSection.js";
import ChatBot from "./Sections/ChatBot.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={ dashboardRoutes }
        brand="BAE"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "mycolor"
        }}
        {...rest}
      />

      <Parallax filter image={require("./LogoBgImage.png")}>

        <div className={classes.container}>
          
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h2 className={classes.title}> Contact Us  </h2>
            
              <h3>
              We would love to hear from you ! <br />
            For queries, write to us at baemedia@gmail.com
                 </h3>

                  <br />
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
            <WorkSection />
           <ChatBot/>
        </div>
      </div>
      <Footer />
    </div>
  );
} */


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

const Signup = props=>{
  
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  
  const [user,setUser] = useState({username: "",email:"",password : "",mobileno:"" });
  
  const onChange = e =>{
      setUser({...user,[e.target.name] : e.target.value});
  }

  const onSubmit = e =>{
      e.preventDefault();
      AuthService.register(user).then(data=>{
          console.log(data);
          props.history.push('/SignIn');
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
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={onSubmit}  className={classes.form}>
                  <CardHeader className={classes.cardHeader}>
                    <h3> CONTACT US </h3>
                  </CardHeader>
                  <p className={classes.divider}> <h3> Write to us at <b> contact@baeon.co </b> </h3> </p>
                  <CardBody>


                  <div style={{position: 'relative', display: 'inline-block'}}>  
                  <People style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="FIRSTNAME"
                      id="first"
                      name="firstname"
                      type="text"
                      style = {{width: "250px"}}
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
                  <People style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="LAST NAME"
                      id="last"
                      name="lastname"
                      type="text"
                      style = {{width: "250px"}}
                      onChange = {onChange}
                      formControlProps={{
                        fullWidth: true

                      }}
                      inputProps={{
                        type: "text"
                      }}
                 
                     
                    />
                    </div>

                    <br/>
                    <br/>

                    <div style={{position: 'relative', display: 'inline-block'}}>  
                    <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="JOB TITLE"
                      id="job"
                      name="jobtitle"
                      type="text"
                      style = {{width: "250px"}}
                      onChange = {onChange}
                      formControlProps={{
                        fullWidth: true

                      }}
                      inputProps={{
                        type: "text"
                      }}
                 
                     
                    />
                    </div>

                    <br/>
                    <br/>

                    <div style={{position: 'relative', display: 'inline-block'}}>  
                    <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="COMPANY"
                      id="company"
                      name="company"
                      type="text"
                      style = {{width: "250px"}}
                      onChange = {onChange}
                      formControlProps={{
                        fullWidth: true

                      }}
                      inputProps={{
                        type: "text"
                      }} 
                    />
                    </div>

                    <br/>
                    <br/>

                <div style={{position: 'relative', display: 'inline-block'}}>  
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="BUSINESS EMAIL"
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
                                
                  <div style={{position: 'relative', display: 'inline-block'}}>  
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 30}}/>
                    <TextField
                      label="Your interest in BAEON"
                      id="interest"
                      name="interest"
                      type="text"
                      style = {{width: "230px"}}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text"
                      }}
                      onChange = {onChange}
                    />
                  </div>

                      <br/>
                      <br />
         
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="transparent" size="lg">
                   <h4>  <b> SUBMIT </b> </h4>
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
