import { title } from "assets/jss/material-kit-react.js";

const productStyle = {
  section: {
    padding: "30px 0",
    textAlign: "center",
    backgroundSize: "cover",
    background: "rgba(0,0,0,0.5)",
    backgroundImage : 'url(https://us.123rf.com/450wm/panychev/panychev1704/panychev170400037/75666147-dark-blue-and-black-gradient-texture-background-abstract-surface-material.jpg?ver=6)',
    
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "black",
    textAlign: "center"
  }
};

export default productStyle;
