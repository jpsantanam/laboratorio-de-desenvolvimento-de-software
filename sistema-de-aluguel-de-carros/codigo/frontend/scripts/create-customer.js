function showToast(message, isSuccess = true) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white ${isSuccess ? 'bg-success' : 'bg-danger'} border-0 show`;
    toast.innerHTML = `
    <div class="d-flex">
        <div class="toast-body">
            ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

document.getElementById('customerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showToast('As senhas não coincidem!', false);
        return;
    }

    const customer = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: password,
        rg: document.getElementById('rg').value,
        cpf: document.getElementById('cpf').value,
        address: document.getElementById('address').value,
        job: document.getElementById('job').value,
        employer: document.getElementById('employer').value,
        income: [
            Number(document.getElementById('income1').value),
            Number(document.getElementById('income2').value),
            Number(document.getElementById('income3').value),
        ],
    };

    try {
        const response = await fetch('http://localhost:3000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });

        if (response.ok) {
            showToast('Cadastro realizado com sucesso!');
            window.location.href = 'index.html';
        } else {
            showToast('Erro ao cadastrar cliente. Verifique os dados.', false);
        }
    } catch (error) {
        showToast('Erro ao conectar com o servidor.', false);
        console.error('Erro:', error);
    }
});
