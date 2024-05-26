import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    'Estudar React com TypeScript',
    'Comprar pão meio dia',
    'Estudadr inglês a noite'
  ]);

  return (
    <div>
      <h1>Lista de Tarefas (Hello World)</h1>
      <hr />

      <ul>{tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}</ul>
    </div>
  )
}

export default App
