import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import React from 'react';

import './App.css';

const defaultTodos = [
  { text: 'Cortar cebolla', completed: true},
  { text: 'comer arroz', completed: false},
  { text: 'Revisar el baño', completed: false},
  { text: 'Dañar un chorizo', completed: false},
];

{defaultTodos.map(todo =>(
  <TodoItem />
))}

function App() {
  return (
    <>
      
      <TodoCounter completed={20} total={21} />
      <TodoSearch />

      <TodoList>
        {defaultTodos.map(todo =>(
          <TodoItem 
          key={todo.text} 
          text={todo.text}
          completed={todo.completed}
          />
        ))}
      </TodoList>
      
    <CreateTodoButton />
      
    </>
  );
}

export default App;
