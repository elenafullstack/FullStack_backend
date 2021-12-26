const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Testi',
    author: 'Annuli',
    url: 'www.instagram.com',
    likes: 5
  },
  {
    title: 'Simone',
    author: 'Jakobstadiii',
    url: 'www.instagram.com',
    likes: 5
  }
]

/*const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}