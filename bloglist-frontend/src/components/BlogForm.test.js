import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'



test('create blog with right attributes', () => {  
    const handleSubmit = jest.fn()


render(
     <BlogForm 
    
     handleSubmit= {handleSubmit}
    
      />
 )

 const titleBox = screen.getByPlaceholderText('write title')
 const authorBox= screen.getByPlaceholderText('write author')
 const urlBox= screen.getByPlaceholderText('write url')
 

 userEvent.type(titleBox, "Testiotsikko")
 userEvent.type(authorBox, "Testiauthor")
 userEvent.type(urlBox, "Testiurl")

 expect(screen.getByPlaceholderText('write title')).toHaveValue('Testiotsikko')
 expect(screen.getByPlaceholderText('write author')).toHaveValue('Testiauthor')
 expect(screen.getByPlaceholderText('write url')).toHaveValue('Ttiurl')

})