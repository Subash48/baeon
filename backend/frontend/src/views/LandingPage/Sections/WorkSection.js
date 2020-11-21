import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
const useStyles = makeStyles(styles);


export default function WorkSection(props) {
  const classes = useStyles();

  return (


    <div className={classes.section}>

      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}> we'll reach you soon !</h2>
          <h3 className={classes.description}>
           

        </h3>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                  labelText="First Name"
                  id="firstName"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Last Name"
                  id="lastName"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>


              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Job Title"
                  id="jobTitle"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>

                
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Company"
                  id="company"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>


              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Business Email"
                  id="businessEmail"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
                  
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Phone"
                  id="phone"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>

              <GridItem >
                <CustomInput
                  labelText="Your Interest in BAE"
                  id="interest"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem>
                <CustomInput
                  labelText="What defines your venture the best ?"
                  id="defineCompany"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>

              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 4
                }}
              />

              
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary">Send Message</Button>
              </GridItem>
              
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
