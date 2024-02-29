import { useState,useEffect, useMemo } from 'react';
import {AgGridReact} from 'ag-grid-react';
import {AppBar, Toolbar, Typography, IconButton, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBook from './components/AddBook';

//css
import './App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
const [books,setBooks] = useState([]);


const DBUrl = 'https://bookstore-612e2-default-rtdb.europe-west1.firebasedatabase.app/';
const Books = 'books/';

const fetchBooks = () =>{
  fetch(DBUrl+Books+'.json')
  .then(response => response.json())
  .then(data => addKeys(data))
  .catch(err => console.error(err));
}

const addKeys = (data) => {
  const keys = Object.keys(data);
  const valueKeys = Object.values(data).map((item,index) =>
    Object.defineProperty(item, 'id', {value: keys[index]}));
  setBooks(valueKeys);
}
const deleteBook = (id) => {
  fetch(DBUrl+Books+`${id}.json`,
    {
      method: 'DELETE'
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err));
}

const addBook = (newBook) => {
  fetch(DBUrl+Books+'.json',
  {
    method: 'POST',
    body: JSON.stringify(newBook)
  })
  .then(response => fetchBooks())
  .catch(err => console.error(err))
};

useEffect(() => {fetchBooks()},[]);

const autoSizeStrategy = {type: 'fitCellContents'}; 

const columnDefs = [
  {field: 'title', headerName: 'Title'},
  {field: 'author', headerName: 'Author'},
  {field: 'year', headerName: 'Year', type: 'rightAligned' },
  {field: 'isbn', headerName: 'ISBN', type: 'rightAligned'},
  {field: 'price', headerName: 'Price', type: 'numericColumn'},
  {field:'id', headerName:'', width: 90,
      cellRenderer: params =>
        <IconButton onClick={()=> deleteBook(params.value)} size='small' color='error'>
          <DeleteIcon />
        </IconButton>}
];
const defaultColDef = useMemo(() =>{
  return {
    sortable: true, filter: true
  }
})
  
/**npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install ag-grid-community ag-grid-react */

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5'>
            BookStore
          </Typography>
        </Toolbar>
      </AppBar>
      <AddBook addBook={addBook} />
      <div className='ag-theme-material' style={{height: 400, width: 1000}}>
        <AgGridReact 
          rowData={books} 
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={autoSizeStrategy}/>

      </div>
      
    </>
  )
}

export default App
