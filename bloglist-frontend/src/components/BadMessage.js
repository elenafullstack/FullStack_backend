import React from 'react'

const BadMessage = (props) => {
    
if (props.message !== null && props.message !== '') {
    return (
      <div className="badmessage">
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

export default BadMessage