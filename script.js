const formulario = document.getElementById("formulario");
const campoMissao = document.getElementById("campo-missao");
const lista = document.getElementById("lista");
const textoProgresso = document.getElementById("progresso");
const textoVazio = document.getElementById("vazio");
const missoes = [
  { texto: "Capturar um Pikachu", feita: true },
  { texto: "Coletar 100 anéis", feita: false }
];
function renderizar() {
    lista.innerHTML = "";
    missoes.forEach(function (missao, indice) {
        const item = document.createElement("li");
        item.classList.add("item");
        if (missao.feito) { 
            item.classList.add("feita");
        }
        const caixa = document.createElement("input");
        caixa.type = "checkbox";
        caixa.checked = missao.feita;
        caixa.addEventListener("change", function () {
            missao.feita = caixa.checked; 
            renderizar();                  
        });
        const texto = document.createElement("span");
        texto.textContent = missao.texto;
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "X";
        botaoRemover.classList.add("botao-remover");
        botaoRemover.addEventListener("click", function () {
            missoes.splice(indice, 1); 
            renderizar();
        });
        item.appendChild(caixa);
        item.appendChild(texto);
        item.appendChild(botaoRemover);
        lista.appendChild(item);
    });
    const concluidas = missoes.filter(function (missao) {
        return missao.feita;
    }).length;
    textoProgresso.textContent = `${concluidas} de ${missoes.length} missões concluídas`;
    if (missoes.length === 0) {
        textoVazio.style.display = "block";
    } else {
        textoVazio.style.display = "none";
    }
}
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); 

    const texto = campoMissao.value.trim();
    if (texto === "") {
        return;
    }
    missoes.push({ texto: texto, feita: false });
    campoMissao.value = "";
    campoMissao.focus();
    renderizar();
});
renderiza();