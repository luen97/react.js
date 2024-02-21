import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

// Create our custom provider 
function TodoProvider({ children }) {

    const {
        item: todos, 
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1',[]);

    // States
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
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}>
            { children }
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider }

// const defaultTodos = [
//     { text: 'Cortar cebolla', completed: true},
//     { text: 'comer arroz', completed: false},
//     { text: 'Revisar el baño', completed: false},
//     { text: 'Dañar un chorizo', completed: false},
//     { text: 'bleluyá', completed: false},
//   ];
  
//   localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos))