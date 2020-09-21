import React, {useState ,useEffect} from 'react';
import { MDBDataTable } from 'mdbreact';
import CouponService from '../services/CouponService';

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
        field: 'startDate',
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
        console.log('iam');
        CouponService.getCoupons().then(data =>{
            console.log('here');
            console.log(data);
            setCoupons(data.coupon);
            //console.log(products);
        });
    },[]);


  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />);
  }

 export default CouponItem;