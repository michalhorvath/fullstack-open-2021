const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})


blogsRouter.post('/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  })

blogsRouter.delete('/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if ( blog.user.toString() !== user.id.toString() ){
      return response.status(401).json({ error: 'no permission to delete the blog' })
    }

    user.blogs = user.blogs.filter(b => b.id !== blog.id)
    await User.findByIdAndUpdate(user.id, user)

    await blog.delete()

    response.status(204).end()
  })

blogsRouter.put('/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    const updatedBlog =
    await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValudators: true })
    if (!updatedBlog){
      return response.status(400).end()
    }
    response.json(updatedBlog)
  })


module.exports = blogsRouter
