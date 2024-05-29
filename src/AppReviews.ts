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

/*
  // (z¹) => useMemo é um hook que serve para quando queremos evitar perda de performance e memorizar valores,
  // cálculos e etc, para evitar renderizações desnecessárias!

  // Vamos pensar em um elemento que nos trará a quantidade de listas que temos na nossa lista do useState tasks:

  <strong>Você tem {tasks.length} tarefas!</strong>

  // Só que levemos em consideração do porquê usar o useMemo:

  // Há um fato que toda vez que fazemos uma manipulação, como exemplo: quando digitamos uma letra no input, e como
  // setamos um evento no onChange do campo/input com o setInput do useState input, para que toda vez que algo for
  // digitado no campo o setInput atualiza o useState do input trocando o seu valor, e daí o React "rerrenderiza" tudo
  // o que há dentro do return().

  // Só que como é algo muito singelo e que não consome tanta memória nesse caso, não conseguimos perceber, e neste caso
  // de uso quase não tem perda de performance, mas se for algo que envolva cálculos complexos com várias manipulações poderíamos
  // ter uma considerável perda de performance e daí que entra o useMemo!

  // E então podemos utilizar o useMemo para memorizar valores, para só "rerenderizar" caso haja a mundança de uma useState,
  // ou por exemplo, para fazer cálculos para formatação de moedas em um conversor!
  
  // E para utilizar o useMemo precisamos importá-lo:
  import { useState, useEffect, useRef, useMemo } from "react";

  // (z¹) => criar a função com a lógica:

  const totalTarefas = useMemo(() => { // o useMemo recebe uma função anônima e um array de dependências

    return tasks.length; // aqui pedi para ele retornar a quantidade/tamanho de tarefas que tenho na lista
  
  }, [tasks]); // e dentro do array de dependências eu coloco a dependência que quando alterada chame este useMemo,
  // no caso o useState tasks. Então toda vez que a useState tasks sofrer alguma alteração o que estiver dentro da
  // função anônima do useMemo é executado.

  // RESUMINDO: Então toda vez que ocorrer alguma alteração na(s) dependência(s) que colocamos dentro do array de dependências
  // do useMemo, o useMemo vai renderizar a função anônima que passamos dentro do useMemo.

  // Então ao invés de <strong>Você tem {tasks.length} tarefas!</strong>

  // Posso chamar:

  <strong>Você tem {totalTarefas} tarefas!</strong>

  // Então, somente quando a useState tasks for modificada é que a função anônima do useMemo será renderizada novamente!
  // E o return tasks.length; será renderizado, e sem o useMemo, apenas com <strong>Você tem {tasks.length} tarefas!</strong>
  // padrão, a renderização desse tasks.length seria chamada toda vez que algo fosse digitado dentro do campo/input
  // pois seria disparado o evento onChange!

  // Então o useMemo tem esta função, de evitar a perda de performance da aplicação evitando renderizações desnecessárias!

*/

/*
  // (xyz¹) => Usando o useCallback:

  // O useCallback é bem parecido com o useMemo, ele é uado para evitar que renderizações desnecessárias sejam
  // feitas, porém também serve para evitar fazer um cash em uma função, e também só deixa que essa função seja
  // renderizada novamente quando alguma dependência do array de dependência for modificada!

  // Vamos usar o userCallback para controlar nossa função handleRegister! Que é a função de adicionar ou chamar a função
  // de salvar uma edição em uma tarefa! Então nossa handleRegister tem duas dependências, a input e a tasks:
  
  function handleRegister() {
    if(!input) {
      alert("preencha o nome da sua tarefa!");
      return;
    }

    if(editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks(ourTasks => [...ourTasks, input]); // => tem os valores digitados no input, e os itens adicionados no array da useState tasks
    setInput("");
  }

  // Só que se eu excluir uma tarefa na nossa lista, não faz sentido a função handleRegister ser "rerrenderizada"
  // no nosso componente! Assim como não faz sentido que outra função externa e que nosso handleRegister não tenha
  // relação alguma e uma outra useState mudar ter que recriar na memória a função handleRegister, então é para este
  // caso que usamos o useCallback! Para evitar fazer cash da função e rerrenderizações desnecessárias...

  // Pois toda vez que excluimos uma tarefa da lista, tudo o que estiver no return é "rerrenderizado" e também
  // é feito o cash de todas as aplicações, ou seja, é realocado na memória as funções que são chamadas dentro do
  // return() do nosso componente! E não faz sentido que o handleRegister seja realocado na memória quando excluimos
  // uma tarefa! E sim apenas quando alguma dependência que eu passar no handleRegister  sofra alteração! 
  // Então o useCallback é utilizado para evitar perca de performance e otimizar nossa aplicação.

  // Então para utilizar o useCallback eu devo importá-lo:

  import { useState, useEffect, useRef, useMemo, useCallback } from "react";

  // E criar uma variável que recebe o useCallback, que recebe uma função anônima onde coloco a lógica que quero
  // passar, e um array de dependências onde vou passar as dependências que quero que quando modificadas chamem a
  // função anônima do useCallback!

    const handleRegister = useCallback(() => {
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

  // Aqui eu chamei a const com o nome da função handleRegister e passei exatamente o que continha nela dentro
  // da função anônima do useCallback, e no array de dependências passei as dependênciuas que realmente importam
  // para a lógica da função, para que ela seja chamada apenas quando uma dessas dependências sejam modificadas!

  // Então esta função anônima da const handleRegister só será realocada dentro da memória quando as denpendências
  // do array de dependências sofrerem uma alteração!

*/