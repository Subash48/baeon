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

let s = 0;

/*jshint esversion: 6 */
// const paymentHandler = async (e) => {
//   const API_URL = '/'
//   e.preventDefault();
//   const orderUrl = '/api/order'
//   const response = await axios.post(orderUrl,{
//     amount : 100
//   });
//   const { data } = response;
//   const options = {
//     key: 'rzp_test_KNoCu64wQKXO55',
//     name: "BAEON",
//     description: "We find the best discounts for you",
//     order_id: data.id,
//     handler: async (response) => {
//       try {
//        const paymentId = response.razorpay_payment_id;
//        const url = `${API_URL}api/capture/${paymentId}`;
//        const captureResponse = await axios.post(url, {})
//        console.log(captureResponse.data);
//       } catch (err) {
//         console.log(err);
//       }
//     },  theme: {
//       color: "#686CFD",
//     },
//   };
//   const rzp1 = new window.Razorpay(options);
//   rzp1.open();};


const data = [
  {
    id: 1,
    name: "Merchant store",
    latitude: "40.6710729",
    longitude: "-73.9988001",
    circle: {
      radius: 3000,
      options: {
        strokeColor: "#ff0000"
      }
    }
  }
] ;


class Card extends React.Component {
  render() {
    return (<div className="card">
      <font color="black">
      {this.props.children}
      </font>
      </div>)
  }
}

class SelectableCard extends React.Component {

  render() {
    var isSelected = this.props.selected ? "selected" : "";
    var className = "selectable " + isSelected;
    return (
      <Card>
        <div className={className} onClick={this.props.onClick}>
         <font color="black">{this.props.children} </font>
          <div className="check"><span className="checkmark">
          <font color="black">  ✔ </font>
            </span></div>
        </div>
      </Card>
    );
  }
}

class SelectableTitleCard extends React.Component {

  render() {
    var {
      id,
      businessName,
      amount,
      selected
    } = this.props;
    return (
      <SelectableCard onClick={this.props.onClick}
        selected={selected}>
        <div className="content">
          <h3 className="title">{businessName}</h3>
          <h3 className="description">{ amount }</h3>
        </div>
      </SelectableCard>
    );
  }
}

class SelectableCardList extends React.Component {

  constructor(props) {
    super(props);
    var selected = props.multiple ? [] : -1;
    var initialState = {
      selected: selected
    };
    this.state = initialState;
  }

  onItemSelected(index) {
    this.setState((prevState, props) => {
      if (props.multiple) {
        var selectedIndexes = prevState.selected;
        var selectedIndex = selectedIndexes.indexOf(index);
        if (selectedIndex > -1) {
          selectedIndexes.splice(selectedIndex, 1);
          props.onChange(selectedIndexes);
        } else {
          if (!(selectedIndexes.length >= props.maxSelectable)) {
            selectedIndexes.push(index);
            props.onChange(selectedIndexes);
          }
        }
        return {
          selected: selectedIndexes
        };
      } else {
        props.onChange(index);
        return {
          selected: index
        }
      }
    });
  }

  render() {
    var {
      contents,
      multiple
    } = this.props;

    var content = contents.map((cardContent, i) => {
      var {
        id,
        businessName,
        amount,
        selected
      } = cardContent;
      var selected = multiple ? this.state.selected.indexOf(i) > -1 : this.state.selected == i;
      return (
        <SelectableTitleCard key={i}
          id={id} businessName={businessName} amount={amount}
          selected={selected}
          onClick={(e) => this.onItemSelected(i)} />
      );
    });
    return (<div className="cardlist">{content}</div>);
  }
}

class Advertisers extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selected : 0
    }
  }
  onListChanged(selected) {
    console.log(selected);
    s=selected;
    this.setState({
      selected: selected
    });

  }
  submit() {
    window.alert("Selected: " + this.state.selected);
  }
  render() {
    return (
      <div className="column">
          <h1 className="title"><font color="black">{this.props.title} </font> </h1>
          <SelectableCardList
            multiple={this.props.multiple}
            maxSelectable={this.props.maxSelectable}
            contents={this.props.cardContents}
            onChange={this.onListChanged.bind(this)}
            selected ={ this.state.selected}/>
      </div>);
  }
}


