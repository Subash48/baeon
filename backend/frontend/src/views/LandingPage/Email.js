import React, { useContext , useState, useEffect} from 'react';
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
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import TeamSection from "./Sections/TeamSection.js";
import ChatBot from "./Sections/ChatBot.js";
import {AuthContext} from '../Context/AuthContext';
import axios from 'axios';

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const {isAuthenticated} = useContext(AuthContext);
  const [message,setMessage] = useState("");
  console.log('check')
  console.log(isAuthenticated);

  useEffect(()=>{
    console.log(props.match.params.token);

    axios.get('/user/verify/'+ props.match.params.token)
    .then((res)=>{
      console.log(res);
      if( res.code === true)
        setMessage(res.message+ 'You can login to your account');
      else {
        setMessage(res.error);
      }
    }).catch(()=>{
      setMessage('Email token has expired or invalid. Try logging in to get new activation link')
    })

  },[]);
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
              <h2>
              { message }
              </h2>

              <br />



            </GridItem>

          </GridContainer>
        </div>
      </Parallax>

      <Footer />

    </div>
  );
}
