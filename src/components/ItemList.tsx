import React, { useState } from 'react'
import { IBook } from '../interface/book'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateIcon from '@mui/icons-material/Create'

interface IItemList extends IBook {
  delete: () => void
  openEdit: () => void
}

const ItemList = ({
  name,
  author,
  img,
  delete: deleteBook,
  openEdit,
}: IItemList) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={name} src={img} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={<>{author}</>} />
        <IconButton
          edge="end"
          aria-label="settings"
          onClick={() => {
            openEdit()
          }}
        >
          <CreateIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={(el) => {
            deleteBook()
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default ItemList
