//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
 
let amigos = []; // Array para armazenar os nomes dos amigos
let sorteioAtual = []; // Array para armazenar os pares de amigos secretos
let indiceSorteio = 0; // Índice para controlar o próximo resultado a ser exibido

function adicionarAmigo() { // Captura o valor do campo de entrada
    nomeAmigo = document.getElementById('amigo').value.trim();
    if (nomeAmigo == "") {  // Valida se o campo está vazio
        alert("Por favor, insira um nome.");
        return; // Sai da função se o campo estiver vazio
    }

    if (amigos.includes(nomeAmigo)) {  // Verifica se o nome já foi adicionado
        alert("Este nome já foi adicionado.");
        return; // Sai da função se o nome já existir no array
    }
  
    amigos.push(nomeAmigo); // Adiciona o nome ao array de amigos
    document.getElementById('amigo').value = "";  // Limpa o campo de entrada
    atualizarListaAmigos(); // Atualiza a lista de amigos exibida na tela
}

function atualizarListaAmigos() {
    listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ""; // Limpa a lista atual
    for (let i = 0; i < amigos.length; i++) { // Percorre o array de amigos e adiciona cada nome como um <li>
        li = document.createElement('li');
        li.textContent = amigos[i];
        li.setAttribute('role', 'listitem'); // Adiciona atributo ARIA para acessibilidade
        listaAmigos.appendChild(li);
    }
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para realizar o sorteio.");
        return; // Sai da função se não houver amigos suficientes
    }

    amigosEmbaralhados = amigos.slice().sort(() => Math.random() - 0.5); // Embaralha o array de amigos
    sorteioAtual = [];// Cria pares de amigos secretos
    for (let i = 0; i < amigosEmbaralhados.length; i++) {
        amigoAtual = amigosEmbaralhados[i];
        amigoSecreto = amigosEmbaralhados[(i + 1) % amigosEmbaralhados.length]; // Circular
        sorteioAtual.push(`Seu amigo secreto é ${amigoSecreto}`);
    }

    document.getElementById('listaAmigos').style.display = "none"; // Oculta a lista de nomes
    indiceSorteio = 0; // Reinicia o índice do sorteio
    exibirProximoResultado(); // Exibe o primeiro resultado
}

function exibirProximoResultado() { //Avança para o póximo amigo a ser sorteado
    listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = ""; // Limpa a lista de resultados
    if (indiceSorteio < sorteioAtual.length) { // Verifica se ainda há resultados para exibir
        li = document.createElement('li');
        li.textContent = sorteioAtual[indiceSorteio];
        listaResultado.appendChild(li);
        indiceSorteio++;  // Adiciona ao índice para o próximo resultado
        botaoSortear = document.querySelector('.button-draw'); // Configura o botão para exibir o próximo resultado
        botaoSortear.textContent = "Próximo";
        botaoSortear.onclick = exibirProximoResultado;
    } else {
        alert("Todos os amigos foram sorteados!"); // Todos os resultados foram exibidos
        document.getElementById('listaAmigos').style.display = "block"; // Restaura a lista de nomes
        botaoSortear = document.querySelector('.button-draw'); // Reinicia o botão "Sortear amigo" caso precise incluir mais amigos
        botaoSortear.textContent = "Sortear amigo";
        botaoSortear.onclick = sortearAmigo;
    }
}