import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyleAbout.js";
const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2 className={classes.title}> Our Values include </h2>
      <div>
        <GridContainer>

          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
             {/*}   <img src={ customer } alt="..." className={imageClasses} />  */}
              </GridItem>
              <h3 className={classes.cardTitle}>

              CUSTOMER  

                <br />
                <big className={classes.smallTitle}> Be our first priority. <br/>
                Committed to hearts and minds!
              </big>
              </h3>
              <CardBody>
                <p className={classes.description}>
                 
                </p>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
              {/* <img src={  quality } alt="..." className={imageClasses} /> */}
              </GridItem>
              <h3 className={classes.cardTitle}>
              QUALITY
                <br />
                <big className={classes.smallTitle}> What we do, we do well, and 
                <br/> we keep working to be the best and achieve. </big>
 
              </h3>
              <CardBody>
                <p className={classes.description}>
                </p>
              </CardBody>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
              {/*} <img src={ integrity } alt="..." className={imageClasses} /> */}
              </GridItem>
              <h3 className={classes.cardTitle}>
              INTEGRITY

                <br />
                <big className={classes.smallTitle}>
                   We wish our people to be straightforward and <br/>open minded. 
                Keep it simple!
</big>
              </h3>
              <CardBody>
               
              </CardBody>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
            {/*}  <img src={ innovation  } alt="..." className={imageClasses} /> */}
              </GridItem>
              <h3 className={classes.cardTitle}>
              EMBODIED CHANGES
                <br />
                <big className={classes.smallTitle}> In this fast-moving world, we are consistent, 
                innovative and ready to adapt to new business conditions in order to be persistent.</big>
              </h3>
              <CardBody>
               
              </CardBody>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
  {/*  <img src={ passion  } alt="..." className={imageClasses} />  */}
              </GridItem>
              <h3 className={classes.cardTitle}>
              PASSION

                <br />
                <big className={classes.smallTitle}> We require our people to be bold and courageous through entrepreneurial risk to reach boundaries, 
                experiment with consistent honesty and 
                thus be genuine to the community. 
                we believe in people, we never give up.

</big>
              </h3>
              <CardBody>
               
              </CardBody>
            </Card>
          </GridItem>


          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
              {/* <img src={ commitment} alt="..." className={imageClasses} /> */}
              </GridItem>
              <h3 className={classes.cardTitle}>
              COMMITMENT

                <br />
                <big className={classes.smallTitle}> 
                We persuade our people to create a culture of warm respect where 
                everyone is welcome and determined with an entrepreneurial spirit and c
                ost consciousness which creates excellence.

                </big>
              </h3>
              <CardBody>
               
              </CardBody>
            </Card>
          </GridItem>

        </GridContainer>
      </div>
    </div>
  );
}