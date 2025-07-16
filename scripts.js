const imagens = [
  "Imagens_HTML/Anel_Navegação.jpg",
  "Imagens_HTML/Brinco_Navegação.jpg",
  "Imagens_HTML/Colar_Navegação.jpg",
  "Imagens_HTML/Pulseira_Navegação.jpg",
  "Imagens_HTML/Berloque_Navegação.jpg",
  "Imagens_HTML/Pulseira_mas_Navegação.jpg",
];
let indice = 0;

// Função para trocar a imagem
function trocarImagem() {
  indice = (indice + 1) % imagens.length; // Volta ao início ao chegar no final
  document.querySelector(".img-navegacao").src = imagens[indice];
}

// Troca a imagem a cada 3 segundos (3000 milissegundos)
setInterval(trocarImagem, 3000);

const botoes = document.querySelectorAll(".button-navegacao");
botoes.forEach((botao, i) => {
  botao.addEventListener("click", () => {
    indice = i; // Atualiza o índice
    document.querySelector(".img-navegacao").src = imagens[indice];
  });
});


const formularioLogin = document.querySelector("#formulario-login");
const tirarFormulario = document.querySelector(".mascara-invisivel")
const formularioCriarConta = document.querySelector("#formulario-cadastro-login")
const formularioFaleConosco = document.querySelector("#formulario-fale-conosco")
function fazerLogin() {
  formularioLogin.style.display ="flex"
  tirarFormulario.style.visibility ="visible"
}
function tirarLogin(){
 formularioLogin.style.display ="none"
 tirarFormulario.style.visibility ="hidden"
 formularioCriarConta.style.display="none"
 formularioFaleConosco.style.display = "none"
}
function criarConta(){
  formularioCriarConta.style.display = "flex"
  formularioLogin.style.display="none"

}
function faleConosco(){
  formularioFaleConosco.style.display = "flex"
  tirarFormulario.style.visibility ="visible"
}


const imagensQuemSomos = [
  "Imagens_HTML/feedbackum.png",
  "Imagens_HTML/feedbackdois.png",
  "Imagens_HTML/feedbacktres.png",
  "Imagens_HTML/feedbackquatro.png",
  "Imagens_HTML/feedbackcinco.png",
  "Imagens_HTML/feedbackseis.png"
];
let indicedois = 0

function trocarImagemQuemSomos() {
  indicedois = (indicedois + 1) % imagensQuemSomos.length; // Volta ao início ao chegar no final
  document.querySelector(".imagens-quem-somos").src = imagensQuemSomos[indicedois];
}

// Troca a imagem a cada 3 segundos (3000 milissegundos)
setInterval(trocarImagemQuemSomos, 6000);


function mostrarAlerta(mensagem, tipo = "sucesso") {
  const alerta = document.getElementById("mensagem-alerta");
  alerta.innerText = mensagem;

  alerta.classList.remove("oculto", "erro");
  if (tipo === "erro") alerta.classList.add("erro");

  // Mostra a mensagem por 4 segundos
  setTimeout(() => {
    alerta.classList.add("oculto");
  }, 2000);
}
  document.querySelector("#formulario-cadastro-login").addEventListener("submit", function(event) {
  event.preventDefault();

  const nomeCompleto = document.getElementById("nome").value; // <- aqui estava faltando
  localStorage.setItem("cadastroRealizado", "true");
  localStorage.setItem("nomeUsuario", nomeCompleto); // agora funciona

  mostrarAlerta("Cadastro realizado com sucesso! Agora faça o login.");
  formularioCriarConta.style.display = "none";
  formularioLogin.style.display = "flex";
});

document.querySelector("#formulario-login").addEventListener("submit", function(event) {
  event.preventDefault();
  const cadastroFeito = localStorage.getItem("cadastroRealizado");

  if (cadastroFeito === "true") {
    mostrarAlerta("Login realizado com sucesso!");
     // Recuperar nome e extrair o primeiro
    const nomeCompleto = localStorage.getItem("nomeUsuario") || "Usuário";
    const primeiroNome = nomeCompleto.split(" ")[0];
    
    const botaoLogin = document.querySelector(".button-login");
    botaoLogin.outerHTML = `<span class="nome-usuario-logado">Olá, ${primeiroNome}</span>`;

    localStorage.removeItem("cadastroRealizado");
    tirarLogin();
  } else {
    mostrarAlerta("Por favor, crie uma conta antes de fazer login.", "erro");
  }
});

  let carrinho = [];
  let contador = 0;

  const contadorSpan = document.getElementById('contador-carrinho');
  const listaCarrinho = document.getElementById('lista-carrinho');
  const menuCarrinho = document.getElementById('menu-carrinho');
  const textoCarrinhoVazio = document.getElementById('carrinho-vazio');

  // Abrir/fechar carrinho ao clicar no botão
  document.querySelector('.button-carrinho').addEventListener('click', function () {
    menuCarrinho.classList.toggle('oculto');
  });

  // Adiciona produto ao carrinho ao clicar no botão
  document.querySelectorAll('.button-produto').forEach(botao => {
    botao.addEventListener('click', () => {
      const produtoElemento = botao.closest('.caixa-prudutos-iniciais');
      const nome = produtoElemento.querySelector('h2').innerText;
      const preco = produtoElemento.querySelector('p').innerText;
      const imagem = produtoElemento.querySelector('img').src;

      carrinho.push({ nome, preco, imagem });
      contador++;
      contadorSpan.innerText = contador;

      atualizarCarrinho();
    });
  });

  function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';

  if (carrinho.length === 0) {
    textoCarrinhoVazio.style.display = 'block';
    document.getElementById('total-carrinho').innerText = 'Total: R$ 0,00';
    return;
  }

  textoCarrinhoVazio.style.display = 'none';

  let total = 0;

  carrinho.forEach((produto, index) => {
    const li = document.createElement('li');
    li.classList.add('item-carrinho');
    li.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" width="50">
      <div>
        <p><strong>${produto.nome}</strong></p>
        <p>${produto.preco}</p>
      </div>
      <button class="remover-item" data-index="${index}">&times;</button>
    `;
    listaCarrinho.appendChild(li);

    // Converte o valor do preço para número (removendo R$ e trocando vírgula por ponto)
    const precoNumerico = parseFloat(produto.preco.replace('R$', '').replace(',', '.'));
    total += precoNumerico;
  });

  // Atualiza o total no HTML com 2 casas decimais e vírgula
  document.getElementById('total-carrinho').innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;

  document.querySelectorAll('.remover-item').forEach(botao => {
    botao.addEventListener('click', () => {
      const index = parseInt(botao.getAttribute('data-index'));
      carrinho.splice(index, 1);
      contador--;
      contadorSpan.innerText = contador;
      atualizarCarrinho();
    });
  });
}
document.getElementById("botao-finalizar").addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarAlerta("Seu carrinho está vazio.", "erro");
  } else {
    mostrarAlerta("Compra finalizada com sucesso!");
    carrinho = [];
    contador = 0;
    contadorSpan.innerText = contador;
    atualizarCarrinho();
  }
});


