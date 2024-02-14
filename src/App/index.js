import { useLocalStorage } from './useLocalStorage';
import { AppUI } from './AppUI';
import React from 'react';

import './App.css';

// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true},
//   { text: 'comer arroz', completed: false},
//   { text: 'Revisar el baño', completed: false},
//   { text: 'Dañar un chorizo', completed: false},
//   { text: 'bleluyá', completed: false},
// ];

function App() {

  // States
  const [todos, saveTodos] = useLocalStorage('TODOS_V1',[]);
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

  const completeTodo = (text) => {
    const newTodos =[...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const newTodos =[...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex,1);
    saveTodos(newTodos);
  }


  return (
    <AppUI 
    completedTodos={completedTodos}
    totalTodos={totalTodos}
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    searchedTodos={searchedTodos}
    completeTodo={completeTodo}
    deleteTodo={deleteTodo}
    />
  );
}

export default App;
