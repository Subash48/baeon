import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";


import monetize from "../monetize1.png";
import stick from "../stick2.png";
import gift from "../gifts.jpg"
const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}> <font color="white"> What are you looking for ? Here we go ! </font></h2>
      <div>

        <GridContainer>

          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ monetize } className={ imageClasses } alt="monetize" />
              </GridItem>
              <a href=" " className={classes.cardTitle}>
              <font color="white">  MONETIZE </font>
                <br />
              </a>

              <CardBody>
               <h3> <p className={classes.description}>
                  Make additional money on every transaction of yours
                </p> 
              </h3>

              </CardBody>

            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ gift } className={imageClasses} alt="gift"/>
              </GridItem>
              <a href=" " className={classes.cardTitle}>
              <font color="white">  GIFT </font>
                <br />
              </a>

              <CardBody>
              <h3>   <p className={classes.description}>
                  Gift your customers for transacting with you 
                </p> </h3>
              </CardBody>

            </Card>
          </GridItem>
       
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ stick } className={ imageClasses } alt="stick" />
              </GridItem>
              <a href=" " className={classes.cardTitle}>
              <font color="white">     STICKINESS   </font>
                <br />
              </a>

              <CardBody>
               <h3>  <p className={classes.description}>
                  Enhance customer stickiness on your platform
                </p> </h3>
              </CardBody>

            </Card>
          </GridItem>

        </GridContainer>
      </div>
    </div>
  );
}
