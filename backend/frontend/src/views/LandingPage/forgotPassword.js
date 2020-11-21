import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import AuthService from '../services/AuthService';
import image from "./reset.JPG";
import { TextField } from '@material-ui/core';
import Message from "./Sections/Messages.js";

const useStyles = makeStyles(styles);


  const ForgotPassword = props=>{
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
    const [user,setUser] = useState({email: ""});
    const [ message,setMessage] = useState("");
    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.forgot(user).then(data=>{
            console.log(data);
            const { message} = data;
            setMessage(message);
        });
    }
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="BAE"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={onSubmit} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> Forgot your password ?</h4>
                  </CardHeader>
                  <p className={classes.divider}>  </p>
                  <CardBody>

                <div style={{position: 'relative', display: 'inline-block'}}>
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 25}}/>

                    <TextField
                      label="EMAIL ID"
                      id="email"
                      name="email"
                      onChange={onChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                      }}
                    />
                    </div>

                      <br/>
                      <br/>

                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Send Password Reset Link
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
export default ForgotPassword;
