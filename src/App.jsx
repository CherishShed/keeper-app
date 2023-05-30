import './App.css';
import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Note from './Note';
import AddNote from './AddNote';
import data from "./data";
function Car() {
  const [todoList, setTodoList] = useState([...data.slice(0, 10)]);
  function addItem(noteText) {
    console.log(noteText)
    if (noteText) {
      setTodoList([...todoList, noteText]);
    }
  }
  function deleteItem(event, itemIndex) {
    setTodoList(todoList.filter((item, index) => index !== itemIndex));


  }
  return (
    <div>
      <Header />
      <AddNote handleSubmit={addItem} />
      <div className="note-container">
        {todoList.map((item, index,) => <Note key={index} index={index} title={item.title} noteText={item.body} handleDelete={deleteItem} show={true} />)}
      </div>
      <Footer />
    </div>
  );
}


export default Car;
