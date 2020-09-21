
import {Redirect} from 'react-router-dom';
import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Apps, CloudDownload } from "@material-ui/icons";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import AuthService from '../../views/services/AuthService';
import { AuthContext } from "../../views/Context/AuthContext"
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(AuthContext);

  const logoutHandler = ()=>{
    AuthService.logout().then(data=>{
        if(data.success){
            setUser(data.user);
            setIsAuthenticated(false);
            redirection();
        }
    });
    }

    function redirection(props)
    {
      return(
        <Redirect to={{ pathname: '/',
        state : {from : props.location}}}/>
      );
    }

    //unauthenticated navbar contents
    const unauthenticatedNavBar = ()=>{
      return (
          <>
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

            <Link to="/about" className={classes.dropdownLink}>
              About BAE
            </Link>,

            <a
              href="/resources"
              className={classes.dropdownLink}
            >
              Resources
            </a>,

            <a
            href="/blog"
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
              href="/privacy"
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
          href="http://api.baeon.co"
          color="transparent"
          className={classes.navLink}
        >
          API Documentation
        </Button>
    </ListItem>

      &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;

      <ListItem className={classes.listItem}>
          <CustomDropdown
                noLiPadding
                buttonText="Get started"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                dropdownList={[
                  <Link to="/SignIn" className={classes.dropdownLink}>
                    Sign In
                  </Link> ,

                  <a
                  href="/SignUp"
                  className={classes.dropdownLink}
                  >
                   Sign Up
                  </a>
                ]}
              />

      </ListItem>
    </List>

          </>
      )
  }

  //authenticated navbar - contents
  const authenticatedNavBar = ()=>{
    return(
        <>
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
              href="/"
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
              href="/"
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
          href="/dash"
          color="transparent"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> My dashboard
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>

      <Button onClick={ logoutHandler }>
        Logout
       </Button>

      </ListItem>
    </List>
        </>
    )
}

return (

  <div>
        { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
  </div>

);

}
