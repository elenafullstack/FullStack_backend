const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  
  test('a valid blog can be added ', async () => {

    const newBlog = {
        title: 'WOOP3',
        author: 'Ellujee',
        url: 'www.facebook.com',
        likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'WOOP3'
    )
  })


  test('if no like amount is given, it is set to 0 by default', async ()=> {
    const newBlog = {
        title: 'hahah',
        author: 'chicku',
        url: 'www.facebook.com'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsNow = await helper.blogsInDb()

    const content = blogsNow.map(n=>n.likes)
    
    expect(content).toContain(0)
  })

  test('return status 400 if no title was given', async ()=> {
    const newBlog = {
        author: 'chicku',
        url: 'www.facebook.com'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('return status 400 if no url was given', async ()=> {
    const newBlog = {
        title: 'hahah',
        author: 'chicku',
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  
  
  afterAll(() => {
    mongoose.connection.close()
  }) 