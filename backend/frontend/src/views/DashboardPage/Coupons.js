import React  from 'react';
import CouponItem from './CouponItem';

const Coupons = props =>{
   
    //const [coupons,setCoupons] = useState([]); 
    // useEffect(()=>{
    //     CouponService.getCoupons().then(data =>{
    //         console.log('here');
    //         console.log(data);
    //         setCoupons(data.coupon);
    //         //console.log(products);
    //     });
    // },[]);


      return (
               <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>
            Dashboard
          </h1>
        </section>
        {/* Main content */}
        <section className="content">
          {/* Info boxes */}
          <div className="row">
            {/* /.col */}
            <div className="col-md-3 col-sm-4 col-xs-6">
              <div className="info-box">
                <span className="info-box-icon bg-red"><i className="fa fa-product-hunt" /></span>
                <div className="info-box-content">
                  <span className="info-box-text"> Added </span>
                  <span className="info-box-number"> 0</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
            {/* fix for small devices only */}
            <div className="clearfix visible-sm-block" />
            <div className="col-md-3 col-sm-4 col-xs-6">
              <div className="info-box">
                <span className="info-box-icon bg-green"><i className="ion ion-ios-cart-outline" /></span>
                <div className="info-box-content">
                  <span className="info-box-text">coupons</span>
                  <span className="info-box-number"> 0</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
          </div>
          {/* /.row */}
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title"> YOUR PROMOTIONAL CAMPAIGNS </h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                    <CouponItem/>
                </div>    
              </div>
              {/* /.box */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
          {/* Main row */}
          <div className="row">
            {/* Left col */}
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                </div>
                {/* /.col */}
                {/* /.col */}
              </div>
              {/* /.row */}
              {/* TABLE: LATEST ORDERS */}
             {/*} <div className="box box-info">
                <div className="box-header with-border">
                  <h3 className="box-title">Latest Orders</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                  </div>
                </div>
                <div className="box-footer clearfix">
                  <a href="/" className="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
                  <a href="/" className="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
                </div>
               
      </div> */}
            
            </div>
          </div>
        </section>
       
      </div>
    </div>
    
            );
        }
export default Coupons;
