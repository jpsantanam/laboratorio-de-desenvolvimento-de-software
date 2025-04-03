document.addEventListener('DOMContentLoaded', function () {
    loadRents();
});

async function loadRents() {
    const customerId = JSON.parse(localStorage.getItem('user')).id;
    fetch(`http://localhost:3000/customers/${customerId}`)
        .then((response) => response.json())
        .then((data) => {
            const rentalsTableBody = document.getElementById('rentalsTableBody');
            rentalsTableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela
            data.Rents.forEach((rent) => {
                const row = `<tr>
                <td>${rent.id}</td>
                <td>${rent.Vehicle.model}</td>
                <td>${rent.Vehicle.brand}</td>
                <td>${rent.Vehicle.year}</td>
                <td>${rent.Vehicle.plate}</td>
                <td>${new Date(rent.startDate).toLocaleDateString('pt-BR')}</td>
                <td>${new Date(rent.endDate).toLocaleDateString('pt-BR')}</td>
                <td>${rent.status}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteRent(${rent.id}, loadRents)">Cancelar</button>
            </tr>`;
                rentalsTableBody.innerHTML += row;
            });
        })
        .catch((error) => console.error('Erro ao carregar aluguéis:', error));
}
