import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'




  
test('create blog with right attributes', () => {
    const titleBox = screen.getByPlaceholderText('write title')
    const authorBox= screen.getByPlaceholderText('write author')
    const urlBox= screen.getByPlaceholderText('write url')
    const handleSubmit = jest.fn()
render(
     <BlogForm 
     title={title}
     author={author}
     url={url}
     handleSubmit= {handleSubmit}
     handleTitleChange={userEvent.type(titleBox, "Testiotsikko")}
     handleAuthorChange={userEvent.type(authorBox, "Testiauthor")}
     handleUrlChange={userEvent.type(urlBox, "Testiurl")}
      />
 )

 const button = screen.getByText('create')
 userEvent.click(button)

 console.log(handleSubmit.mock.calls[0][0].content)
})