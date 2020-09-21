import React, {useState,useContext,useEffect} from 'react';
import { AuthContext } from '../Context/AuthContext';
import AuthService from '../services/AuthService';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinksDashboard.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "./apiBg.jpg";

const useStyles = makeStyles(styles);

export default function SignIn(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

    const [credential,setCredential] = useState({ apikey : "" });
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(()=>{
        AuthService.getKey().then((data) =>{
            console.log('here');
            console.log(data.apikey);
            setCredential(data);
            //console.log(products);
        });
    });
    const onClick = e =>{
        AuthService.generateKey().then(data =>{
            //const { message } = data;
            //resetForm();
            if(!data.msgError){
                AuthService.getKey().then(getData =>{
                    setCredential (getData);
                    setMessage(message);
                });
            }
            else if(message.msgBody === "UnAuthorized"){
                setMessage(message);
                authContext.setUser({username : "", role : ""});
                authContext.setIsAuthenticated(false);
            }
            else{
                setMessage(message);
            }
        });
    }




  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="BAE"
        rightLinks={<HeaderLinks/>}
        {...rest}
      />

      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "1350px 750px"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> API KEY CONSOLE </h4>
                  </CardHeader>
                  <p className={classes.divider}>  </p>
                  <CardBody>
                      <h4>API KEY :  <br />{ credential.apikey }</h4>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg" onClick={ onClick }>
                      GET NEW KEY
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
