import React from "react";
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
//import WorkSection from "./addCoupon.js";
import ChatBot from "./Sections/ChatBot.js";
import InfoArea from "./Sections/WorkSectionCoupon.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);
export default function Coupon(props) {
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
              <h2 className={classes.title}> Coupon Addition  </h2>
            
              <h3>
              Client side coupon addition <br />
              Add your coupons here ! and get the best deals
                 </h3>
                  <br />
            </GridItem>

          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
           <InfoArea/>
           <ChatBot/>
           
        </div>
      </div>
      <Footer />
    </div>
  );
}


