document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('btn-service-image').addEventListener('click', function () {
        document.getElementById('input-service-image').click();
    });

    document.getElementById('input-service-image').addEventListener('change', function () {
        const fileName = this.files[0] ? this.files[0].name : '';
        document.getElementById('service-image-chosen').textContent = fileName;
    });

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

    document.getElementById('register-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('input-title').value;
        const description = document.getElementById('input-description').value;
        const timeChronos = parseInt(document.getElementById('input-time-chronos').value);
        const inputCategory = document.getElementById('input-category');
        const imageInput = document.getElementById('input-service-image');
        const file = imageInput.files[0];

        // Pega as categorias adicionadas
        const categories = Array.from(document.querySelectorAll('#category-tag-list .tag')).map(tag => ({
            name: tag.innerText.trim().replace("×", "")
        }));

        let documentBase64 = "";
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            await new Promise(resolve => reader.onload = resolve); // Espera carregar
            documentBase64 = reader.result;

            // Se quiser só a parte após a vírgula (sem prefixo)
            documentBase64 = documentBase64.split(',')[1]; // Extrai apenas Base64 puro
        }

        const payload = {
            title,
            description,
            timeChronos,
            categoryEntities: categories,
            serviceImage: documentBase64
        }

        try {
            const response = await fetch("http://localhost:8085/service/post/1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("auth_token")
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Serviço criado com sucesso!");
                window.location.href = "Main.html";
            } else {
                alert("Erro ao criar serviço");
            }
        } catch (err) {
            console.error(err);
            alert("Falha na comunicação com o servidor");
        }
    });
});