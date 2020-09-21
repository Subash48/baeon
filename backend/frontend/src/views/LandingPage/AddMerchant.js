import React, { useContext} from 'react';
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
import HeaderLinksLogged from "components/Header/HeaderLinksLoggedIn.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
// Sections for this page

import WorkSection from "./Sections/WorkSectionMerchant.js";
import ChatBot from "./Sections/ChatBot.js";
import {AuthContext} from '../Context/AuthContext';
const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const {isAuthenticated } = useContext(AuthContext);
const authenticatedNavBar = ()=>{
  return(
    <Header
    color="transparent"
    routes={ dashboardRoutes }
    brand="BAE"
    rightLinks={<HeaderLinksLogged />}
    fixed
    changeColorOnScroll={{
      height: 400,
      color: "mycolor"
    }}
    {...rest}
  />
  )
};

const unauthenticatedNavBar = ()=>{ 

  return (
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
    
)
 };
  const { ...rest } = props;
  return (
    <div>
     { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}

      <Parallax filter image={require("./LogoBgImage.png")}>

        <div className={classes.container}>
          
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h2 className={classes.title}> Become a Merchant </h2>
            
              <h3>
              We would love to partner with you ! <br />
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
}



