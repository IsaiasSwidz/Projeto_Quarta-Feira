document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('btn-annex').addEventListener('click', function () {
        document.getElementById('input-file').click();
    });

    document.getElementById('input-file').addEventListener('change', function () {
        const fileName = this.files[0] ? this.files[0].name : '';
        document.getElementById('file-chosen').textContent = fileName;
    });

    document.getElementById('register-form').addEventListener('submit', async function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const name = document.getElementById('input-name').value.trim();
        const email = document.getElementById('input-email').value.trim();
        const phoneNumber = parseInt(document.getElementById('input-phone-number').value.replace(/\D/g, ''));
        const password = document.getElementById('input-password').value;
        const confirmPassword = document.getElementById('input-confirm-password').value;

        const fileInput = document.getElementById('input-file');
        let documentBase64 = "";

        // Validação simples
        if (!name || !email || !phoneNumber || !password || !confirmPassword) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        if (password.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        if (!fileInput.files[0]) {
            e.preventDefault();
            alert("Selecione um documento com foto");
            return;
        }

        const file = fileInput.files[0];
        let base64Data;
        try {
            base64Data = await convertToBase64(file);
        } catch (err) {
            alert("Erro ao converter documento para Base64.");
            console.error(err);
            return;
        }

        // Monta o payload
        const payload = {
            name,
            email,
            phoneNumber,
            password,
            confirmPassword,
            document: {
                name: file.name,
                type: file.type,
                data: base64Data
            }
        };

        console.log(JSON.stringify(payload))

        // Envia para o backend
        try {
            const response = await fetch("http://localhost:8085/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "Login.html";
            } else {
                const error = await response.text();
                alert("Erro ao cadastrar: " + error);
            }
        } catch (err) {
            alert("Falha na comunicação com o servidor.");
            console.error(err);
        }
    });

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
});