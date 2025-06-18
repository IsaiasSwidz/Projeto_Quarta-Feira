document.addEventListener("DOMContentLoaded", function () {
    // ----- TAG DE CATEGORIAS -----
    const inputCategory = document.getElementById('input-category');
    const tagList = document.getElementById('category-tag-list');

    inputCategory?.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && inputCategory.value.trim() !== "") {
            e.preventDefault();
            const category = inputCategory.value.trim();

            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `
                ${category}
                <span class="remove-tag" onclick="removeTag(this)">×</span>
            `;
            tagList.appendChild(tag);

            inputCategory.value = "";
        }
    });

    window.removeTag = function (element) {
        element.parentElement.remove();
    }

    const categorias = ["Pintura", "Mecânica", "Engenharia", "Elétrica"];

    function popularCategoriasDatalist() {
        const datalist = document.getElementById("categorias-lista");
        if (!datalist) return;
        datalist.innerHTML = "";
        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            datalist.appendChild(option);
        });
    }

    popularCategoriasDatalist();

    // ----- SLIDER E TOOLTIP -----
    const slider = document.getElementById("tempo-slider");
    const tooltip = document.getElementById("tooltip");

    function updateTooltip() {
        if (!slider || !tooltip) return;

        const val = parseInt(slider.value);
        const min = parseInt(slider.min);
        const max = parseInt(slider.max);
        const percent = (val - min) / (max - min);

        const texto = val === 0 ? "0-5" : `${val - 5}-${val}`;
        tooltip.textContent = texto;

        const sliderWidth = slider.offsetWidth;
        const thumbWidth = 20;
        const pos = percent * (sliderWidth - thumbWidth) + (thumbWidth / 2);

        tooltip.style.left = `calc(${pos}px - ${tooltip.offsetWidth / 2}px + 25px)`;
    }

    if (slider && tooltip) {
        slider.addEventListener("input", updateTooltip);
        window.addEventListener("resize", updateTooltip);
        updateTooltip();
    }

    // ----- FETCH DE SERVIÇOS -----
    const requestsContainer = document.getElementById("requests");
    const apiUrl = "http://localhost:8085/service/get/all";
    const token = localStorage.getItem("auth_token");

    if (!requestsContainer) return;

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
        if (!response.ok) throw new Error("Erro ao carregar os serviços.");
        return response.json();
    }).then(servicos => {
        if (servicos.length === 0) {
            requestsContainer.innerHTML = "<p>Nenhum serviço encontrado.</p>";
            return;
        }

        servicos.forEach(servico => {
            const card = document.createElement("div");
            card.className = "service-card";

            const categoriasStr = servico.categories?.join(", ");
            const base64Image = `data:image/png;base64,${servico.serviceImage}`;

            console.log(servico)

            servico.categoryEntities.forEach(category => {
                if (category == servico.categoryEntities[0]) {
                    card.innerHTML = `
                        <img src="${base64Image}" alt="Imagem do Serviço" id="service-image">
                        <div class="service-info">
                            <p class="service-title">${servico.title}</p>
                            <p class="user-service">Postado por ${servico.userEntity.name}</p>
                            <div class="qty-chronos-service">
                                <img class="qty-chronos-service-img" src="../img/Coin.png" alt="">
                                <p class="qty-chronos-service-text">${servico.timeChronos} chronos</p>
                            </div>
                            <div class="category-service">
                                <img class="category-service-img" src="../img/Paintbrush.png" alt="">
                                <p class="category-service-text">${category?.name}</p>
                            </div>
                        </div>
                    `;
                }
            })

            
            if (!card.innerHTML) {
                card.innerHTML = `
                <img src="${base64Image}" alt="Imagem do Serviço" id="service-image">
                <div class="service-info">
                    <p class="service-title">${servico.title}</p>
                    <p class="user-service">Postado por ${servico.userEntity.name}</p>
                    <div class="qty-chronos-service">
                        <img class="qty-chronos-service-img" src="../img/Coin.png" alt="">
                        <p class="qty-chronos-service-text">${servico.timeChronos} chronos</p>
                    </div>
                </div>
                `;
            }
            requestsContainer.appendChild(card);
        });
    }).catch(error => {
        console.error("Erro:", error);
        requestsContainer.innerHTML = "<p>Falha ao carregar os serviços.</p>";
    });
});