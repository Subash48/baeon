import React, { Component } from 'react'

export default class Body extends Component {
    render() {
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
       {/* <div className="col-md-3 col-sm-4 col-xs-6">
          <div className="info-box">
            <span className="info-box-icon bg-aqua"><i className="fa fa-product-hunt" /></span>
            <div className="info-box-content">
              <span className="info-box-text"> Products</span>
              <span className="info-box-number"> 0 </span>
            </div>
          </div>
        </div> */}
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
        {/* /.col */}
      </div>
      {/* /.row */}
      <div className="row">
        <div className="col-md-12">
          <div className="box">
            <div className="box-header with-border">
              <h3 className="box-title"> YOUR INVENTORY DETAILS </h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                </button>
                <div className="btn-group">
                  <button type="button" className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-wrench" /></button>
                </div>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
              </div>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <div className="row">
                <div className="col-md-8">
                  <p className="text-center">
                    <strong>Sales of your product</strong>
                  </p>
                 {/* } <div className="chart">
                    {/* Sales Chart Canvas 
                    <canvas id="salesChart" style={{height: 180}} />
                  </div>
                  {/* /.chart-responsive */}
                </div> 
                {/* /.col */}
                <div className="col-md-4">
                  <p className="text-center">
                    <strong> Inventory Details</strong>
                  </p>
                  <div className="progress-group">
                    <span className="progress-text">Add Products to Cart</span>
                    <span className="progress-number"><b>NIL</b></span>
                    <div className="progress sm">
                      <div className="progress-bar progress-bar-aqua" style={{width: '80%'}} />
                    </div>
                  </div>
                  {/* /.progress-group */}
                  <div className="progress-group">
                    <span className="progress-text">Coupons availed</span>
                    <span className="progress-number"><b>NIL</b></span>
                    <div className="progress sm">
                      <div className="progress-bar progress-bar-red" style={{width: '80%'}} />
                    </div>
                  </div>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
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
              {/*}  <li className="item">
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
               {/*} <li className="item">
                  <div className="product-img">
                    <img src="dist/img/default-50x50.gif" alt="myImage" />
                  </div>
                  <div className="product-info">
                    <a href="/" className="product-title">Product 2
                      <span className="label label-info pull-right"></span></a>
                    <span className="product-description">
                      
                    </span>
                  </div>
                    </li> */}
              
          </div>
        </div> 
      </div>
    </section>
   
  </div>
</div>

        )
    }
}
