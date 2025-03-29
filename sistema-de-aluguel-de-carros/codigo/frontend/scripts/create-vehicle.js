document.getElementById('vehicleForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const vehicle = {
        model: document.getElementById('model').value,
        brand: document.getElementById('brand').value,
        year: parseInt(document.getElementById('year').value),
        plate: document.getElementById('plate').value,
    };

    try {
        const response = await fetch('http://localhost:3000/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicle),
        });

        if (response.ok) {
            document.getElementById('vehicleForm').reset();
            showToast('Veículo criado com sucesso!');
        } else {
            showToast('Erro ao criar veículo. Por favor, verifique os dados inseridos.', false);
        }
    } catch (error) {
        showToast('Erro ao conectar ao servidor.', false);
        console.error('Erro:', error);
    }
});