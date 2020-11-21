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
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import TeamSection from "./Sections/TeamSectionAdvertisers.js";
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
              <h1 className={classes.title}> Improve your business through <br/> an unexplored ad medium</h1>
              <h4>
              
              </h4>

              
              <br />

              <Button
                variant = "contained"
                color="dark"
                size="white"
                className = {classes.Button}
                href="/SignUp"
              >
                <font color="#2B3990"> <b>Get Started </b> </font>
              </Button>

            </GridItem>

          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <TeamSection />
           <ChatBot/>
        </div>
      </div>
      <Footer />

    </div>
  );
}



