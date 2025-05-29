document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('student');
    localStorage.removeItem('company');
    localStorage.removeItem('professor');

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;

        if (!userType) {
            showToast('Por favor, selecione o tipo de usuário.', false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/${userType}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const responseData = await response.json();
                showToast('Login realizado com sucesso!', true);
                localStorage.setItem(singularize(userType), JSON.stringify(responseData));
                setTimeout(() => (window.location.href = `${singularize(userType)}.html`), 200);
            } else {
                const errorData = await response.json();
                showToast(errorData.message || 'E-mail ou senha inválidos!', false);
            }
        } catch (error) {
            showToast('Erro ao conectar ao servidor!', false);
            console.error('Erro:', error);
        }
    });
});