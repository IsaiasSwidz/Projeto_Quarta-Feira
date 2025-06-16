document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('input-email').value.trim();
    const password = document.getElementById('input-password').value;

    if (!email || !password) {
        alert("Preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8085/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem("auth_token", token); // Armazena o token
            window.location.href = "Main.html"; // Redireciona
        } else {
            const error = await response.text();
            alert("Erro ao fazer login: " + error);
        }
    } catch (err) {
        alert("Falha na comunicação com o servidor.");
        console.error(err);
    }
});