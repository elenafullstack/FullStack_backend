import React from 'react'


const User = (props) => {
    if (props.user !== null) {
        return (
        <div>
        <p>{props.user.name} is logged in <button onClick = {()=>props.function()}> Log out </button></p>
        </div>
        )
    }
}


export default User