import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    id: '983',
    title: 'How to biohack your intelligence',
    author: 'Serge Faguet',
    url: 'https://medium.com/hackernoon/biohack-your-intelligence-now-or-become-obsolete-97cdd15e395f',
    likes: 21,
    user: {
      name: 'Charles Red',
      username: 'charles12',
      id: '9784'
    }
  }

  let likeBlog
  let removeBlog

  beforeEach(() => {
    likeBlog = jest.fn()
    removeBlog = jest.fn()

    component = render(<Blog blog={blog} likeBlog={likeBlog} removesBlog={removeBlog}/>)
  })

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
  })


  test('url is not visible by default', () => {
    const divUrl = component.getByText(blog.url)

    expect(divUrl).toHaveStyle('display: none')
  })

  test('likes are not visible by default', () => {
    const divLikes = component.getByText(`likes ${blog.likes}`)

    expect(divLikes).toHaveStyle('display: none')
  })

  test('url and likes are visible by after button click', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const divUrl = component.getByText(blog.url)
    const divLikes = component.getByText(`likes ${blog.likes}`)

    expect(divUrl).not.toHaveStyle('display: none')
    expect(divLikes).not.toHaveStyle('display: none')
  })

  test('url and likes are visible by after button click', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })

})
