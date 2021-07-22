const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((a,b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((blogAcc, blog) => {
    return (blogAcc.likes >= blog.likes) ? blogAcc : blog
  }, blogs[0])
}

var _ = require('lodash')

const mostBlogs = (blogs) => {
  const authorsBlogsCount = _.countBy(blogs, (blog) => blog.author)
  const blogsMax = Math.max(... _.values(authorsBlogsCount))
  const author =  _.findKey(authorsBlogsCount, (articleCount) => articleCount === blogsMax)
  return {
    author: author,
    blogs: blogsMax
  }
}

const mostLikes = (blogs) => {
  const authorsBlogs = _.groupBy(blogs, (blog) => blog.author)
  const authorsLikes = _.mapValues(authorsBlogs, (blogs) => totalLikes(blogs))
  const likesMax = Math.max(... _.values(authorsLikes))
  const author =  _.findKey(authorsLikes, (likeCount) => likeCount === likesMax)
  return {
    author: author,
    likes: likesMax
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
