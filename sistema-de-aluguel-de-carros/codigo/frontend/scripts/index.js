document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/customers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            showToast('Login realizado com sucesso!', true);
            localStorage.setItem('user', JSON.stringify(await response.json()));
            setTimeout(() => (window.location.href = 'customer.html'), 100);
        } else {
            showToast('E-mail ou senha inválidos!', false);
        }
    } catch (error) {
        showToast('Erro ao conectar ao servidor!', false);
        console.error('Erro:', error);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('user');
});
