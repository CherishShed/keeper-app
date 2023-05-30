import './App.css';
import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Note from './Note';
import AddNote from './AddNote';
function Car() {
  const [todoList, setTodoList] = useState([])
  function addItem(noteText) {
    console.log(noteText)
    if (noteText) {
      setTodoList([...todoList, noteText]);
    }
  }
  function deleteItem(itemIndex) {
    setTodoList(todoList.filter((item, index) => index !== itemIndex));
  }
  return (
    <div>
      <Header />
      <AddNote handleSubmit={addItem} />
      <div className="note-container">
        {todoList.map((item, index) => <Note key={index} index={index} title={item.title} noteText={item.text} handleDelete={deleteItem} />)}
      </div>
      <Footer />
    </div>
  );
}


export default Car;
