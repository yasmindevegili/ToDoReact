import './App.css';
import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    handleGetTodosFromLocalStorage();
    setLoading(false);
  }, []);

  const handleGetTodosFromLocalStorage = () => {
    const todosArray = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      todosArray.push(JSON.parse(value));
    }
    setTodos(todosArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };
    localStorage.setItem(todo.id.toString(), JSON.stringify(todo));
    setTodos((prevState) => [...prevState, todo]);
    setTitle("");
    setTime("");
  };

  const handleDelete = (id) => {
    localStorage.removeItem(id.toString());
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const handleEdit = (todo) => {
    const updatedTodo = { ...todo, done: !todo.done };
    localStorage.setItem(todo.id.toString(), JSON.stringify(updatedTodo));
    setTodos((prevState) =>
      prevState.map((t) => (t.id === todo.id ? updatedTodo : t))
    );
  };

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>To Do's</h1>
      </div>
      <div className='form-todo'>
        <h2>Insira sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor='title'>O que você vai fazer?</label>
            <input
              type='text'
              name='title'
              placeholder='Título da tarefa'
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='time'>Duração:</label>
            <input
              type='time'
              name='time'
              placeholder='Tempo estimado (em horas):'
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>
          <input type="submit" value="Criar tarefa" />
        </form>
      </div>
      <div className='list-todo'>
        <h2>Lista de Tarefas:</h2>
        {todos && todos.length === 0 ? <p>Não há tarefas!</p> : null}
        {todos && todos.map((todo) => (
          <div className='todo' key={todo.id}>
            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className='actions'>
              <span onClick={() => handleEdit(todo)}>
                {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)}/>
          </div>
        </div>
        ))}
      </div>
      <p className='ass'>Yasmin Devegili 2023</p>
    </div>
  );
}

export default App;