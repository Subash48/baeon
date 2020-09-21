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
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinksLoggedIn.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./ProductSection.js";
import TeamSection from "./TeamSection.js";
import ChatBot from "./ChatBot.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function LandingPageSection(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
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
              <h1 className={classes.title}> We find the best discounts for you !</h1>
              <h4>
               Best coupons, Sign in here and become a coupon pro ! <br/>
               Buying made easy here !!!
              </h4>
              <br />
              <Button
                color="primary"
                size="lg"
                href="/SignUp"
              >
                <i className="fas fa-blog" />
                Get Started
              </Button>

              <Button
                color="primary"
                size="lg"
                href=""
              >
                <i className="fas fa-blog" />
                 Contact sales
              </Button>

            </GridItem>
          </GridContainer>
        </div>
        </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
            <TeamSection/>
           <ChatBot/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
