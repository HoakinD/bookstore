import {Button, TextField,Dialog,DialogContent,DialogActions,DialogTitle} from '@mui/material';
import {NumericFormat} from 'react-number-format';
import { PropertyKeys } from 'ag-grid-community';
import { useState } from 'react';

function AddBook(props){
    const [open,setOpen] = useState(false);
    const [book, setBook] = useState({title:'', author:'', year: '', isbn: '', price: 0});
    //const [displayValue, setDisplayValue] = useState();

    const handlerOpen = () =>{
        setOpen(true);
    }
    const handlerClose = () => {
        setBook({title:'', author:'', year: '', isbn: '', price: 0});
        setOpen(false);
    }
    const inputChanged = (event) => {
        setBook({...book, [event.target.name]:event.target.value});
    }
    const handlerSave = () => {
        props.addBook(book);
        handlerClose();
    }
   // const onlyNumbers = (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') };
   // const yearInputProps = {type : 'Number', max: 2024, min: 0, maxLength: 4, onInput:(e) =>onlyNumbers(e)};
   /*   \d*(\.\d{2})?    */
   /*  \d*(\.\d{2})?^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?$    */
    return(
        <>
            <Button variant='outlined' onClick={handlerOpen}>Add book</Button>
            <Dialog open={open}>
                <DialogTitle>
                    Add book
                </DialogTitle>
                <DialogContent>
                    <TextField name='isbn' label='ISBN' value={book.isbn} onChange={inputChanged} margin="dense" fullWidth />
                    <TextField name='title' label='Title' value={book.title} onChange={inputChanged} margin="dense" fullWidth />
                    <TextField name='author' label='Author' value={book.author} onChange={inputChanged} margin="dense" fullWidth />
                    <TextField name='year' label='Year' value={book.year}  onChange={inputChanged} margin="dense" />
                   {/* <NumericFormat                         
                       // thousandSeparator='.'
                        decimalScale={2} 
                       // decimalSeparator=','  
                        valueIsNumericString={true}   
                        onValueChange={(vals) => setDisplayValue({value: vals.formattedValue})}                    
                        customInput={TextField}                         
                        name='price' 
                        label='Price' 
                        value={displayValue}
                        value={book.price} 
                        type='number' 
                       /* onChange={inputChanged} 
                         margin="dense"  />*/}
                    <TextField name='price' label='Price' value={book.price} type='number' onChange={inputChanged} margin="dense"  />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handlerClose}>Cancel</Button>
                    <Button color="primary" onClick={handlerSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </>
    )

}
export default AddBook;