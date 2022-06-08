import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders button add book', () => {
  render(<App />)
  const linkElement = screen.getByText(/добавить книгу/i)
  expect(linkElement).toBeInTheDocument()
})
