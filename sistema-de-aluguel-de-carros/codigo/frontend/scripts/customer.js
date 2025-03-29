async function fetchVehicles() {
    try {
        const response = await fetch('http://localhost:3000/vehicles');
        if (response.ok) {
            return response.json();
        } else {
            showToast('Erro ao carregar os veículos!', false);
        }
    } catch (error) {
        showToast('Erro na conexão com o servidor!', false);
    }
}

async function loadVehicles() {
    const vehicleList = document.getElementById('vehicleList');
    vehicleList.innerHTML = '';

    const customerId = JSON.parse(localStorage.getItem('user')).id;
    let vehicles = await fetchVehicles();

    vehicles.forEach(async (vehicle) => {
        const response = await fetch(`http://localhost:3000/rents?vehicleId=${vehicle.id}&customerId=${customerId}`);
        const rent = await response.json();

        const isRentedByCustomer = rent.length > 0;

        const card = `
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">${vehicle.model} - ${vehicle.brand}</h5>
                                <p class="card-text">Ano: ${vehicle.year}</p>
                                <p class="card-text">Placa: ${vehicle.plate}</p>
                                <button class="btn ${isRentedByCustomer ? 'btn-danger' : 'btn-success'} w-100" 
                                    onclick="${isRentedByCustomer ? `deleteRent(${rent[0].id}, loadVehicles)` : `rentVehicle(${vehicle.id})`}">
                                    ${isRentedByCustomer ? 'Cancelar Aluguel' : 'Alugar'}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
        vehicleList.innerHTML += card;
    });
}

async function rentVehicle(vehicleId) {
    try {
        const customerId = JSON.parse(localStorage.getItem('user')).id;
        console.log(customerId);
        const response = await fetch('http://localhost:3000/rents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vehicleId, customerId: customerId, status: 'Em andamento' }), // Trocar customerId dinamicamente
        });

        if (response.ok) {
            showToast('Veículo alugado com sucesso!', true);
            loadVehicles();
        } else {
            showToast('Erro ao alugar o veículo!', false);
        }
    } catch (error) {
        showToast('Erro na conexão com o servidor!', false);
    }
}

document.addEventListener('DOMContentLoaded', loadVehicles);
