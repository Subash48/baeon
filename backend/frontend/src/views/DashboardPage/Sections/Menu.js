import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
            <div>
  <aside className="main-sidebar">
    {/* sidebar: style can be found in sidebar.less */}
    <section className="sidebar">
      {/* Sidebar user panel */}
      <div className="user-panel">
        <div className="pull-left image">
        </div>
        <div className="pull-left info">
         {/* <p>Merchant name</p> */}
          { /* <a href="#"><i className="fa fa-circle text-success" /> Online</a> */}
        </div>
      </div>
      {/* search form */}
      {/* <form action="#" method="get" className="sidebar-form">
        <div className="input-group">
          <input type="text" name="q" className="form-control" placeholder="MERCHANT NAME" />
          <span className="input-group-btn">
            <button type="submit" name="search" id="search-btn" className="btn btn-flat">
              <i className="fa fa-search" />
            </button>
          </span>
        </div>
        </form>  */}
      {/* /.search form */}
      {/* sidebar menu: : style can be found in sidebar.less */}
      <ul className="sidebar-menu" data-widget="tree">
        {/* <li className="header"> VIEW YOUR PRODUCTS</li>
        <li className="active treeview menu-open">
          <a href="#">
            <i className="fa fa-dashboard" /> <span> PROFILE </span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          </a>
          <ul className="treeview-menu">
          </ul>
        </li> */}
        <li>

          <a href="/profile">
            <i className="fa fa-dashboard" /> <span> PROFILE </span>
            <span className="pull-right-container">
              <small className="label pull-right bg-green"></small>
            </span>
          </a>
        </li>
        <li>

          <a href="/apikey">
            <i className="fa fa-envelope" /> <span> API KEY CONSOLE </span>
            <span className="pull-right-container">
              <small className="label pull-right bg-green"></small>
            </span>
          </a>
        </li>
        <li>

          <a href="/products">
            <i className="fa fa-th" /> <span> PRODUCTS </span>
            <span className="pull-right-container">
              <small className="label pull-right bg-green"></small>
            </span>
          </a>
        </li>
        <li>
          <a href="/coupons">
            <i className="fa fa-table" /> <span> COUPONS </span>
            <span className="pull-right-container">
              <small className="label pull-right bg-green"></small>
            </span>
          </a>
        </li>
        <li>

          <a href="/add">
            <i className="fa fa-th" /> <span> Add Coupons </span>
            <span className="pull-right-container">
              <small className="label pull-right bg-green"></small>
            </span>
          </a>
        </li>
        


      </ul>
    </section>
    {/* /.sidebar */}
  </aside>
</div>

        )
    }
}
