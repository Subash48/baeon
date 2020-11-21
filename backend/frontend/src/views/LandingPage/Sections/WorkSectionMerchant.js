import React, { useState,useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AuthService from '../../services/AuthService.js';
import Map from './map';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/MerchantStyle.js";
import { TextField } from '@material-ui/core';
const useStyles = makeStyles(styles);

const data = [
  {
    id: 1,
    name: "Merchant store",
    latitude: "40.6710729",
    longitude: "-73.9988001",
    //circle: {
      //radius: 3000,
      //options: {
        //strokeColor: "#ff0000"
     // }
    }
 // }
] ;


export default function WorkSection(props) {

  const [user,setUser] = useState(
    {
        firstName: " ",
        lastName: " ",
        businessName: " ",
        businessEmail: " ",
        businessPhone: 0,
        businessPhoneExtension: 0,
        businessAddress_1: " ",
        businessAddress_2: " ",
        city: "Chennai",
        state: "Tamilnadu",
        zipCode: 0,
        country: "India",
        basePrice : 0,
       // baseType : "Percentage",
        // baseReturn : 0,
        lat : 27.9878,
        long : 86.9250
    });

const onChange = e =>{
    setUser({...user,[e.target.name] : e.target.value});
}

const onSubmit = e =>{
    e.preventDefault();
    console.log(user);
    AuthService.addMerchant(user).then(data=>{
        console.log(data);
        window.alert('Account elevated to merchant status');
    });
}


//get lat long
 useEffect(() => {
  navigator.geolocation.getCurrentPosition(function(position) {
    setUser({ ...user, lat: position.coords.latitude, long: position.coords.longitude })

  })
 });

const promotions = [
  {
    value: 'Percentage',
    label: 'Percentage',
  },
  {
    value: 'Flat Money',
    label: 'Flat Money',
  },
];
const classes = useStyles();

  return (


    <div className={classes.section}
     >
     
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}> <font color="black">Add Merchant Details </font> </h2>
          <h3 className={classes.description}>
        </h3>
          <form onSubmit={onSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>




              <TextField
                      label="First name"
                      id="firstName"
                      name="firstName"
                      style = {{width: "230px"}}
                      onChange={ onChange }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />



              </GridItem>
              <GridItem xs={12} sm={12} md={6}>

              <TextField
                      label="Last name"
                      id="lastName"
                      name="lastName"
                      style = {{width: "230px"}}
                      onChange={ onChange }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />

              </GridItem>


              <GridItem xs={12} sm={12} md={6}>

              <TextField
                      label="Business name"
                      id="businessName"
                      name="businessName"
                      style = {{width: "230px"}}
                      onChange={onChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />
              </GridItem>


              <GridItem xs={12} sm={12} md={6}>

              <TextField
                      label="Business email"
                      id="businessEmail"
                      name="businessEmail"
                      style = {{width: "230px"}}
                      onChange={ onChange }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                      }}
                    />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
              <TextField
                      label="Business phone"
                      id="businessPhone"
                      name="businessPhone"
                      style = {{width: "230px"}}
                      onChange={ onChange }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "Number",
                      }}
                    />
              </GridItem>

              <GridItem xs={12} sm={12} md={6} >

              <TextField
                      label="Phone extension"
                      id="businessPhoneExtension"
                      name="businessPhoneExtension"
                      style = {{width: "230px"}}
                      onChange={ onChange }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "Number",
                      }}
                    />

              </GridItem>
              <GridItem  xs={12} sm={12} md={6} >


              <TextField
                      label="Business address1"
                      id="businessAddress_1"
                      name="businessAddress_1"
                      style = {{width: "230px"}}
                      onChange={ onChange }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />
              </GridItem>

              <GridItem  xs={12} sm={12} md={6} >


              <TextField
                      label="Business address2"
                      id="businessAddress_2"
                      name="businessAddress_2"
                      style = {{width: "230px"}}
                      onChange={ onChange }
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                      }}
                    />
              </GridItem>

              <GridItem  xs={12} sm={12} md={6} >
               <TextField
                       label="City"
                       id="city"
                       name="city"
                       style = {{width: "230px"}}
                       onChange={ onChange }
                       formControlProps={{
                         fullWidth: true
                       }}
                       inputProps={{
                         type: "text",
                       }}
                     />
               </GridItem>

               <GridItem  xs={12} sm={12} md={6} >

               <TextField
                       label="State"
                       id="state"
                       name="state"
                       style = {{width: "230px"}}
                       onChange={ onChange }
                       formControlProps={{
                         fullWidth: true
                       }}
                       inputProps={{
                         type: "text",
                       }}
                     />
               </GridItem>

               <GridItem  xs={12} sm={12} md={6} >

               <TextField
                       label="Zipcode"
                       id="zipcode"
                       name="zipCode"
                       style = {{width: "230px"}}
                       onChange={ onChange }
                       formControlProps={{
                         fullWidth: true
                       }}
                       inputProps={{
                         type: "text",
                       }}
                     />
               </GridItem>

               <GridItem  xs={12} sm={12} md={6} >

               <TextField
                       label="Country"
                       id="country"
                       name="country"
                       style = {{width: "230px"}}
                       onChange={ onChange }
                       formControlProps={{
                         fullWidth: true
                       }}
                       inputProps={{
                         type: "text",
                       }}
                     />
               </GridItem>

       {/* <GridItem  xs={12} sm={12} md={4} >

              <TextField
                  select
                  id="baseType"
                  name="baseType"
                  style = {{width: "230px"}}
                  value={user.baseType}
                  label="Type of Conversion fee"
                  onChange={ onChange }
                  SelectProps={{
                      native: true,
                  }}
                  helperText="Please select the type of conversion fee"
              >
          {promotions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

        </TextField>
        </GridItem>
        <br/>

        <GridItem  xs={12} sm={12} md={4} >

        <TextField
            label="Availed coupon fee"
            id="basePrice"
            name="basePrice"
            style = {{width: "230px"}}
            onChange={ onChange }
            formControlProps={{
            fullWidth: true
          }}
            inputProps={{
            type: "Number",
        }}
        />
        </GridItem>


        <GridItem  xs={12} sm={12} md={4} >

        <TextField
          label="Non-availed coupon fee"
          id="baseReturn"
          name="baseReturn"
          style = {{width: "230px"}}
          onChange={ onChange }
          formControlProps={{
          fullWidth: true
          }}
          inputProps={{
          type: "Number",
          }}
          />
        </GridItem> */}
                      <br/>
                      <br/>
                      <br/>
              &nbsp;
              &nbsp;
              <GridItem >
                <br/>
                <center>
                <Button type="submit" color="primary"> Become a Merchant </Button>
                </center>
              </GridItem>
            </GridContainer>
          </form>



        </GridItem>
      </GridContainer>

     {/* <Map
      center={{ lat: Number(user.lat) , lng:  Number(user.long) }}
      zoom={12}
      places={data}
      latitude= { Number(user.lat) }
      longitude= {  Number(user.long) }
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvejVF1YsJGLKOYqJVkbMy9sgGX29XBy8"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
     /> */}

    </div>
  );

}
