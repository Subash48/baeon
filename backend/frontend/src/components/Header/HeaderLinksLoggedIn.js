/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import AuthService from '../../views/services/AuthService';

const useStyles = makeStyles(styles);
export default function HeaderLinksLoggedIn(props) {


  const logoutHandler = ()=>{
    AuthService.logout().then(data=>{
        if(data.success){
            setUser(data.user);
            setIsAuthenticated(false);
        }
    });
  }

  const classes = useStyles();
  return (
    <List className={classes.list}>
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="About Us"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link to="/aboutUs" className={classes.dropdownLink}>
              About BAE
            </Link>,

            <a
              href=""
              className={classes.dropdownLink}
            >
              Resources
            </a>,

            <a
            href="/Blog"
            className={classes.dropdownLink}
            >
            Blog
            </a>,

              <a
              href="/career"
              className={classes.dropdownLink}
              >
              Career
              </a>,

              <a
              href=""
              className={classes.dropdownLink}
            >
              privacy
            </a>,
            <a
            href="/contact"
            className={classes.dropdownLink}
          >
            Contact Us
          </a>
          ]}
        />
   </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          href="/AddMerchant"
          color="transparent"
          className={classes.navLink}
        >
          Add merchant
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Solutions"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link to="/admedia" className={classes.dropdownLink}>
              For Baeon Media Partners
            </Link>,
            <a
              href="/advertisers"
              className={classes.dropdownLink}
            >
              For Advertisers
            </a>
          ]}
        />
   </ListItem>

   <ListItem className={classes.listItem}>
      <CustomDropdown
                noLiPadding
                buttonText="Products"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                buttonIcon={Apps}
                dropdownList={[
                  <Link to="/" className={classes.dropdownLink}>
                    Stay Tuned !
                  </Link>
                ]}
              />
  </ListItem>
   
      <ListItem className={classes.listItem}>
        <Button
          href="/apikey"
          color="transparent"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> API Integration
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Button
          href="/dashboard"
          color="transparent"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> My dashboard
        </Button>
      </ListItem>
     
      <ListItem className={classes.listItem}>
        <Button
          onClick = { logoutHandler }
          color="transparent"
          className={classes.navLink}
        >
          LogOut
        </Button>
      </ListItem>
    </List>
  );
}



