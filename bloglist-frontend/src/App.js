import React, { useState, useEffect, useRef } from 'react'
import BlogToggle from './components/BlogToggle'
import BlogDetails from './components/BlogDetails'
import User from './components/User'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BadMessage from './components/BadMessage'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [username, setUsername] = useState('') 
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('') 
  const [newMessage, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [badMessage, setBadMessage] = useState('')


console.log(10)
  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])



  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    const credentials = {username, password}
    
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setBadMessage('wrong username or password')
     setTimeout(() => {
        setBadMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    const blog = {
      "author" : author,
      "title" : title,
      "url" : url

    }
    const response = await blogService.create(blog)
    const newBlogs = blogs.concat(response)
    setBlogs(newBlogs)
    console.log(blogs)
    setMessage(`A new blog '${response.title}' added    `)
    setTimeout(() => {
       setMessage(null)
     }, 5000)

    }

    const likeBlog = async (blog) => {
      const newBlog = {
        "author" : blog.author,
        "title" : blog.title,
        "url" : blog.url,
        "likes" : blog.likes + 1 
      }
      newBlog.id = blog.id
      const response = await blogService.update(blog, newBlog)
      setBlogs(blogs.map(x => x.id !== blog.id ? x : response))

    }

    const deleteBlog = async (blog) => {
      if ((window.confirm(`Delete blog ${blog.title}?`))) {
        await blogService.deleteBlog(blog)
        setBlogs(blogs.filter(x => x.id !== blog.id))
     }
    }
   

    const blogForm = () => (
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <BlogForm
          title={title}
          author={author}
          url = {url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={addBlog}
        />
      </Togglable>
    )

  const loginForm = () => (
    <div>
    <h2>Log in</h2>
    <BadMessage message = {badMessage}/>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>   
    </div>   
  )

;


if (user === null) {
  return (
    loginForm()
  )
}
  return (
    <div>
     <Message message = {newMessage}/>
      <h2>blogs</h2>
      <User user={user} function={logOut} />
     {blogForm()}
     <br></br>
        {blogs.filter(blog=>blog.user.toString() === user.id.toString()).sort((a, b) => b.likes - a.likes).map(blog =>
          <BlogToggle key={blog.id} blog={blog}>
             <BlogDetails key = {blog.id} blog = {blog} url = {blog.url} likes ={blog.likes} user= {user.name} function = {likeBlog} function2 = {deleteBlog}/>
          </BlogToggle>
          )}
    </div>
  )
}

export default App