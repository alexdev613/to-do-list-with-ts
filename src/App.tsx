import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    'Estudar React com TypeScript',
    'Comprar pão meio dia',
    'Estudadr inglês a noite'
  ]);

  function handleRegister() {
    if(!input) {
      alert("Preencha o nome da sua tarefa!");
      return; //
    }

    // setTasks([...tasks, input]); /*(*)*/
    setTasks(ourTasks => [...ourTasks, input]);
    setInput('');
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

/*  setTasks([...tasks, input]);
  (*) já funcionaria assim com spread operator para o nosso useState tasks para
  apegar tudo e acrescentar o que tem no meu useState input, mas vamos fazer de outro jeito p/aumentar o repertório 

    Com uma função anônima chamo agora meu estado tasks como ourTasks, e uso um spread operator para pegar
  tudo dentro do meu useState e acrescento o que tem no input:

    setTasks(ourTasks => [...ourTasks, input]);
  
  É só um jeito diferente de fazer setTasks([...tasks, input]);
*/
