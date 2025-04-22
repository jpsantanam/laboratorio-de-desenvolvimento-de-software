document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('student');
    localStorage.removeItem('company');
    /* localStorage.removeItem('college');
    localStorage.removeItem('teacher'); */

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('userType').value;

        try {
            const response = await fetch(`http://localhost:3000/${userType}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                showToast('Login realizado com sucesso!', true);
                localStorage.setItem(singularize(userType), JSON.stringify(await response.json()));
                setTimeout(() => (window.location.href = `${singularize(userType)}.html`), 100);
            } else {
                showToast('E-mail ou senha inválidos!', false);
            }
        } catch (error) {
            showToast('Erro ao conectar ao servidor!', false);
            console.error('Erro:', error);
        }
    });
});