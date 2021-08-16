import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component

  let createBlog

  beforeEach(() => {
    createBlog = jest.fn()

    component = render(<BlogForm createBlog={createBlog}/>)
  })

  test('updates parent state and calls onSubmit', () => {
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, { target: { value: '3D Printing : The Next Big (Bad?) Thing' } })
    fireEvent.change(authorInput, { target: { value: 'Caitlin Kim' } })
    fireEvent.change(urlInput, { target: { value: 'https://medium.com/predict/3d-printing-the-next-big-bad-thing-88f1346f5e80' } })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('3D Printing : The Next Big (Bad?) Thing')
    expect(createBlog.mock.calls[0][0].author).toBe('Caitlin Kim')
    expect(createBlog.mock.calls[0][0].url).toBe('https://medium.com/predict/3d-printing-the-next-big-bad-thing-88f1346f5e80')
  })


})
