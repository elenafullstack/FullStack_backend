const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs= await Blog
  .find({})
  console.log(blogs)
 response.json(blogs.map(blog=>blog.toJSON()))
  
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id) 
  response.json(blog)
  
})


  
 blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
    const blog = new Blog ({
      author: body.author,
      title: body.title,
      user: user._id,
      url: body.url,
      likes: body.likes
      
    })


   if (!body.title) {
      return response.status(400).json({
        error: 'title missing'
      })
    } 
    if (!body.url) {
      return response.status(400).json({
        error: 'url missing'
      })
    }
    if (!body.likes) {
      blog.likes = 0
    }
  
    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()

    response.json(saved)
  })

  blogsRouter.delete('/:id', async (request, response) => {


    const user = request.user
    const blog = await Blog.findById(request.params.id) 

  if  (blog.user.toString() === user.id.toString()) {
     user.blogs = user.blogs.filter(x => x.toString() !== blog.id.toString())
     await Blog.findByIdAndRemove(request.params.id)
     await user.save()
     response.status(204).end()
  } else {
    response.status(400).json({
      error: 'user not allowed to delete the bog'
    })
  }  
 })
  
 blogsRouter.put('/:id', async (request, response) => {
   const body = request.body

   const updated = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, updated, { new: true})
  response.json(newBlog)

 })
  

  module.exports = blogsRouter