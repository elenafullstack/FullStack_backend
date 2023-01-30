import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogToggle from './BlogToggle'
import BlogDetails from './BlogDetails'


const blog = {
    "author" : "Elena",
    "title" : "TestiBlogi",
    "url" : "www.facebook.com",
    "likes" : 1 
}
  
  test('renders only name and author by first', () => {

   const component = render(
      <BlogToggle blog = {blog}>
        <BlogDetails  blog = {blog} url = {blog.url} likes = {blog.likes}/>
      </BlogToggle>
    )
    const div = component.container.querySelector('.content')
    expect(div).toHaveStyle('display: none')

   
 })

test('after clicking the button, shows also url and likes', () => {

  const component = render(
    <BlogToggle blog = {blog}>
      <BlogDetails  blog = {blog} url = {blog.url} likes = {blog.likes}/>
    </BlogToggle>
  )
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    const div = component.container.querySelector('.content')
    expect(div).not.toHaveStyle('display: none')


})

test('clicking on "like" calls the function twise', () => {

  const likeBlog = jest.fn()

  const component = render(
    <BlogToggle blog = {blog}>
      <div className="testDiv">
        <button onClick={likeBlog}>Like</button>
      </div>
    </BlogToggle>
  )
  
  const button = component.container.querySelector('button')
  fireEvent.click(button)
  const div = component.container.querySelector('.content')
  const button2 = screen.getByText('Like')
  userEvent.click(button2)
  userEvent.click(button2)
  expect(likeBlog.mock.calls).toHaveLength(2)

})


