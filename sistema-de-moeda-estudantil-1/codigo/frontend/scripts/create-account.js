document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const userType = document.getElementById('userType');
    const studentFieldsContainer = document.getElementById('studentFieldsContainer');
    const companyFieldsContainer = document.getElementById('companyFieldsContainer');
    const cpfInput = document.getElementById('cpf');
    const rgInput = document.getElementById('rg');
    const addressInput = document.getElementById('address');
    const instituicaoEnsinoSelect = document.getElementById('instituicaoEnsino');
    const cnpjInput = document.getElementById('cnpj');

    async function carregarInstituicoesParaSelect() {
        if (!instituicaoEnsinoSelect) return;
        try {
            const response = await fetch('http://localhost:3000/instituicoes');
            if (response.ok) {
                const instituicoes = await response.json();
                instituicaoEnsinoSelect.innerHTML = '<option value="">Selecione uma instituição</option>';
                if (instituicoes.length === 0) {
                    instituicaoEnsinoSelect.innerHTML = '<option value="">Nenhuma instituição disponível</option>';
                    instituicaoEnsinoSelect.disabled = true;
                } else {
                    instituicaoEnsinoSelect.disabled = false;
                    instituicoes.forEach(inst => {
                        const option = document.createElement('option');
                        option.value = inst.id;
                        option.textContent = inst.nome;
                        instituicaoEnsinoSelect.appendChild(option);
                    });
                }
            } else {
                instituicaoEnsinoSelect.innerHTML = '<option value="">Erro ao carregar instituições</option>';
                instituicaoEnsinoSelect.disabled = true;
            }
        } catch (error) {
            console.error("Erro ao carregar instituições no select:", error);
            instituicaoEnsinoSelect.innerHTML = '<option value="">Erro de conexão</option>';
            instituicaoEnsinoSelect.disabled = true;
        }
    }

    userType.addEventListener('change', function () {
        studentFieldsContainer.classList.add('d-none');
        companyFieldsContainer.classList.add('d-none');
        [cpfInput, rgInput, addressInput, instituicaoEnsinoSelect, cnpjInput].forEach(el => el.required = false);

        if (userType.value === 'students') {
            studentFieldsContainer.classList.remove('d-none');
            cpfInput.required = true;
            rgInput.required = true;
            addressInput.required = true;
            instituicaoEnsinoSelect.required = true;
            if (instituicaoEnsinoSelect.options.length <= 1 || instituicaoEnsinoSelect.firstChild.value === "" || instituicaoEnsinoSelect.firstChild.textContent.includes("Erro")) {
                carregarInstituicoesParaSelect();
            }
        } else if (userType.value === 'companies') {
            companyFieldsContainer.classList.remove('d-none');
            cnpjInput.required = true;
        }
    });

    userForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (passwordInput.value !== confirmPasswordInput.value) {
            showToast('As senhas não coincidem!', false);
            return;
        }

        const requestBody = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        if (userType.value === 'students') {
            requestBody.cpf = cpfInput.value;
            requestBody.rg = rgInput.value;
            requestBody.address = addressInput.value;
            requestBody.idInstituicaoEnsino = instituicaoEnsinoSelect.value;
            if (!requestBody.idInstituicaoEnsino) {
                showToast('Por favor, selecione uma instituição de ensino.', false);
                return;
            }
        } else if (userType.value === 'companies') {
            requestBody.cnpj = cnpjInput.value;
        }

        try {
            const response = await fetch(`http://localhost:3000/${userType.value}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                showToast('Cadastro realizado com sucesso!', true);
                localStorage.setItem(singularize(userType.value), JSON.stringify(data));
                setTimeout(() => {
                    window.location.href = `${singularize(userType.value)}.html`;
                }, 1000);
            } else {
                const errorData = await response.json();
                showToast(errorData.message || 'Erro ao cadastrar usuário. Verifique os dados.', false);
            }
        } catch (error) {
            showToast('Erro ao conectar com o servidor.', false);
            console.error('Erro:', error);
        }
    });

    if (userType.value) {
        userType.dispatchEvent(new Event('change'));
    }
});
