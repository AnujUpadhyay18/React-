import { useState, useRef, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [idEnable, setidEnable] = useState(null);
  const ref = useRef(null);
  
 
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  
  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), text: todo ,isComplete:false}]);
      setTodo("");
    }
    setidEnable(null);
  };

  const update = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), text: todo }]);
      setTodo("");
    }
    setidEnable(null);
  };

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };
  function handleDelete(id) {
    const newtodo = todos.filter((todo) => todo.id !== id);
    setTodos(newtodo);
  }

  function handleEdit(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.text);
      const newtodo = todos.filter((todo) => todo.id !== id);
      setTodos(newtodo);
      setidEnable(id);
      ref.current.focus();
    }
    console.log(id);
  }
  const chekhandle = (id) => {
    const newtodo = todos.map((todo) => {
      if(todo.id==id){
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(newtodo);
    
  };

  const renderTodos = () => {
    return todos.map((todo) => (
      <>
        <div
          key={todo.id}
          className={`edit_delete ${todo.isComplete ? "line-through" : ""}`}
        >
          <input
            type="checkbox"
            name="anuj"
            
            id=""
            onChange={()=>chekhandle(todo.id)}
          />
          {todo.text}

          <div className="edit">
            <button className="button" onClick={() => handleEdit(todo.id)}>
              Edit
            </button>

            <button
              className="button"
              onClick={() => {
                handleDelete(todo.id);
              }}
            >
              delete
            </button>
          </div>
        </div>
      </>
    ));
  };

  return (
    <>
      <div className="heading">TO-DO App</div>
      <div className="container">
        <div className="input_box">
          <input
            type="text"
            className="input"
            value={todo}
            onChange={handleInputChange}
            ref={ref}
          />
          <button className="button" onClick={idEnable ? update : addTodo}>
            {idEnable ? "Update" : "Add"}
          </button>
        </div>
        <div className="show_todo">{renderTodos()}</div>
      </div>
    </>
  );
}

export default App;
