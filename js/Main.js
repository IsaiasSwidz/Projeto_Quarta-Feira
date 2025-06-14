//Categorias de trabalhos

const categorias = [
    "Pintura",
    "Mecânica",
    "Engenharia",
    "Elétrica",
    // Adicione mais categorias aqui
];

function popularCategoriasDatalist() {
    const datalist = document.getElementById("categorias-lista");
    if (!datalist) return;
    datalist.innerHTML = ""; // Limpa opções antigas
    categorias.forEach(cat => {
    const option = document.createElement("option");
        option.value = cat;
        datalist.appendChild(option);
    });
}

// Executa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", popularCategoriasDatalist);
const slider = document.getElementById("tempoSlider");
const tooltip = document.getElementById("tooltip");

function updateTooltip() {
    const val = parseInt(slider.value);
    // Define o texto do tooltip como "x-y"
    let texto;
    if (val === 0) {
        texto = "0-5";
    } else {
        texto = `${val - 5}-${val}`;
    }
    // Posiciona o tooltip alinhado ao thumb
    const percent = ((val - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min))) * 100;
    tooltip.style.left = `calc(${percent}% + (${(8 - (percent * 0.15))}px))`;
    tooltip.textContent = texto;
}
// Atualiza tooltip ao mover o slider
slider.addEventListener("input", updateTooltip);

// Atualiza na carga inicial
updateTooltip();