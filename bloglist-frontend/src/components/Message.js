import React from 'react'

const Message = (props) => {
    
if (props.message !== null && props.message !== '') {
    return (
      <div className="message">
         <p>{props.message}</p>
     </div>
    )
}  else {
    return(
      <div className = "nothing">
      <p>{props.message}</p>
      </div>
    )
  }

}

export default Message