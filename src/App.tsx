import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const [editTask, setEditTask] = useState({
    enabled: false,
    task: '',
  });

  function handleRegister() {
    if(!input) {
      alert("Preencha o nome da sua tarefa!");
      return; // Para evitar loop infinito
    }

    if(editTask.enabled) { // se editTask == true vamos editar
      handleSaveEdit();
      return; // Para evitar loop infinito
    }
  
    // setTasks([...tasks, input]); /*(*)*/
    setTasks(ourTasks => [...ourTasks, input]);
    setInput('');
  };

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex(task => task === editTask.task); // (***)
    const allTasks = [...tasks]; // 'clono' meu array tasks para dentro da allTasks 

    allTasks[findIndexTask] = input; // (****)
    setTasks(allTasks);

    // Após isso tenho que avisar que terminamos a edição:
    setEditTask({
      enabled: false,
      task: '',
    })

    setInput(''); // Para limpar o campo
  }

  function handleDelete(index: number) {
    const removeTask = tasks.filter( (_task, i)=> i !== index ); // ('*')
    console.log(index);
    console.log(removeTask);
    setTasks(removeTask);
  } // (**)

  function handleEdit(item: string) {
    setInput(item);
    setEditTask({
      enabled: true,
      task: item,
    })
  }

  return (
    <div>
      <h1>Lista de Tarefas (Hello World)</h1>
      <input
        placeholder="Digite o título da tarefa..."
        value={input}
        onChange={ (e) => (setInput(e.target.value)) }
      />

      <button onClick={handleRegister}>
        {editTask.enabled ? "Atualizar tarefa": "Adicionar tarefa"}
      </button>

      <br /><br /><hr />

      {tasks.map((task, index) => (
        <ul key={index}>
          <li>{task}</li>
          <button onClick={ () => handleEdit(task) } >Editar</button>
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
  ('*') const removeTask = tasks.filter( (_task, i)=> i !== index );
  // Para não passar o erro: 'task' is declared but its value is never read.ts(6133)
  // passamos o prefixo task com um 'underscore', pois queremos usar o 2º parâmetro 'i'
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

/* (***)
  // const findIndexTask = tasks.findIndex(task => task === editTask.task);
  // o findIndex() percorre nossa lista e procura (comparando a condição) a posição do item/task que queremos editar
  // e nos retorna a posição!
*/

/* (****)
  // tendo a posição na const findIndexTask
  // e busco a posição do item/task que quero editar dentro do array, e que vai ser igual ao que digito no input:
    allTasks[findIndexTask] = input;

    // e agora altero o array com o usestate setTasks:
    setTasks(allTasks);
*/

/*
  <button onClick={handleRegister}>
    {editTask.enabled ? "Atualizar tarefa": "Adicionar tarefa"}
  </button>

  // Renderização condicional:
  // Se editTask tiver enabled: true
  // o texto do button será "Atualizar tarefa"
  // se não estiver true será "Adicionar tarefa"
*/