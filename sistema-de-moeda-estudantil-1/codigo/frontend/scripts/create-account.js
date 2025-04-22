document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const userType = document.getElementById('userType');

    const cpf = document.getElementById('cpf');
    const rg = document.getElementById('rg');
    const address = document.getElementById('address');
    const studentExclusiveElements = [cpf, rg, address];

    const cnpj = document.getElementById('cnpj');
    const companyExclusiveElements = [cnpj];

    // HIDE AND SHOW EXCLUSIVE FIELD ELEMENTS
    userType.addEventListener('change', function () {
        console.log("changed!");
        if (userType.value === 'students') {
            console.log("students!");
            studentExclusiveElements.forEach(element => {
                element.parentElement.classList.remove('d-none');
                element.required = true;
            });
            companyExclusiveElements.forEach(element => {
                element.parentElement.classList.add('d-none');
                element.required = false;
            });
        } else if (userType.value === 'companies') {
            console.log("companies!");
            companyExclusiveElements.forEach(element => {
                element.parentElement.classList.remove('d-none');
                element.required = true;
            });
            studentExclusiveElements.forEach(element => {
                element.parentElement.classList.add('d-none');
                element.required = false;
            });
        }
    });

    // SUBMIT FORM
    userForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (password.value !== confirmPassword.value) {
            showToast('As senhas não coincidem!', false);
            return;
        }

        const requestBody = {
            name: name.value,
            email: email.value,
            password: password.value
        };

        if (userType.value === 'students') studentExclusiveElements.forEach(element => requestBody[element.id] = element.value);
        else if (userType.value === 'companies') companyExclusiveElements.forEach(element => requestBody[element.id] = element.value);

        try {
            const response = await fetch(`http://localhost:3000/${userType.value}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                showToast('Cadastro realizado com sucesso!', true);
                window.location.href = `${singularize(userType.value)}.html`;
            } else showToast('Erro ao cadastrar usuário. Verifique os dados.', false);
        } catch (error) {
            showToast('Erro ao conectar com o servidor.', false);
            console.error('Erro:', error);
        }
    });
});