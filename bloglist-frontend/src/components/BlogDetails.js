import React from 'react'


const BlogDetails = (props) => {
    return (
   <div>
       <p>{props.url}</p>
       <p> Likes {props.likes} <button onClick={()=>props.function(props.blog)}>Like</button> </p> 
       <p>{props.user}</p>
       <button onClick={()=>props.function2(props.blog)}>Delete blog</button>
   </div>
    )

}

export default BlogDetails