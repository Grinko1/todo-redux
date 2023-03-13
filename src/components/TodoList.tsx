import TodoItem from './TodoItem';
import { FC } from 'react';
import { useAppSelector } from '../store';

const TodoList:FC = () => {
    const todos = useAppSelector(state => state.todos.list);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
        />
      ))}
    </ul>
  );
};

export default TodoList;