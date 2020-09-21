import React, {useState,useContext,useEffect} from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
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

import ProductService from '../services/ProductService';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import AuthService from '../services/AuthService';
import {AuthContext} from '../Context/AuthContext';
import image from "./prod.jpg";
import { TextField } from '@material-ui/core';
import { EmailRounded } from '@material-ui/icons';

const useStyles = makeStyles(styles);

  const Products = props =>{

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;


    const [product,setProduct] = useState({
                                    productName : "",
                                    productDesc : "",
                                    stock : "",
                                    unitPrice : ""
                                });
    const [products,setProducts] = useState([]);
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    
    useEffect(()=>{
        ProductService.getProducts().then(data =>{
            console.log('here');
            console.log(data);
            setProducts(data.product);
            //console.log(products);
        });
    },[]);

    const onSubmit = e =>{
        e.preventDefault();
        ProductService.postProduct(product).then(data =>{
            //const { message } = data;
            resetForm();
            if(!data.msgError){
                ProductService.getProducts().then(getData =>{
                    setProducts(getData.product);
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

    const onChange = e =>{
        setProduct({...product,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setProduct({
            productName : "",
            productDesc : "",
            stock :       "",
            unitPrice :   ""
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
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={onSubmit} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4> PRODUCTS </h4>
                  </CardHeader>
                  <p className={classes.divider}>  </p>
                  <CardBody>
                   
                <div style={{position: 'relative', display: 'inline-block'}}>  
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 25}}/>
                  
                    <TextField
                      label="Product Name"
                      id="productName"
                      name="productName"
                      onChange={onChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />
                    </div>

                      <br/>
                      <br/>

                <div style={{position: 'relative', display: 'inline-block'}}>  
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 25}}/>
                    <TextField
                      label="Product Description"
                      id="productDesc"
                      name="productDesc"
                      onChange={onChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        autoComplete: "off"
                      }}
                    />
                  </div>

                  <br/>
                      <br/>


                <div style={{position: 'relative', display: 'inline-block'}}>  
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 25}}/>
                    <TextField
                      label="Stock"
                      id="stock"
                      name="stock"
                      onChange={onChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        autoComplete: "off"
                      }}
                    />
                  </div>

                  <br/>
                  <br/>


                  <div style={{position: 'relative', display: 'inline-block'}}>  
                  <Email style={{position: 'relative', left: 10, top: 15, width: 25, height: 35, marginRight: 25}}/>
                    <TextField
                      label="Unit Price"
                      id="unitPrice"
                      name="unitPrice"
                      onChange={onChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        autoComplete: "off"
                      }}
                    />
                  </div>
                  <br/>
                      <br/>

                  
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      SUBMIT
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
export default Products;