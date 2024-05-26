import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    'Estudar React com TypeScript',
    'Comprar pão meio dia',
    'Estudar inglês a noite'
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

  function handleDelete(index: number) {
    const removeTask = tasks.filter( (_task, i)=> i !== index );
    console.log(removeTask);
    setTasks(removeTask);
  } // (**)

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

      {tasks.map((task, index) => (
        <ul key={index}>
          <li>{task}</li>
          <button onClick={ () => handleDelete(index) }>Excluir</button>
        </ul>
      ))}
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

/*
  (**) Poderíamos construir a função handleDelete() pegando o valor do item/task assim:

  function handleDelete(item: string) {
    const removeTask = tasks.filter( task => task !== item);
    setTasks(removeTask);
  }

  // Porém, se tivermos um mesmo texto em dois item, se apagarmos aparagará os dois itens com texto igual.
  // Assim também poderíamos deixar nossa key <ul key={task}> ao invés de <ul key={index}>, se um usuário
  // repetisse por engano uma tarefa teríamos um erro por ter duas keys iguais, tendo um caso de key não única,
  // por isso escolhemos usar o index ao invés de task para a key assim como decidimos usar index para pegar
  // a posição do item que queremos deletar na função handleDelete!
*/