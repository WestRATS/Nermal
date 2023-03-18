import React from "react"; 
import logo from './logo.svg';
import './App.css';

function App() {
function keyPress(e) {
    if(e.keyCode == 13){
       console.log('value', e.target.value);
       // put the login here
    }
}
  return (
    <div className="App">
     <h1>My To-Do List</h1>
     <label for="addTodo">Add TODO: </label>
     <input type="text" id="addTodo" name="addTodo" onKeyDown={keyPress}/>
    </div>
  );
}

export default App;
