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


import sales from "../sales2.jpg";
import market from "../market.jpg";
import growth from "../growth.png";
import conversion from "../conversion1.png";
import reach from "../reach.png";

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
      <h2 className={classes.title}> 
      <font color="white">What are you looking for ? Here we go ! </font> </h2>
      <div>

        <GridContainer>

          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ sales } className={ imageClasses } alt="sales" />
              </GridItem>
              <a href=" " className={classes.cardTitle}>
               <font color="white"> SALES </font>
                <br />
              </a>

              <CardBody>
                <h3> <p className={classes.description}>
                Increase your sales  
                </p> </h3>
              </CardBody>

            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ market } className={imageClasses} alt="sales" />
              </GridItem>
              <a href=" " className={classes.cardTitle}>
              <font color="white"> MARKET SHARE </font>
                <br />
              </a>

              <CardBody>
               <h3> <p className={classes.description}>
                Leverage your market share
                </p> </h3> 
              </CardBody>

            </Card>
          </GridItem>
       
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ growth } className={ imageClasses } alt="sales" />
              </GridItem>
              <a href=" " className={classes.cardTitle}>
              <font color="white">  GROWTH </font>
                <br />
              </a>

              <CardBody>
               <h3> <p className={classes.description}>
                Accelerate your business's growth rate
                </p>  </h3>
              </CardBody>

            </Card>
          </GridItem>


          &nbsp; &nbsp;  &nbsp; &nbsp;
          &nbsp; &nbsp;  &nbsp; &nbsp;
          &nbsp; &nbsp;  &nbsp; &nbsp;
          &nbsp; &nbsp;  &nbsp; &nbsp;
          &nbsp; &nbsp;  &nbsp; &nbsp;
          &nbsp; &nbsp;  &nbsp; &nbsp;
          &nbsp; &nbsp;  
        
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ conversion } className={ imageClasses } alt="sales"  />
              </GridItem>
              <a href=" " className={classes.cardTitle}>
              <font color="white"> CONVERSION </font>
                <br />
              </a>

              <CardBody>
               <h3> <p className={classes.description}>
                Invest on high potential conversions
                </p>  </h3>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={ reach } className={ imageClasses } alt="sales" />
              </GridItem>
              <a href=" " className={classes.cardTitle}>
              <font color="white">  REACH </font>
                <br />
              </a>
              <CardBody>
                <h3> <p className={classes.description}>
                Reach out to your customers in the nook and corner
                </p> 
                </h3>
              </CardBody>

            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