const dashboardRoutes = [];

export default function WorkSection(props) {
  const classes = useStyles();
  const { ...rest } = props;


    const [price,setPrice] = React.useState({
      couponValue : 0,
      productPrice : 0,

    });

    const [products,setProducts] = React.useState([]);
    const [advertisers,setAdvertisers] = React.useState([]);
    const [msg,setMsg] = React.useState("");

    const [coupon,setCoupon] = React.useState({
      couponTitle : "",
      couponDescription : "",
      couponNumber : 10,
      isPercent : "Discount",
      offerValue : 5,
      couponPeriod : "",
      product : "",
      radius : 2000,
      lat : 13.067439,
      long : 80.237617,
      advertiser : "",
      amount : 0
   });

  const compute = (pro) =>{
      var couponValue=0;
      console.log('select'+s);
      console.log('Value check');
      if(coupon.isPercent === "Flat Money")
      {
        couponValue = coupon.offerValue;
      }

      else {
      couponValue =  Number((coupon.offerValue*price.productPrice)/100);

      }

      var calcPrice =0;
      calcPrice = Number(couponValue*coupon.couponNumber/100 + (couponValue*coupon.couponNumber/10) + (coupon.radius/1000)*((couponValue*2.5*coupon.couponNumber)/100) );
      console.log(calcPrice);
      console.log( (couponValue*coupon.couponNumber/10) )
      //let merchs = merchants;
      let merc = [];
      // merchs.forEach((merch)=>{
      //
      //
      //   merch.amount = Number((Number(merch.basePrice * price.productPrice * coupon.couponNumber)/100) + calcPrice);
      //   merc.push(merch)
      //
      //  //console.log(merch);
      //  });
      // setMerchants(merc);
       console.log(merc);
       //setCoupon(...coupon,{ amount : 1});

  }

  const paymentHandler = async (e) => {
    //compute();
    console.log('here');
    console.log(advertisers[s].id);
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

  const onSubmit = e =>{
    console.log(e);
  }
  const handleChange = e =>{
    setCoupon({...coupon,[e.target.name] : e.target.value});
    console.log(price);
  };

  const handleRadius = e =>{

    setCoupon({...coupon,[e.target.name] : e.target.value});
  };

  const handleValue = e =>{


    console.log(e);
    setCoupon({...coupon,[e.target.name] : e.target.value});
  };

  const handleNos = e =>{

    console.log(e);
    setCoupon({...coupon,[e.target.name] : e.target.value});
    let data= {
      noOfCoupons : coupon.couponNo
    };
    ProductService.computePrice().then(data =>{
        console.log('here');
        setAdvertisers(data.advertisers);
        console.log(data.advertisers);
        console.log(coupon);
                  //console.log(products);
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  const handleNo = e =>{

    console.log(e);
    setCoupon({...coupon,[e.target.name] : e.target.value});
  };
  const [state, setState] = React.useState({
      columns: [
        { title: 'Product ID', field: 'id' , type:'numeric' },
        { title: 'Name', field: 'productName' },
        { title: 'Stock', field: 'stock'},
        { title: 'Unit Price', field: 'unitPrice'},
      ],
    });
    useEffect(()=>{
      ProductService.getProductsByApi().then(data =>{
          console.log('here');
          console.log(data);
          setProducts(data.products);
          setAdvertisers(data.advertisers);
          console.log(data.advertisers);
          setCoupon({ ...coupon,lat : data.lat  , long : data.long})
          console.log(coupon);
                    //console.log(products);
      });

  },[]);

  const promotions = [
    {
      value: 'Discount',
      label: 'Discount',
    },
    {
      value: 'Flat Money',
      label: 'Flat Money',
    },
  ];



  return (


    <div className={classes.section}>
          <h2 className={classes.title}>  Add coupon here </h2>
          <h3 className={classes.description}>        </h3>


        <MaterialTable
          title="SELECT ONE PRODUCT"
          columns={state.columns}
          data={products}
          options={{
            selection: true,

        }}
          onSelectionChange={ async (rows) => {


               console.log(rows);
               console.log(rows.length);
               if(rows.length === 0 )
               {
                 console.log('Unselect');
                 await setCoupon({ ...coupon,product : ""});
                 await setPrice({ ...price, productPrice : 0});
                 const response = await compute(0);
               }
               else if(rows.length === 1){
                 console.log(rows[0].unitPrice);
                 await setCoupon({ ...coupon,product : rows[0].id});
                 await setPrice({ ...price, productPrice : Number(rows[0].unitPrice)});
                 console.log('work');
                 const response = await compute(Number(rows[0].unitPrice));
               }
               else{
                 console.log('all');
                 await setCoupon({ ...coupon,product : ""});
                 await setPrice({ ...price, productPrice : 0});
                 const response = await compute(0);

               }
              //  if(rows.length === 0 )
              // {
              //  //console.log(rows )
              //  //changeState(rows[0].id,rows[0].unitPrice);
              //  setCoupon({ ...coupon,product : ""});
              //  setPrice({ ...price, productPrice : 0});
              //  //console.log(price);
              //
              // }
              //  else
              //  {
              //    //console.log(rows);
              //    //console.log('here');
              //
              //  setCoupon({ ...coupon,product : rows[0].id});
              //  setPrice({ ...price, productPrice : rows[0].unitPrice });
              //  compute();
              //  }

          }}
        />
        <br/>



            <div className={classes.section}>

<GridContainer justify="center">
  <GridItem cs={12} sm={12} md={8}>
    <h2 className={classes.title}> Post Coupon details here </h2>
    <h3 className={classes.description}>


  </h3>
    <form onSubmit = { onSubmit }>
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
                  onChange={handleNo}
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
        <GridItem>
        <TextField
                  label="Offer Value"
                  id="offerValue"
                  name="offerValue"
                  value={ coupon.offerValue }
                  onChange={handleValue}
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

      {/*}  <GridItem>
               <InputLabel id="isPercent-label">Type of promotion</InputLabel>
                <Select
                  labelId="isPercent-label"
                  id="isPercent"
                  name="isPercent"
                  value={coupon.isPercent}
                  label="isPercent"
                  onChange={handleChange}
                  labelText="Type of Promotion"
                  formControlProps={{
                    fullWidth: true,
                  }}
                >
                <MenuItem value="">
                  <em>None</em>
                 </MenuItem>
                 <MenuItem value={"Discount"}>Discount</MenuItem>
                  <MenuItem value={"Flat Money"}>Flat Money</MenuItem>
                </Select>
                </GridItem> */}

              <br/>

        <GridItem >
        <TextField
                  label="Radius of reach"
                  id="radius"
                  name="radius"
                  value={ coupon.radius }
                  onChange={ handleRadius }
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
        <br/>

    		<GridItem >

        <TextField
          select
          id="isPercent"
          name="isPercent"
          value={coupon.isPercent}
          label="Type of Promotion"
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select the type of promotion"
        >
          {promotions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

        </TextField>

        </GridItem>
      </GridContainer>

    </form>
  </GridItem>
  <GridItem>
               <center> <Button color="info" onClick= { handleNos }> Compute Price </Button> </center>
   </GridItem>
</GridContainer>
</div>

             <GridContainer justify="center">
                 <Advertisers title=" Pick Advertiser Host !" cardContents={advertisers}
                />
             </GridContainer>


              <br/>
              <br/>

     {/* MAP component  */}
      <Map
      center={{ lat: coupon.lat, lng: coupon.long }}
      zoom={12}
      places={data}
      radius= {Number(coupon.radius)}
      latitude= {Number(coupon.lat)}
      longitude= { Number(coupon.long)}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvejVF1YsJGLKOYqJVkbMy9sgGX29XBy8"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      />

<br/>
<br/>

   <GridItem>
                <center> <Button color="info" onClick= { paymentHandler }> Pay now </Button> </center>
    </GridItem>

    </div>
  );
}
