import './App.css';
import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Note from './components/Note';
import AddNote from './components/AddNote';
import Skeleton from '@mui/material/Skeleton';
// import data from "./data";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TemporaryDrawer from './components/Nav';



function Car() {

  const [todoList, setTodoList] = useState([]);
  const [open, setOpen] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="dark" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  useEffect(() => {
    setTimeout(() => {
      const data = axios.get("https://jsonplaceholder.typicode.com/posts");
      data.then(response => {
        setTodoList([...todoList, ...(response.data).splice(0, 10)])
      })
    }, 1000)
  }, []);

  function addItem(noteText) {
    console.log(noteText)
    if (noteText) {
      setTodoList([...todoList, noteText]);
      setOpen(true);
    }
  }

  return (
    <div>
      <AddNote handleSubmit={addItem} />
      <TemporaryDrawer todoList={todoList} />


      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}

        ><Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Note Added
          </Alert></Snackbar>
      </div>
      <Footer />
    </div>
  );
}


export default Car;
