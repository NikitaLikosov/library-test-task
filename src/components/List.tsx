import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import ListUI from '@mui/material/List'
import { IBook } from '../interface/book'
import ModalEdit from './ModalEdit'

import Button from '@mui/material/Button'

interface IList {
  searchText: string
  books: Array<IBook>
  delete(Book: IBook): void
  edit(Book: IBook, NextBook: IBook): void
  set(Book: IBook): void
}

const List = (props: IList) => {
  const [openEdit, setOpenEdit] = useState<{
    status: boolean
    book: IBook | undefined
    nextBook: IBook
  }>({
    status: false,
    book: undefined,
    nextBook: { name: '', author: '' },
  })

  return (
    <>
      <ModalEdit
        open={openEdit.status}
        book={openEdit.book}
        nextBook={openEdit.nextBook}
        setNextBook={(el: IBook) => {
          setOpenEdit((state) => ({ ...state, nextBook: el }))
        }}
        handleClose={() => {
          setOpenEdit((state) => ({ ...state, status: false }))
        }}
        handleFinish={() => {
          if (openEdit.book === undefined) {
            props.set(openEdit.nextBook)
          } else {
            props.edit(openEdit.book, openEdit.nextBook)
          }
        }}
      />
      <ListUI>
        {props.books
          .filter(
            (el) =>
              el.author
                .toLowerCase()
                .includes(props.searchText.toLowerCase()) ||
              el.name.toLowerCase().includes(props.searchText.toLowerCase()) ||
              props.searchText === ''
          )
          .map((el, i) => (
            <ItemList
              key={i}
              {...el}
              delete={() => props.delete(el)}
              openEdit={() =>
                setOpenEdit({ status: true, book: el, nextBook: el })
              }
            />
          ))}
      </ListUI>
      <Button
        onClick={(el) => {
          el.preventDefault()
          setOpenEdit({
            status: true,
            book: undefined,
            nextBook: { name: '', author: '' },
          })
        }}
      >
        Добавить книгу
      </Button>
    </>
  )
}

export default List
