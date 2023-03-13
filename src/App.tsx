import {useEffect, useState} from 'react';

import {  addNewTodo, fetchTodos } from './store/todoSlice';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

import './App.css';
import { useAppDispatch, useAppSelector } from './store';


function App() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
const {loading, error} = useAppSelector(state => state.todos)
  const handleAction = () => {
    if(text.trim().length) {
      dispatch(addNewTodo(text));
      setText('');
    }
  }
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className='App'>
      <NewTodoForm
        value={text}
        updateText={setText}
        handleAction={handleAction}
      />
      {loading && <h2>Loading</h2>}
      {error !== null && <h2>Error</h2>}
      <TodoList />
    </div>
  );
}

export default App;