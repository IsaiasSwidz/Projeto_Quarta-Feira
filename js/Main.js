document.addEventListener("DOMContentLoaded", function () {
    const inputCategory = document.getElementById('input-category');
    const tagList = document.getElementById('category-tag-list');

    inputCategory.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && inputCategory.value.trim() !== "") {
            e.preventDefault();
            const category = inputCategory.value.trim();

            // Cria elemento da tag
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `
                ${category}
                <span class="remove-tag" onclick="removeTag(this)">×</span>
            `;
            tagList.appendChild(tag);

            inputCategory.value = ""; // Limpa o input
        }
    });

    // Função para remover tag
    window.removeTag = function (element) {
        element.parentElement.remove();
    }

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

    // const slider = document.getElementById("tempoSlider");
    // const tooltip = document.getElementById("tooltip");

    // // Função para posicionar o tooltip proporcionalmente ao thumb
    // function updateSliderTooltip(value) {
    //     const min = slider.min || 0;
    //     const max = slider.max || 100;
    //     const percent = ((value - min) / (max - min)) * 100;

    //     tooltip.textContent = `${value - 5}-${value}`;

    //     // Ajusta a posição do tooltip com base na porcentagem
    //     tooltip.style.left = `calc(${percent}% + (${percent} * -0.1px))`; // pequeno ajuste visual
    // }

    // // Inicializa com o valor padrão
    // updateSliderTooltip(parseInt(slider.value));

    // // Atualiza enquanto o usuário arrasta
    // slider.addEventListener("input", () => {
    //     updateSliderTooltip(parseInt(slider.value));
    // });
});

document.addEventListener("DOMContentLoaded", function () {
    const requestsContainer = document.getElementById("requests");

    // URL do endpoint do backend (ajuste conforme necessário)
    const apiUrl = "http://localhost:8085/service/get/all";

    const token = localStorage.getItem("auth_token");

    if (!token) {
        console.error("Token não encontrado.");
        requestsContainer.innerHTML = "<p>Você precisa estar logado para visualizar os serviços.</p>";
        return;
    }

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error("Erro ao carregar os serviços.");
        }
        return response.json();
    }).then(servicos => {
        if (servicos.length === 0) {
            requestsContainer.innerHTML = "<p>Nenhum serviço encontrado.</p>";
            return;
        }

        servicos.forEach(servico => {
            const card = document.createElement("div");
            card.className = "service-card";

            // Monta as categorias como string
            const categoriasStr = servico.categories?.join(", ");

            // Define o tipo de imagem com base na extensão do base64 (ex: image/png ou image/jpeg)
            const base64Image = `data:image/png;base64,${servico.service_image}`;

            card.innerHTML = `
                <img src="${base64Image}" alt="Imagem do Serviço" class="service-image">
                <div class="service-info">
                    <h4>${servico.title}</h4>
                    <p><strong>Descrição:</strong> ${servico.description}</p>
                    <p><strong>Categorias:</strong> ${categoriasStr}</p>
                    <p><strong>Tempo:</strong> ${servico.time_chronos} horas</p>
                    <p><strong>Usuário:</strong> ${servico.user}</p>
                </div>
            `;

            requestsContainer.appendChild(card);
        });
    }).catch(error => {
        console.error("Erro:", error);
        requestsContainer.innerHTML = "<p>Falha ao carregar os serviços.</p>";
    });
});