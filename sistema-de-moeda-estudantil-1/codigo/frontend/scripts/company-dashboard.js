document.addEventListener('DOMContentLoaded', () => {
    const companyData = JSON.parse(localStorage.getItem('company'));

    if (!companyData || !companyData.id) {
        showToast('Empresa não autenticada. Redirecionando para login...', false);
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    const authToken = companyData.token;

    const companyNameNavEl = document.getElementById('companyNameNav');
    const companyNameWelcomeEl = document.getElementById('companyNameWelcome');
    const logoutButton = document.getElementById('logoutButton');

    if (companyNameNavEl) companyNameNavEl.textContent = companyData.name || 'Empresa';
    if (companyNameWelcomeEl) companyNameWelcomeEl.textContent = companyData.name || 'Empresa';

    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('student');
            localStorage.removeItem('company');
            localStorage.removeItem('professor');
            showToast('Logout realizado com sucesso!', true);
            setTimeout(() => window.location.href = 'index.html', 1000);
        });
    }

    const formCadastrarVantagem = document.getElementById('formCadastrarVantagem');
    const minhasVantagensListEl = document.getElementById('minhasVantagensList');
    const loadingMinhasVantagensEl = document.getElementById('loadingMinhasVantagens');
    const btnAtualizarMinhasVantagens = document.getElementById('btnAtualizarMinhasVantagens');

    async function carregarMinhasVantagens() {
        if (!minhasVantagensListEl || !companyData || !companyData.id) return;

        if (loadingMinhasVantagensEl) loadingMinhasVantagensEl.style.display = 'block';
        minhasVantagensListEl.innerHTML = '';

        try {
            const response = await fetch(`http://localhost:3000/vantagens/empresa/${companyData.id}`, {
            });

            if (loadingMinhasVantagensEl) loadingMinhasVantagensEl.style.display = 'none';

            if (response.ok) {
                const vantagens = await response.json();
                if (vantagens.length > 0) {
                    vantagens.forEach(v => {
                        const item = document.createElement('div');
                        item.className = 'list-group-item list-group-item-action flex-column align-items-start mb-2 shadow-sm rounded';
                        item.innerHTML = `
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${v.nome}</h5>
                                <span class="badge bg-primary rounded-pill">${v.custoMoedas} <i class="bi bi-coin"></i></span>
                            </div>
                            <p class="mb-1">${v.descricao.substring(0, 120)}${v.descricao.length > 120 ? '...' : ''}</p>
                            ${v.foto ? `<div class="mt-2"><img src="${v.foto}" alt="${v.nome}" style="max-width: 100px; max-height: 100px; border-radius: 4px; object-fit: cover;"></div>` : ''}
                            `;
                        minhasVantagensListEl.appendChild(item);
                    });
                } else {
                    minhasVantagensListEl.innerHTML = '<div class="list-group-item text-center">Nenhuma vantagem cadastrada por sua empresa ainda.</div>';
                }
            } else {
                const errorText = await response.text();
                showToast(`Erro ${response.status} ao carregar suas vantagens: ${errorText}`, false);
                minhasVantagensListEl.innerHTML = '<div class="list-group-item text-center">Falha ao carregar vantagens. Tente atualizar.</div>';
            }
        } catch (error) {
            if (loadingMinhasVantagensEl) loadingMinhasVantagensEl.style.display = 'none';
            showToast('Erro de conexão ao carregar suas vantagens.', false);
            minhasVantagensListEl.innerHTML = '<div class="list-group-item text-center">Erro de conexão. Tente atualizar.</div>';
            console.error("Erro ao carregar minhas vantagens:", error);
        }
    }

    if (formCadastrarVantagem) {
        formCadastrarVantagem.addEventListener('submit', async (event) => {
            event.preventDefault();
            const nome = document.getElementById('vantagemNome').value;
            const descricao = document.getElementById('vantagemDescricao').value;
            const foto = document.getElementById('vantagemFoto').value;
            const custoMoedas = document.getElementById('vantagemCusto').value;

            if (!nome || !descricao || !custoMoedas) {
                showToast("Nome, descrição e custo em moedas são obrigatórios.", false);
                return;
            }
            if (Number(custoMoedas) <= 0) {
                showToast("O custo em moedas deve ser um número positivo.", false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/vantagens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idEmpresa: companyData.id,
                        nome,
                        descricao,
                        foto: foto || null,
                        custoMoedas: Number(custoMoedas)
                    })
                });
                if (response.status === 201) {
                    showToast('Vantagem cadastrada com sucesso!', true);
                    formCadastrarVantagem.reset();
                    carregarMinhasVantagens();
                } else {
                    const errorData = await response.json();
                    showToast(errorData.message || `Erro ${response.status} ao cadastrar vantagem.`, false);
                }
            } catch (error) {
                showToast('Erro de conexão ao cadastrar vantagem.', false);
                console.error("Erro ao cadastrar vantagem:", error);
            }
        });
    }

    if (btnAtualizarMinhasVantagens) {
        btnAtualizarMinhasVantagens.addEventListener('click', carregarMinhasVantagens);
    }

    carregarMinhasVantagens();
});
