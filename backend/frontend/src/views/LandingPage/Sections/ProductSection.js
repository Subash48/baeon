import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Focus from '@material-ui/icons/FilterCenterFocus';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";


const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}> <font color="#FFD700"> CULTURE AND VALUES </font>
              </h2>
          <h4 className={classes.description}>
          <br/>
<br />
<font color="white"> 

<h3>
 Our prosperity and progress are built on the spirit of entrepreneurship, innovation, and a staunch focus on meeting the needs of our customers.
 </h3> </font> 

  <br/>

<br/>
<h3>


<font color="#FFD700">We believe that a strong sense of shared values enables us to maintain a common company culture and community, no matter how large we are. </font> <br/>
</h3>
<br/>
          </h4>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>

          <GridItem xs={12} sm={12} md={6}>
            <InfoArea
              title="OUR VALUES"
              description=" Passion is at the heart of our company and we move persistently to the core of innovation and to a better future. 
              "
              icon={VerifiedUser}
              iconColor="white"
              vertical
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>  

            <InfoArea
              title="OUR FOCUS"
              description="We build responsible and honest relationships with communication that pursue growth and learning.
              "
              icon={ Focus }
              iconColor="white"
              vertical
            />
          </GridItem>

        </GridContainer>
      </div>
    </div>
  );
}
