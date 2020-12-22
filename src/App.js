import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef(); //Rerencia direta para o input do DOM.
  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toogleTodo(id) {
    const todosCopy = [...todos];
    const todoToSwitch = todosCopy.find(todo => todo.id === id);
    todoToSwitch.complete = !todoToSwitch.complete;
    setTodos(todosCopy);
  }

  function handleAddTodo(e) {

    const name = todoNameRef.current.value;
    if (name === '') return;

    setTodos(prevTodos => {
      const todoToAdd = {id: uuidv4(), name: name, complete: false};
      return [...prevTodos, todoToAdd];
    });

    /* //Outra maneira de fazer o mesmo.
    const todoToAdd = {id: uuidv4(), name: name, complete: false};
    const newTodos = [...todos, todoToAdd];
    setTodos(newTodos);
    */
   
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const uncompletedTodos = todos.filter(todo => !todo.complete);
    setTodos(uncompletedTodos);
  }

  return (
    <>
      <TodoList todos={todos} toogleTodo={toogleTodo}/>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
