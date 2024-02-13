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
  { text: 'bleluyá', completed: false},
];


function App() {

  // Local storage
  const localStorageTodos = localStorage.getItem('TODOS_V1');
  
  let parsedTodos;
  
  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1',JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
  }

  // States
  const [todos, setTodos] = React.useState(parsedTodos);
  const [searchValue, setSearchValue] = React.useState('');

  // Derivated states

  // Inside the filter is an arrow function
  // that recives todo and returned a todo.completed
  // with !! (double negation) we transform True to 1
  const completedTodos = todos.filter(
    todo => !!todo.completed
  ).length;
  const totalTodos = todos.length

  const searchedTodos = todos.filter(
    (todo) => {
      // función texto sin tildes
      const noTildes = (text) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      };

      const todoText = noTildes(todo.text.toLowerCase());
      const searchText = noTildes(searchValue.toLowerCase());
      return todoText.includes(searchText);
    }
  )

  const saveTodos = (newTodos) => {
    localStorage.setItem('TODOS_V1', JSON.stringify(newTodos));
    setTodos(newTodos);
  }

  const completeTodo = (text) => {
    const newTodos =[...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text == text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const newTodos =[...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text == text
    );
    newTodos.splice(todoIndex,1);
    saveTodos(newTodos);
  }

  console.log('Lo que están escribiendo: ' + searchValue);

  return (
    <>
      
      <TodoCounter
        completed={completedTodos} 
        total={totalTodos } 
      />
      <TodoSearch 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(todo =>(
          <TodoItem 
          key={todo.text} 
          text={todo.text}
          completed={todo.completed}
          onComplete={ () => {
            completeTodo(todo.text)
          }}
          onDelete={ () => {
            deleteTodo(todo.text)
          }}
          />
        ))}
      </TodoList>
      
    <CreateTodoButton />
      
    </>
  );
}

export default App;
