import React, {useState,useContext,useEffect} from 'react';
import { MDBDataTable } from 'mdbreact';
import CouponService from '../../services/CouponService';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
const useStyles = makeStyles(styles);
const CouponItem = () => {

  const [coupons,setCoupons] = useState([]);

  const data = {
    columns: [
      {
        label: 'Id',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Coupon',
        field: 'couponTitle',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Description',
        field: 'couponDescription',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Number',
        field: 'noOfCoupons',
        sort: 'asc',
        width: 100
      },  
      {
        label: 'Availed',
        field: 'couponAvailed',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Start date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Value',
        field: 'amount',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Type',
        field: 'type',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 100
      }
    ],
    rows: coupons
  };
  useEffect(()=>{
        CouponService.getCoupons().then(data =>{
            console.log('here');
            console.log(data);
            setCoupons(data.coupon);
            //console.log(products);
        });
    },[]);


  return (
      
<section>
    <MDBDataTable
     primary
      striped
      bordered
      small
      data={data}
    />
    
    </section>
    );
  }

 export default CouponItem;