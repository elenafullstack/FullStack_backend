const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const usersRouter = require('express').Router()
const User = require('../models/user')




usersRouter.post('/', async (request, response) => {
  const body = request.body


  if (body.password.length < 3 ) {
    return response.status(400).json({
        error: 'password is too short'
      })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})


usersRouter.get('/', async (request, response)  => {
  const users= await User
  .find({}).populate('blogs')
   const blogs = users.map(x=>x.blogs)
   console.log(blogs.map(x=>x.url))
  response.json(users.map(user=>user.toJSON()))
  
  })


  

module.exports = usersRouter