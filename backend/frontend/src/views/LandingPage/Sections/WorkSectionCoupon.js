import React,{useState,useEffect, Fragment}  from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import selector from "../../../assets/scss/selector.scss";

// @material-ui/icons
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle 
} from "react-google-maps";
// core components
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MaterialTable from 'material-table';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/WorkStyleCoupon.js";
import { TextField } from '@material-ui/core';
import ProductService from "views/services/ProductService";
import GoogleMapReact from 'google-map-react';
import Map from './map';
import { Computer } from "@material-ui/icons";

const useStyles = makeStyles(styles);

let s = 0 ;

export default function WorkSection(props) {

  const classes = useStyles();
  const { ...rest } = props;


  const [advertisers,setAdvertisers] = React.useState([]);
  const [msg,setMsg] = React.useState("");

  const [coupon,setCoupon] = React.useState({
    couponTitle : "",
    couponDescription: "",
    couponNumber : 10,
    advertiser  : "",
    amount : 0
  });

  const paymentHandler = async (e) => {
    //compute();
    console.log('here');
    console.log(coupon);
    const API_URL = '/'
    e.preventDefault();
    const orderUrl = '/api/order'
    const response = await axios.post(orderUrl,{
      advertiser : advertisers[s].id,
      amount : advertisers[s].amount,
      coupon : coupon
    }, { headers: {
    'content-type': 'application/json'
  }});
    const { data } = response;
    console.log(data);
    const options = {
      key: 'rzp_test_KNoCu64wQKXO55',
      name: "BAEON",
      description: "We find the best discounts for you",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}api/capture/${paymentId}`;
         const captureResponse = await axios.post(url, {      amount : advertisers[s].amount
         });
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },  theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();};


  const handleChange = e =>{
    setCoupon({...coupon,[e.target.name] : e.target.value});
  };

  const handleNo = e =>{

    console.log(e);
    setCoupon({...coupon,[e.target.name] : e.target.value});
    let data= {
      noOfCoupons : (e.target.value === undefined? 0 : e.target.value)
    };
    console.log(data)

    ProductService.computePrice(data).then(out =>{
        console.log('here2'+out);
        setAdvertisers(out.advertisers);
        
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const [state, setState] = React.useState({
    columns: [
      { title: 'Advertiser Name', field: 'businessName' , type:'numeric' },
      { title: 'Fee', field: 'amount' },
    ],
  });

  useEffect(()=>{
    let data= {
      noOfCoupons : (coupon.couponNumber === undefined? 0 : coupon.couponNumber)
    };
    console.log(data)

    ProductService.computePrice(data).then(out =>{
        console.log('here2'+out);
        setAdvertisers(out.advertisers);
        
    })
    .catch((err)=>{
      console.log(err);
    })

},[]);
  return (
    
    // <div className={classes.section}>
    //       <h2 className={classes.title}>  Add coupon here </h2>
    //       <h3 className={classes.description}>        </h3>


    <div className={classes.section}>

<GridContainer justify="center">
  <GridItem cs={12} sm={12} md={8}>
    <h2 className={classes.title}> Post Coupon details here </h2>
    <h3 className={classes.description}>


  </h3>
    <form onSubmit = { handleNo }>
      <GridContainer>

        <GridItem>
              <TextField
                  label="Title of the coupon"
                  id="couponTitle"
                  name="couponTitle"
                  value= { coupon.couponTitle }
                  className = {classes.textField}
                  margin ="normal"
                  borderBottomColor="white"
                  onChange={ handleChange }
                  formControlProps={{
                    fullWidth: true
                  }}
                  InputProps={{
                    className: classes.input,
                    className : classes.label,
                }}
                />
        </GridItem>

        <br/>
        <br/>
        <br/>

        <GridItem>

        <TextField
                  label="Description of the coupon"
                  id="couponDescription"
                  name="couponDescription"
                  value={coupon.couponDescription}
                  onChange={ handleChange }
                  className = {classes.textField}

                  InputProps={{
                    className: classes.input,
                    className : classes.label,
                    borderBottomColor: "white"
                }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
        </GridItem>


        <br/>
        <br/>
        <br/>

        <GridItem >
        <TextField
                  label="Number of Coupons"
                  id="couponNumber"
                  name="couponNumber"
                  type="number"
                  value={coupon.couponNumber}
                  onChange={ handleNo }
                  className = {classes.textField}
                  InputProps={{
                    className: classes.input,
                    className : classes.label,
                    borderBottomColor: "white"
                }}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
<br/>
          <br/>
        <br/>
        <br />
        </GridItem>

          
        <br/>
        <GridItem cs={8} sm={16} md={8}>

        <MaterialTable
          title="SELECT ADVERTISER"
          columns={state.columns}
          data={advertisers}
          options={{
            selection: true,

        }}
          onSelectionChange={ async (rows) => {

            if(rows.length === 0 )
            {
              console.log('Unselect');
            }
            else if(rows.length === 1){
              s = 0;
              console.log(rows[0]);
              setCoupon({...coupon, amount : rows[0].amount , advertiser : rows[0].id});

            }
            else{

              console.log(rows);
              setCoupon({...coupon, amount : 0 , advertiser : "" });

            }

          }}
        />

        </GridItem>
        
      </GridContainer>

    </form>
    <br /><br />
  </GridItem>

   
</GridContainer>


            
   <GridItem>
                <center> <Button color="info" onClick= { paymentHandler }> Pay now </Button> </center>
    </GridItem>
    </div>

  );
}