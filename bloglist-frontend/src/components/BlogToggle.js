import React, { useState} from 'react'


const BlogToggle = ((props) => {

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  


  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState("view")
 

  const hideWhenVisible = { display: visible ? 'none' : '' } //display arvo on none jos ei haluta et komponentti näkyy
  const showWhenVisible = { display: visible ? '' : 'none' }
  
 
    const toggle = () => {
      setVisible(!visible)
      visible === false ? setButtonLabel("hide") : setButtonLabel("view")
      // props.buttonLabel === "view" ? props.buttonLabel = "hide" : props.buttonLabel = "view"
    }


  
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          <p> {props.blog.title} {props.blog.author}
           <button onClick={toggle}>{buttonLabel}</button>
          </p>   
        </div>
        <div style={showWhenVisible} className="content">
        <p> {props.blog.title} {props.blog.author}
           <button onClick={toggle}>{buttonLabel}</button>
          </p>  
          {props.children}
        </div>
      </div>
    )
  })
 

export default BlogToggle