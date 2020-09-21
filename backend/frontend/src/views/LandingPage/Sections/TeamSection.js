import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import ad from "../partner.jpg";
import media from "../media.png";
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

          <GridItem xs={12} sm={12} md={6}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ media } className={ imageClasses } alt="media" />
              </GridItem>
              <a href="/admedia" className={classes.cardTitle}  target="_blank">
                <h3><font color="white"> BAEON MEDIA PARTNERS </font> </h3> 
                <br />
              </a>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ ad } className={imageClasses} alt="ad"/>
              </GridItem>
              <a href="/advertisers" className={classes.cardTitle} target="_blank">
             <h3>  <font color="white"> ADVERTISERS </font> </h3>
                <br />
              </a>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
