import { useState, useEffect, useRef, useMemo, useCallback } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null); // useRef para input

  const firstRender = useRef(true); // (y¹)


  const [editTask, setEditTask] = useState({
    enabled: false,
    task: '',
  });

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("@todolist-ts");

    if(tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }

  }, []); // (x¹) // (x⁵)

  useEffect(() => {

    if(firstRender.current) {
      firstRender.current = false;
      return;
    } // (y²)

    localStorage.setItem("@todolist-ts", JSON.stringify(tasks));
  
  }, [tasks]); // (y³)


  const handleRegister = useCallback(() => { // (xyz¹)
    if(!input) {
      alert("Preencha o nome da sua tarefa!");
      return;
    }

    if(editTask.enabled) {
      handleSaveEdit();
      return;
    }
  
    setTasks(ourTasks => [...ourTasks, input]);
    setInput('');

  }, [input, tasks]);


  // function handleRegister() {
  //   if(!input) {
  //     alert("Preencha o nome da sua tarefa!");
  //     return; // Para evitar loop infinito
  //   }

  //   if(editTask.enabled) { // se editTask == true vamos editar
  //     handleSaveEdit();
  //     return; // Para evitar loop infinito
  //   }
  
  //   // setTasks([...tasks, input]); /*(*)*/
  //   setTasks(ourTasks => [...ourTasks, input]);
  //   setInput('');

  //   // localStorage.setItem("@todolist-ts", JSON.stringify([...tasks, input])); // (x²)
  
  // };


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

    // localStorage.setItem('@todolist-ts', JSON.stringify(allTasks)); // (x³)

  }

  function handleDelete(index: number) {
    const removeTask = tasks.filter( (_task, i)=> i !== index ); // ('*')
    // console.log(index);
    // console.log(removeTask);
    setTasks(removeTask);

    // localStorage.setItem("@todolist-ts", JSON.stringify(removeTask)); // (x⁴)

  } // (**)

  function handleEdit(item: string) {
    inputRef.current?.focus(); // passando evento ao input através do useRef inputRef
    
    setInput(item);
    setEditTask({
      enabled: true,
      task: item,
    })

  }

  const totalTarefas = useMemo(() => {
    return tasks.length;
  }, [tasks]); // (z¹)

  return (
    <div>
      <h1>Lista de Tarefas (Hello World)</h1>
      <input
        placeholder="Digite o título da tarefa..."
        value={input}
        onChange={ (e) => (setInput(e.target.value)) }
        ref={inputRef} // para dar referência ao input
      />

      <button onClick={handleRegister}>
        {editTask.enabled ? "Atualizar tarefa": "Adicionar tarefa"}
      </button>

      <br /><br /><hr />

      <strong>Você tem {totalTarefas} tarefas!</strong>
      <br /><br />

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

// Comentários no arquivo AppReviews.ts
