
import {toggleStatus, deleteTodo, Todo} from '../store/todoSlice'; 
import { useAppDispatch } from '../store/index';
import { FC } from 'react';



const TodoItem:FC<Todo> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span onClick={() => dispatch(deleteTodo(id))}>&times;</span>
    </li>
  );
};

export default TodoItem;