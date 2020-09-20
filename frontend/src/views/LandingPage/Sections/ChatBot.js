import React from 'react';

export default class ChatBot extends React.Component {

  componentDidMount() {
    var Tawk_API= Tawk_API||{}, Tawk_LoadStart=new Date();
    console.log(Tawk_LoadStart);
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5f2191259283f77d73b851c6/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
    
  }

  render() {
    return <div ref={el => (this.instance = el)} />;
  }
}
