import { title } from "assets/jss/material-kit-react.js";

const workStyle = {
  section: {
    padding: "70px 0",
    backgroundImage: "url()"
  },
  title: {
    ...title,
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center",
    color: "Black"
  },
  description: {
    color: "#999",
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  },
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',            
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    color: 'white'
},
/*input: {
    "&::label":
    {
        color:'white'
    },
    color: 'white',
    borderColor: "white"
},

label: {
    color:'white'
},

notchedOutline: {},
focused: {
  "& $notchedOutline": {
    borderColor: "yellow"
  }
} */

};

export default workStyle;
