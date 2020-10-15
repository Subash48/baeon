
import React from 'react';
import { MDBDataTable } from 'mdbreact';

const ProductItem = props => {

  //const [products,setProducts] = useState([]);

  const data = {
    columns: [
      {
        label: 'Id',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Product',
        field: 'productName',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Description',
        field: 'productDesc',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Stock',
        field: 'stock',
        sort: 'asc',
        width: 100
      },  
      {
        label: 'Unit Price',
        field: 'unitPrice',
        sort: 'asc',
        width: 100
      },

    ],
    rows: props.products
  };
//   useEffect(()=>{
//         CouponService.getCoupons().then(data =>{
//             console.log('here');
//             console.log(data);
//             setCoupons(data.coupon);
//             //console.log(products);
//         });
//     },[]);


  return (
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />);
  }

 export default ProductItem;