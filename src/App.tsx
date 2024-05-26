import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    'Estudar React com TypeScript',
    'Comprar pão meio dia',
    'Estudadr inglês a noite'
  ]);

  function handleRegister() {
    alert("Botão está funcionando!")
  }

  return (
    <div>
      <h1>Lista de Tarefas (Hello World)</h1>
      <input
        placeholder="Digite o título da tarefa..."
        value={input}
        onChange={ (e) => (setInput(e.target.value)) }
      />

      <button onClick={handleRegister}>Adicionar tarefas</button>
      <h4>{input}</h4>
      <hr />

      <ul>{tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}</ul>
    </div>
  )
}

export default App
