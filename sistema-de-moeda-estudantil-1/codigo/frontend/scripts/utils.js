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

function singularize(str) {
    if (!str) return '';
    if (str.endsWith('ies')) return str.slice(0, -3) + 'y';
    else if (str.endsWith('s')) return str.slice(0, -1);
    return str;
}