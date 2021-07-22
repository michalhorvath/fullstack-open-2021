const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('api tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const blogPromiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(blogPromiseArray)

    await User.deleteMany({})
  })

  describe('viewing blogs', () => {
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

    test('identifier is named id', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('adding blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Zombo',
        author: 'Josh Levine',
        url: 'http://zombo.com/',
        likes: 987234
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
      expect(addedBlog).toMatchObject(newBlog)
    })

    test('a blog with no specified likes defaults to 0', async () => {
      const newBlog = {
        title: 'Zombo',
        author: 'Josh Levine',
        url: 'http://zombo.com/'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBe(0)
    })

    test('a blog without title and url can not be added', async () => {
      const newBlog = {
        author: 'Josh Levine',
        likes: 987234
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deleting blog', () => {
    test('a valid blog can be deleted', async () => {
      const blogId = await helper.firstId()

      await api
        .delete(`/api/blogs/${blogId}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })

    test('an invalid id won\'t delete anything', async () => {
      const blogId = await helper.nonExistingId()

      await api
        .delete(`/api/blogs/${blogId}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('updating blog', () => {
    test('a valid blog can be updated', async () => {
      const newBlog = {
        title: 'Zombo',
        author: 'Josh Levine',
        url: 'http://zombo.com/',
        likes: 987234
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
      const responseBlog = response.body

      const updatedBlog = {
        id: responseBlog.id,
        title: 'Brombo',
        author: 'Brosh Brovine',
        url: 'http://brombo.com',
        likes: 123
      }

      await api
        .put(`/api/blogs/${updatedBlog.id}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const blogAtEnd = blogsAtEnd.find(blog => blog.title === updatedBlog.title)
      const processedBlogAtEnd = JSON.parse(JSON.stringify(blogAtEnd))
      expect(processedBlogAtEnd).toMatchObject(updatedBlog)

    })

    test('an invalid id won\'t update anything', async () => {
      const blogId = await helper.nonExistingId()

      const invalidBlog = {
        id: blogId,
        title: 'Brombo',
        author: 'Brosh Brovine',
        url: 'http://brombo.com',
        likes: 123
      }

      await api
        .put(`/api/blogs/${blogId}`)
        .send(invalidBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('adding user', () => {
    test('a valid user can be added', async () => {
      const newUser = {
        username: 'karol21',
        name: 'Karol',
        password: 'karolisking1'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(1)
    })


    test('a user with short username can not be added', async () => {
      const newUser = {
        username: 'ka',
        name: 'Karol',
        password: 'karolisking1'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(0)
    })

    test('a user with short password can not be added', async () => {
      const newUser = {
        username: 'karol21',
        name: 'Karol',
        password: 'k1'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(0)
    })

    test('two users with same usercame can\'t be added', async () => {
      const newUser = {
        username: 'karol21',
        name: 'Karol',
        password: 'karolisking1'
      }

      await api
        .post('/api/users')
        .send(newUser)

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(1)
    })

  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
