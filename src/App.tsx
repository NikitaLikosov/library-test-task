import { Container } from '@mui/material'
import React, { useState, useMemo } from 'react'
import List from './components/List'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import useStateBooks from './bookStore'

function App() {
  const BooksLib = useStateBooks()
  const [searchValue, setSearchValue] = useState('')

  const MemoList = useMemo(
    () => (
      <List
        books={BooksLib.books}
        delete={BooksLib.delete}
        searchText={searchValue}
        edit={BooksLib.edit}
        set={BooksLib.set}
      />
    ),
    [searchValue, BooksLib.books]
  )

  return (
    <Container maxWidth="sm" style={{ paddingTop: '2rem' }}>
      <Autocomplete
        freeSolo
        onChange={(el, value) => {
          let newValue: string = typeof value === 'object' ? '' : value
          setSearchValue(newValue)
        }}
        options={[
          ...BooksLib.books.map((option) => option.author),
          ...BooksLib.books.map((option) => option.name),
        ]}
        renderInput={(params) => <TextField {...params} label="Поск книг" />}
      />
      {MemoList}
    </Container>
  )
}

export default App
