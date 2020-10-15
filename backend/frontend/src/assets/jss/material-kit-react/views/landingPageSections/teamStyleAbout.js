import { title } from "assets/jss/material-kit-react.js";
import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const teamStyleAbout = {
  section: {
    padding: "70px 0",
    textAlign: "center",
    backgroundImage : 'url(https://us.123rf.com/450wm/panychev/panychev1704/panychev170400037/75666147-dark-blue-and-black-gradient-texture-background-abstract-surface-material.jpg?ver=6)',
    background: "rgba(0, 0, 0, 0.5)",
    backgroundSize: 'cover',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    color: "#FFD700"
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle
  : {
    color: "white"
  },
  smallTitle: {
    color: "#FFD700",
    textAlign: "left"
  },
  description: {
    color: "white"
  },
  justifyCenter: {
    justifyContent: "justify !important"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "white"
  },
  margin5: {
    margin: "5px"
  }
};

export default teamStyleAbout;
