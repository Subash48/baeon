import React from 'react'


const getStyle = (props)=>{
    let baseClass = "alert ";
    if(props.message.msgError)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-primary";
    return baseClass + " text-center";
}

const Message = props=>{
    return(
        <div className={getStyle(props)} role="alert">
          <h3>{props.message}</ h3>
        </div>
    )
}

export default Message;
