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
            <div className="col-md-3 col-sm-4 col-xs-6">
              <div className="info-box">
                <span className="info-box-icon bg-aqua"><i className="fa fa-product-hunt" /></span>
                <div className="info-box-content">
                  <span className="info-box-text"> Products</span>
                  <span className="info-box-number"> 0 </span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
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
            {/* /.col */}
            <div className="col-md-3 col-sm-4 col-xs-6">
              <div className="info-box">
                <span className="info-box-icon bg-yellow"><i className="ion ion-ios-people-outline" /></span>
                <div className="info-box-content">
                  <span className="info-box-text"> Retailers </span>
                  <span className="info-box-number"> 0</span>
                </div>
                {/* /.info-box-content */}
              </div>
              {/* /.info-box */}
            </div>
            {/* /.col */}
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
                    <div className="btn-group">
                      <button type="button" className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                        <i className="fa fa-wrench" /></button>
                      <ul className="dropdown-menu" role="menu">
                        <li><a href="/">Action</a></li>
                        <li><a href="/">Another action</a></li>
                        <li><a href="/">Something else here</a></li>
                        <li className="divider" />
                        <li><a href="/">Separated link</a></li>
                      </ul>
                    </div>
                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                    <CouponItem/>
                </div>    
                {/* ./box-body */}
                <div className="box-footer">
                  <div className="row">
                    <div className="col-sm-3 col-xs-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-green"><i className="fa fa-caret-up" /> 17%</span>
                        <h5 className="description-header">Rs 0</h5>
                        <span className="description-text">COUPONS POSTED</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-xs-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-yellow"><i className="fa fa-caret-left" /> 0%</span>
                        <h5 className="description-header">$0 </h5>
                        <span className="description-text">TOTAL COST</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                    <div className="col-sm-3 col-xs-6">
                      <div className="description-block border-right">
                        <span className="description-percentage text-green"><i className="fa fa-caret-up" /> 20%</span>
                        <h5 className="description-header"> 5 </h5>
                        <span className="description-text">COUPONS COLLECTED</span>
                      </div>
                      {/* /.description-block */}
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                </div>
                {/* /.box-footer */}
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
              <div className="box box-info">
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
               
              </div>
            
            </div>
            <div className="col-md-4">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Recently Added Products</h3>
                  <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ul className="products-list product-list-in-box">
                    <li className="item">
                      <div className="product-img">
                        <img src="dist/img/default-50x50.gif" alt="Product" />
                      </div>
                      <div className="product-info">
                        <a href="/" className="product-title">Product 1
                          <span className="label label-warning pull-right"></span></a>
                        <span className="product-description">
    
                        </span>
                      </div>
                    </li>
                    {/* /.item */}
                    <li className="item">
                      <div className="product-img">
                        <img src="dist/img/default-50x50.gif" alt="hello" />
                      </div>
                      <div className="product-info">
                        <a href="/" className="product-title">Product 2
                          <span className="label label-info pull-right"></span></a>
                        <span className="product-description">
                          
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>  
          </div>
        </section>
       
      </div>
    </div>
    
            );
        }
    
export default Coupons;
