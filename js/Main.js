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

// Slider e tooltip
document.addEventListener("DOMContentLoaded", function() {
    // Popular categorias
    popularCategoriasDatalist();

    // Slider
    const slider = document.getElementById("tempo-slider");
    const tooltip = document.getElementById("tooltip");

    function updateTooltip() {
        const val = parseInt(slider.value);
        let texto;
        if (val === 0) {
            texto = "0-5";
        } else {
            texto = `${val - 5}-${val}`;
        }
        tooltip.textContent = texto;

        // Calcula a posição do thumb
        const min = parseInt(slider.min);
        const max = parseInt(slider.max);
        const percent = (val - min) / (max - min);

        // Largura do slider e do thumb
        const sliderWidth = slider.offsetWidth;
        const thumbWidth = 20; // mesmo valor do CSS

        // Posição do centro do thumb
        const pos = percent * (sliderWidth - thumbWidth) + (thumbWidth / 2);

        // Posiciona a tooltip
        tooltip.style.left = `calc(${pos}px - ${tooltip.offsetWidth / 2}px)`;
    }

    slider.addEventListener("input", updateTooltip);
    window.addEventListener("resize", updateTooltip); // Atualiza ao redimensionar
    updateTooltip();
});