import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { IBook } from '../interface/book'

const ModalEdit = ({
  open,
  book,
  nextBook,
  setNextBook,
  handleClose,
  handleFinish,
}: {
  open: boolean
  book: IBook | undefined
  nextBook: IBook
  setNextBook(el: IBook): void
  handleClose(): void
  handleFinish(): void
}) => {
  const setImg = (file: Blob) => {
    const reader = new FileReader()
    reader.onload = () =>
      typeof reader.result === 'string' &&
      setNextBook({ ...nextBook, img: reader.result })
    reader.readAsDataURL(file)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '80%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <Button variant="contained" component="label">
          Загрузить обложку
          <input
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files
              if (file !== null && file[0] !== undefined) {
                setImg(file[0])
              }
            }}
          />
        </Button>
        <TextField
          required
          id="outlined-required"
          label="Название книги"
          onChange={(el) => setNextBook({ ...nextBook, name: el.target.value })}
          defaultValue={book?.name || ''}
        />
        <TextField
          required
          label="Автор книги"
          onChange={(el) =>
            setNextBook({ ...nextBook, author: el.target.value })
          }
          defaultValue={book?.author || ''}
        />
        <Button
          onClick={() => {
            handleFinish()
            handleClose()
          }}
        >
          {book === undefined ? 'Добавить' : 'Изменить'}
        </Button>
      </Box>
    </Modal>
  )
}

export default ModalEdit
