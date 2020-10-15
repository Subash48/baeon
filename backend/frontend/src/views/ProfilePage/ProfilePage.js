import React, {useState,useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainerProfile.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinksDashboard.js";
import Parallax from "components/Parallax/Parallax.js";
import profile from "./Ico.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import AuthService from '../services/AuthService';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

    const [ account,setAccount] = useState({
                businessName : "",
                firstName : "",
                lastName : "",
                businessEmail : "",
                businessPhone : "",
                businessAddress_1 : "",
                businessAddress_2 : "",
                city : "",
                state : "",
                zipCode : "",
                basePrice : ""   });


    useEffect(()=>{
        AuthService.getProfile().then((data) =>{
            console.log('here');
            console.log(data.profile);
            setAccount(data.profile);
            //console.log(products);
        });
    });


  return (
    <div>
      <Header
        color="transparent"
        brand="Merchant Profile"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />

      <Parallax small filter image={require("./bg2.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h6><font color="white">

                     {/* { account.city } , { account.state },  { account.zipCode} */}
                    </font></h6>


                    <p> <font color="white">
                    {/* { account.firstName }  , { account.lastName  } ,  { account.businessEmail}, { account. businessAddress_1 },
                    { account. businessAddress_2 } */}

              {" "}
              <div>
              First Name : { account.firstName }<br /><br/>
              </div>
              <div>
              Last Name : { account.lastName }<br /><br />
              </div>
              <div>
              Business Name : { account.businessName }<br /><br />
              </div>
              <div>
              Business email : { account.businessEmail }<br /><br />
              </div>
              <div>
              Business Phone : { account.businessPhone }<br /><br />
              </div>
              <div>
              Business Address 1 : { account.businessAddress_1 }<br /><br />
              </div>
              <div>
              Business Address 2 : { account.businessAddress_2 }<br /><br />
              </div>
              <div>
              City  : { account.city }<br /><br />
              </div>
              <div>
              Zip code : { account.zipCode }<br /><br />
              </div>
                </font>
              </p>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
