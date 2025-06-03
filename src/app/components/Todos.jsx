import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { useState } from "react";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleUpdate = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveUpdate = (id) => {
    if (editText.trim() !== "") {
      dispatch(updateTodo({ id, text: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div className="w-[70%] mx-auto">
      <div className="text-center text-2xl mt-10">Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-3 rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
              <input
                className="text-black px-2 py-1 rounded w-full mr-4"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div className="text-white">{todo.text}</div>
            )}

            <div className="flex gap-2">
              {editId === todo.id ? (
                <button
                  onClick={() => saveUpdate(todo.id)}
                  className="text-white bg-green-500 border-0 py-1 px-4 hover:bg-green-600 rounded text-md"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleUpdate(todo.id, todo.text)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 hover:bg-blue-600 rounded text-md"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 hover:bg-red-600 rounded text-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}       
      </ul>
    </div>
  );
}

export default Todos;
