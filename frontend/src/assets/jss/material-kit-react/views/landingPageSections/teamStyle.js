import { cardTitle, title } from "assets/jss/material-kit-react.js";
import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const teamStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center",
    backgroundImage : 'url(https://i.pinimg.com/originals/36/f0/94/36f0949c623b61a235fd6645fa507236.jpg)',
    backgroundSize: 'cover',
    background: "rgba(0, 0, 0, 1.5)",
    paddingLeft: '20px',
    marginTop: "5px"
  },

  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },

  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },

  cardTitle,
  smallTitle: {
    color: "white"
  },

  description: {
    color: "white"
  },

  justifyCenter: {
    justifyContent: "center !important"
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

export default teamStyle;
