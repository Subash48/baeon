import React from 'react';
import MaterialTable from 'material-table';

export default function AddCoupon() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id' , type:'numeric' },
      { title: 'COUPON', field: 'couponTitle' },
      { title: 'DESCRIPTION', field: 'couponDescription'},
      { title: 'NUMBER', field: 'noOfCoupons'},
      { title: 'AVAILED', field: 'couponAvailed'},
      { title: 'START DATE', field: 'date' , type: 'date'},
      { title: 'VALUE', field: 'amount'},
      { title: 'TYPE', field: 'type'},
      { title: 'STATUS', field: 'status'},
    ],

    data: [
      { id: '1' , couponTitle: 'aefghy123' , couponDescription:'Essentials' , noOfCoupons: 12 , 
      couponAvailed: 15 , date: '12-01-2019' , amount: 123 , type: 'cp1' , status: 'availed'},

      { id: '2' , couponTitle: 'aefghy123' , couponDescription:'Non-essentials' , noOfCoupons: 21 , 
      couponAvailed: 12 , date: '12-01-2019' , amount: 786, type: 'cp2' , status: 'availed'},

      
      { id: '3' , couponTitle: 'hgjuyiidb' , couponDescription:'essentials' , noOfCoupons: 21 , 
      couponAvailed: 12 , date: '12-01-2019' , amount: 341, type: 'cp2' , status: 'availed'},
      
      
      { id: '4' , couponTitle: 'qwertyuii' , couponDescription:'Non-essentials' , noOfCoupons: 22 , 
      couponAvailed: 12 , date: '12-01-2019' , amount: 560, type: 'cp2' , status: 'availed'},

      { id: '5' , couponTitle: 'wertyipl' , couponDescription:'essentials' , noOfCoupons: 24 , 
      couponAvailed: 12 , date: '13-01-2019' , amount: 543, type: 'cp2' , status: 'availed'},
      
      { id: '6' , couponTitle: 'ghiujkio' , couponDescription:'Non-essentials' , noOfCoupons: 30 , 
      couponAvailed: 12 , date: '14-01-2019' , amount: 500, type: 'cp2' , status: 'availed'},

      { id: '7' , couponTitle: 'yuioplkhgt' , couponDescription:'essentials' , noOfCoupons: 40 , 
      couponAvailed: 12 , date: '16-01-2019' , amount: 600, type: 'cp2' , status: 'availed'},

      { id: '8' , couponTitle: 'hhhyuioklhn' , couponDescription:'Non - essentials' , noOfCoupons: 51 , 
      couponAvailed: 12 , date: '21-01-2019' , amount: 700, type: 'cp2' , status: 'availed'},

      { id: '9' , couponTitle: 'yuiopprefy' , couponDescription:'Non -essentials' , noOfCoupons: 40 , 
      couponAvailed: 12 , date: '21-01-2019' , amount: 249, type: 'cp2' , status: 'availed'},
      
    ],
  });

  return (
    <MaterialTable
      title="COUPONS"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
