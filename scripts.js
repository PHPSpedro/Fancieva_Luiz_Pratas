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
