import { FC } from "react";

interface NewTodoForm {
value:string,
 updateText : (str: string) => void,
handleAction : () => void,
}

const NewTodoForm:FC<NewTodoForm> = ({ value, updateText, handleAction }) => {
  return (
    <label>
      <input
        placeholder='new todo'
        value={value}
        onChange={(e) => updateText(e.target.value)}
      />
      <button onClick={handleAction}>Add todo</button>
    </label>
  );
};

export default NewTodoForm;