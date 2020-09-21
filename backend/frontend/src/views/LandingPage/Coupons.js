import React, {useState,useContext,useEffect} from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { MDBDataTable } from 'mdbreact';
import CouponService from '../services/CouponService';
// @material-ui/icons
// core components
import WorkSection from "./addCoupon.js";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
// Sections for this page
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
          color: "white"
        }}
        {...rest}
      />

      

       

<Parallax filter image={require("./LogoBgImage.png")}>
                    
                    <div className={classes.container}>
                      
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <h2 className={classes.title}> your coupons here  </h2>
                        
                          <h3>
                         Check out your coupons here <br/>
                         and add them!
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



