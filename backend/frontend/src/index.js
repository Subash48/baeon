import { Router, Route, Switch } from "react-router-dom";
import "./assets/scss/material-kit-react.scss?v=1.9.0";
import React from "react";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";

// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import ProfilePage from "./views/ProfilePage/ProfilePage.js";
import SignUp from "./views/LoginPage/SignUp.js";
import SignIn from "./views/LandingPage/SignIn.js";
import AddMerchant from "./views/LandingPage/AddMerchant.js";
import ChangePassword from "./views/LandingPage/ChangePassword.js";
import apikey from "./views/LandingPage/apikey.js";
import contact from "./views/LandingPage/contact.js";
import admedia from "./views/LandingPage/admedia.js";
import advertisers from "./views/LandingPage/advertisers.js";
import about from "./views/LandingPage/about.js";
import resources from "./views/LandingPage/resources.js";
import blog from "./views/LandingPage/blog.js";
import career from "./views/LandingPage/career.js";
import addCoupon from "./views/LandingPage/Coupon.js";
import prodDash from "./views/DashboardPage/prodDash";
import couponDash from "./views/DashboardPage/couponDash";
import DashBoard from "./views/DashboardPage/dashboard.js";
import Email from "./views/LandingPage/Email.js";
import { loadReCaptcha } from 'react-recaptcha-google';
import AuthProvider from './views/Context/AuthContext';
import PrivateRoute from './views/hocs/PrivateRoute';
import UnPrivateRoute from './views/hocs/UnPrivateRoute';
var hist = createBrowserHistory();
loadReCaptcha()

ReactDOM.render(
<AuthProvider>
  <Router history={hist}>

    <Switch>
    <Route path="/dash"  component= { DashBoard } />
      <Route path="/coupons" component ={ couponDash } />
      <Route path="/products" component ={ prodDash } />
      <Route path="/add" component ={ addCoupon } />
      <Route path="/resources" component ={ resources } />
      <Route path="/career" component ={ career } />
      <Route path="/blog" component ={ blog } />
      <Route path="/about" component ={about} />
      <Route path="/admedia" component={ admedia } />
      <Route path="/advertisers" component={ advertisers} />
      <Route path="/contact" component={ contact } />
      <Route path="/apikey" component={ apikey } />
      <Route path="/AddMerchant"  component={ AddMerchant } />
      <Route path="/ChangePassword" component={ ChangePassword } />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/SignUp" component={ SignUp } />
      <Route path="/SignIn" component= { SignIn} />
      <Route exact path="/" component={ LandingPage } />
      <Route path="/private" component={ PrivateRoute } />
      <Route path="/verify/:token" component={ Email } />
      <Route path="/unprivate" component={ UnPrivateRoute } />
    </Switch>
  </Router>
  </AuthProvider>,
  document.getElementById("root")
);
