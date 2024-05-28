import { useState, useEffect, useRef } from "react";

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

    // localStorage.setItem("@todolist-ts", JSON.stringify([...tasks, input])); // (x²)
  
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

    // localStorage.setItem('@todolist-ts', JSON.stringify(allTasks)); // (x³)

  }

  function handleDelete(index: number) {
    const removeTask = tasks.filter( (_task, i)=> i !== index ); // ('*')
    console.log(index);
    console.log(removeTask);
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

/*
  (x¹)
    // Quando criamos um useEffect e passamos comandos na função anônima mas deixamos array de dependências vazio,
    // então este useEffect só executará a função anônima uma única vez que é quando o componente for montado!
    // Agora se colocarmos alguma depêndência no array de dependências, além da função anônima ser executada quando
    // o componente for montado ela também será executada quando o valor do que passarmos no array de dependências mudar!
*/

/*
    // (x²)

    localStorage.setItem("@todolist-ts", JSON.stringify([...tasks, input]));

    // Primeiro é importatnte saber que o localStorage é um objeto, e o setItem é um método deste objeto.
    // Esse método é usado para adicionar um item ao armazenamento local do navegador (localStorage) com
    // uma chave específica e um valor. O método setItem aceita dois parâmetros: a chave (uma string) e o
    // valor (também uma string).
    // "@todolist-ts" é a chave. E para o valor pegamos todas as tasks já lançadas com o spread operation
    // e acrescentamos o input em um array, mas como o valor deve ser uma string, usamos o JSON.stringfy()
    // para converter o array em uma string. Podemos observar as mudanças das adições em inspecionar e acessar
    // a aba Application/Aplicativo, indo em Armazenamento Local podemos encontar nossa chave @todolist-ts
*/

/*
    // (x³)

    localStorage.setItem('@todolist-ts', JSON.stringify(allTasks))

    // Aqui precisamos fazer a mesma coisa, pois neste caso de uso temos a função de alterar um item
    // do array. Então chamamos o objeto localStorage para salvar no nosso armazenamento local com o
    // método setItem colocamos no primeiro parâmetro a mesma chave '@todolist-ts', pois vamos salvar
    // as alterações também nela. e aqui usamos a const alltasks para receber nosso array com o item
    // alterado segundo a lógica! Como é um array, nós usamos o JSON.stringfy para converter o valor
    // para string, como pede o método setItem
*/

/*
    // (x⁴)

    localStorage.setItem("@todolist-ts", JSON.stringify(removeTask));

    // Para este caso de uso, que é o caso de deletar um item do nosso array. Ao deletar um item
    // para salvar no armazenamento locao do navegador preciso chamar novamento o objeto localStorage
    // e seu método setItem, passando como primeiro parâmetro a nossa chave "@todolist-ts", e agora a
    // nossa const removeTask, que é o array do useState tasks atualizado com o item que deletamos,
    // em resumo é a variável que passamos para o setTasks, e sendo um array precisamo converter para
    // string como fizemos anteriomente, com o JSON.stringfy.
*/

/*
  // (x⁵)
  
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("@todolist-ts");

    if(tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }

  }, []);
  
  // Para quadno o componente for montado precisamos pegar o que temos no nosso aramzenamento local
  // fazemos isso na linha: const tarefasSalvas = localStorage.getItem("@todolist-ts");
  // O método getItem busca no localStorage a nossa chave "@todolist-ts", então já temos acesso ao
  // que tiver salvo na nossa chave. Então, já que o que tem dentro do nosso localStorage é uma string,
  // precisamos converter para um array, já que nosso useState tasks é quem recebe esses itens para renderizar
  // em tela nossas tarefas! Então criamos o if:

    if(tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }

  // SE TIVER ALGO na nossa const tarefasSalvas, preencha o setTasks (que é nosso parâmetro de mudança do nosso
  // useState tasks), conversetendo para JSON, ou seja, para uma coleção array, a string recebida pela const
  // tarefasSalvas, que é o que obtemos no nosso localStorage na chave "todolist-ts".

  // Com isto, quando o nosso componente for montado, se houver algo na nossa chave "todolist-ts" salvo, teremos
  // acesso na nossa aplicação seguindo a lógica que construimos até agora!

*/

/*
    Como vimos, chamamos o nosso localStorage em 3 funções para salvar nosso useState tasks a cada alteração do mesmo!
    Mas com o useRef e um useEffect podemos chamar o localStorage uma única vez para salvar no localStorage nas três
    situações em que mudamos o nosso array do useState tasks, a saber: quando adicionamos uma task/item no array,
    quando editamos uma task/item do array ou quando deletamos uma task/item do array!

    Criando uma useEffect assim:

    useEffect(() => {
      localStorage.setItem("@todolist-ts", JSON.stringfy(tasks)); // * então...

    }, [tasks]); // temos a dependência tasks no array de dependências do useEffect
    // Isso quer dizer que toda vez que o useState tasks for alterado eu chamo a função anônima do meu useEffect

    // * ... então... eu quero salvar nossas tarefas no localStorage toda vez que tasks for alterado!
    // Só que dessa forma, sem usar um useRef vai acontecer isto: nós podemos criar tarefas/itens no nosso
    // array do useState tasks, como editar ou deletar que isso vai ser salvo no nosso localStorage, mas se
    // atualizarmos a página a nossa aplicação não renderiza mais nossas tarefas, assim como nosso localStorage
    // é zerado! Isto acontece porque o React não tem uma ordem de qual useEffect ele executará primeiro quando o
    // componentefor montado.

    // Repare que crimaos dois useEffects

    useEffect(() => {
      const tarefasSalvas = localStorage.getItem("@todolist-ts");

      if(tarefasSalvas) {
        setTasks(JSON.parse(tarefasSalvas));
      }

    }, []); // => para buscar as tarefas e colocar na nossa lista do useState tasks

    useEffect(() => {

      localStorage.setItem("@todolist-ts", JSON.stringify(tasks));
    
    }, [tasks]); // => e para salvar no localStorage quando nossa lista do useState tasks for alterada

    // Porém se o  2º useEffect executar primeiro o 1º useEffect vai preencher a lista vazia, pois o 2º useEffect
    // não tem nada dentro dele.
    // Então para fazer com que o 2º useEffect  execute somente quando o array do useState tasks for alterado,
    // usaremos um useRef:

  // (y¹) const firstRender = useRef(true); // Ele começa como true, com a 1ª renderização

  // 1º useEffect para buscar as tarefas no localStorage e passar para o useState tasks:

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("@todolist-ts");

    if(tarefasSalvas) {
      setTasks(JSON.parse(tarefasSalvas));
    }

  }, []);

  useEffect(() => {

    if(firstRender.current) { // (y²) se firstRender.current = true (primeira renderização) => entre no bloco do if

      firstRender.current = false; // (y²) passe firstRender.current para false
      return; // (y²) parar a execução desta função anônima
    }

    localStorage.setItem("todolist-ts", JSON.stringfy(tasks));

  }, [tasks]); // (y³) => Então caso a nossa useState tasks sofra alguma alteração...

  // ...ela vai chamar o useEffect novamente e vai verificar se firstRender.current = true
  // constatará que não é a primeira vez que o componente foi montado pois firstRender.current = false
  // logo nosso if é ignorado e dá-se a continuação da execução da função anônima, e a linha:

  // localStorage.setItem("todolist-ts", JSON.stringfy(tasks));
  // salva a alteração feita no useState tasks no localStorage.

  // Então é desse jeito que impedimos a chamada do nosso useEffect na primeira renderização (quando o componente
  // é montado) utilizando o hook useRef.

*/