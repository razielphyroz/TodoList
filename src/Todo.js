import React from 'react'

export default function Todo({ todo, toogleTodo }) {

  function handleTodoClick(e) {
    toogleTodo(todo.id);
  }

  return (
    <div>
      <label>
        <input onChange={handleTodoClick} type="checkbox" checked={todo.complete}/>
        {todo.name}
      </label>
    </div>
  )
}
