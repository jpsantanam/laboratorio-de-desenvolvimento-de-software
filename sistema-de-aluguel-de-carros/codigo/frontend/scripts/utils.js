function showToast(message, isSuccess) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white ${isSuccess ? 'bg-success' : 'bg-danger'} border-0 show`;
    toast.innerHTML = `
    <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}


async function deleteRent(rentId, callback) {
    try {
        const response = await fetch(`http://localhost:3000/rents/${rentId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            showToast('Aluguel cancelado com sucesso!', true);
            callback();
        } else {
            showToast('Erro ao cancelar o aluguel!', false);
        }
    } catch (error) {
        showToast('Erro na conexão com o servidor!', false);
    }
}
