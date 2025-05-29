document.addEventListener('DOMContentLoaded', () => {
    let studentData = JSON.parse(localStorage.getItem('student'));

    if (!studentData || !studentData.id) {
        showToast('Aluno não autenticado. Redirecionando para login...', false);
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }

    const studentNameNavEl = document.getElementById('studentNameNav');
    const studentNameWelcomeEl = document.getElementById('studentNameWelcome');
    const studentBalanceEl = document.getElementById('studentBalance');
    const listaExtratoAlunoEl = document.getElementById('listaExtratoAluno');
    const verExtratoAlunoBtn = document.getElementById('verExtratoAluno');
    const vantagensResgatadasListEl = document.getElementById('vantagensResgatadasList');
    const verMinhasVantagensBtn = document.getElementById('verMinhasVantagens');
    const benefitsListEl = document.getElementById('benefitsList');
    const loadingBenefitsMessageEl = document.getElementById('loadingBenefitsMessage');
    const logoutButton = document.getElementById('logoutButton');

    if (studentNameNavEl) studentNameNavEl.textContent = studentData.name || 'Aluno';
    if (studentNameWelcomeEl) studentNameWelcomeEl.textContent = studentData.name || 'Aluno';

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

    function criarElementoItemExtrato(tx) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        let details = `
            <strong>Data:</strong> ${new Date(tx.dataHora).toLocaleString()}<br/>
            <strong>Tipo:</strong> ${tx.tipoTransacao || 'N/A'}<br/> 
            <strong>Moedas:</strong> <span class="${tx.quantidadeMoedas > 0 ? 'text-success' : 'text-danger'} fw-bold">${tx.quantidadeMoedas}</span>`;
        if (tx.mensagem) {
            details += `<br/><strong>Detalhe:</strong> ${tx.mensagem}`;
        }
        li.innerHTML = details;
        return li;
    }

    async function carregarExtratoAluno() {
        if (!studentData || !studentData.id || !listaExtratoAlunoEl) return;
        listaExtratoAlunoEl.innerHTML = '<li class="list-group-item text-center">Carregando extrato...</li>';
        try {
            const response = await fetch(`http://localhost:3000/students/${studentData.id}/extrato`);
            listaExtratoAlunoEl.innerHTML = '';
            if (response.ok) {
                const data = await response.json();
                studentData.balance = data.balance !== undefined ? data.balance : studentData.balance;
                localStorage.setItem('student', JSON.stringify(studentData));
                studentBalanceEl.textContent = studentData.balance;
                if (data.transacoes && data.transacoes.length > 0) {
                    const fragment = document.createDocumentFragment();
                    data.transacoes.forEach(tx => {
                        fragment.appendChild(criarElementoItemExtrato(tx));
                    });
                    listaExtratoAlunoEl.appendChild(fragment);
                } else {
                    listaExtratoAlunoEl.innerHTML = '<li class="list-group-item text-center">Nenhuma transação encontrada.</li>';
                }
            } else {
                studentBalanceEl.textContent = 'Erro';
                const errorText = await response.text();
                showToast(`Erro ${response.status} ao carregar extrato: ${errorText}`, false);
                listaExtratoAlunoEl.innerHTML = '<li class="list-group-item text-center">Falha ao carregar extrato.</li>';
            }
        } catch (error) {
            studentBalanceEl.textContent = 'Erro';
            showToast('Erro de conexão ao carregar extrato.', false);
            console.error('Erro extrato aluno:', error);
            listaExtratoAlunoEl.innerHTML = '<li class="list-group-item text-center">Erro de conexão.</li>';
        }
    }

    function criarElementoVantagemResgatada(redemption) {
        const advantage = redemption.vantagem || {};
        const company = advantage.empresa || {};
        const advantageName = advantage.nome || 'Vantagem Indisponível';
        const advantagePhotoURL = (advantage.foto && advantage.foto.trim() !== '') ? advantage.foto : null;
        const companyName = company.name || 'Empresa Indisponível';
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item py-3';
        let photoHTML = '';
        if (advantagePhotoURL) {
            photoHTML = `
                <div class="mb-2 text-center" style="max-width: 200px; margin-left: auto; margin-right: auto;">
                    <img src="${advantagePhotoURL}" alt="${advantageName}" class="img-fluid rounded" style="max-height: 120px; object-fit: contain;">
                </div>`;
        } else {
            photoHTML = '<p class="small text-muted text-center mb-2">(Sem imagem para esta vantagem)</p>';
        }
        listItem.innerHTML = `
            <div class="d-flex w-100 justify-content-between align-items-center mb-1">
                <h5 class="mb-0 text-primary">${advantageName}</h5>
                <span class="badge bg-success rounded-pill px-3 py-2">${redemption.codigoResgate}</span>
            </div>
            <p class="mb-2 small text-muted">
                <i class="bi bi-shop me-1"></i>Resgatado de: <strong>${companyName}</strong>
            </p>
            ${photoHTML}
            <div class="mt-1 small">
                <p class="mb-1 text-muted"><i class="bi bi-calendar-check me-1"></i><strong>Data:</strong> ${new Date(redemption.dataHora).toLocaleString()}</p>
                <p class="mb-0 text-muted"><i class="bi bi-coin me-1"></i><strong>Custo:</strong> ${redemption.custoMoedasNoMomentoDaTroca} moedas</p>
            </div>
        `;
        return listItem;
    }

    async function loadRedeemedAdvantages() {
        const studentData = JSON.parse(localStorage.getItem('student'));
        const vantagensResgatadasListEl = document.getElementById('vantagensResgatadasList');
        if (!vantagensResgatadasListEl || !studentData || !studentData.id) {
            console.error("Elemento UL 'vantagensResgatadasList' não encontrado ou aluno não logado.");
            if (vantagensResgatadasListEl) vantagensResgatadasListEl.innerHTML = '<li class="list-group-item text-center text-danger">Informações do aluno não encontradas.</li>';
            return;
        }
        vantagensResgatadasListEl.innerHTML = '<li class="list-group-item text-center">Carregando suas vantagens resgatadas...</li>';
        try {
            const response = await fetch(`http://localhost:3000/redemptions/aluno/${studentData.id}`);
            vantagensResgatadasListEl.innerHTML = '';
            if (response.ok) {
                const redemptions = await response.json();
                if (redemptions && redemptions.length > 0) {
                    const fragment = document.createDocumentFragment();
                    redemptions.forEach(redemption => {
                        const listItemElement = criarElementoVantagemResgatada(redemption);
                        fragment.appendChild(listItemElement);
                    });
                    vantagensResgatadasListEl.appendChild(fragment);
                } else {
                    vantagensResgatadasListEl.innerHTML = '<li class="list-group-item text-center">Você ainda não resgatou nenhuma vantagem.</li>';
                }
            } else {
                const errorText = await response.text();
                showToast(`Erro ${response.status} ao carregar vantagens resgatadas: ${errorText}`, false);
                vantagensResgatadasListEl.innerHTML = `<li class="list-group-item text-center text-danger">Falha ao carregar: ${response.status}</li>`;
                console.error('Erro HTTP ao carregar vantagens resgatadas:', response.status, errorText);
            }
        } catch (error) {
            showToast('Erro de conexão ao carregar vantagens resgatadas.', false);
            console.error('Erro de conexão ao carregar vantagens resgatadas:', error);
            vantagensResgatadasListEl.innerHTML = '<li class="list-group-item text-center text-danger">Erro de conexão.</li>';
        }
    }

    function criarElementoVantagemDisponivel(vantagem, currentStudentBalance) {
        if (!vantagem || typeof vantagem.id === 'undefined' || !vantagem.nome || typeof vantagem.custoMoedas === 'undefined') {
            console.warn('Vantagem disponível com dados incompletos recebida:', vantagem);
            return null;
        }
        const canAfford = currentStudentBalance >= vantagem.custoMoedas;
        const empresaNome = (vantagem.empresa && vantagem.empresa.name) ? vantagem.empresa.name : 'Empresa Desconhecida';
        const descricaoCurta = vantagem.descricao ? (vantagem.descricao.substring(0, 100) + (vantagem.descricao.length > 100 ? '...' : '')) : 'Sem descrição.';
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 col-lg-3 mb-4';
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card h-100 shadow-sm card-advantage';
        cardDiv.innerHTML = `
            <img src="${vantagem.foto || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}" class="card-img-top card-img-top-custom" alt="${vantagem.nome}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${vantagem.nome}</h5>
                <p class="card-text small text-muted">Oferecido por: ${empresaNome}</p>
                <p class="card-text flex-grow-1 small">${descricaoCurta}</p>
                <p class="card-text fs-5 fw-bold">Custo: ${vantagem.custoMoedas} <i class="bi bi-coin"></i></p>
                <button class="btn btn-${canAfford ? 'success' : 'secondary'} mt-auto btn-trocar-vantagem" 
                        data-id-vantagem="${vantagem.id}" 
                        data-nome-vantagem="${vantagem.nome}"
                        data-custo-vantagem="${vantagem.custoMoedas}"
                        ${!canAfford ? 'disabled title="Saldo insuficiente"' : ''}>
                    ${canAfford ? `Trocar (${vantagem.custoMoedas} <i class="bi bi-coin"></i>)` : 'Saldo Insuficiente'}
                </button>
            </div>
        `;
        const trocarButton = cardDiv.querySelector('.btn-trocar-vantagem');
        if (trocarButton) {
            trocarButton.addEventListener('click', handleTrocarVantagemClick);
        }
        colDiv.appendChild(cardDiv);
        return colDiv;
    }

    async function loadAvailableAdvantages() {
        if (!benefitsListEl || !loadingBenefitsMessageEl) return;
        loadingBenefitsMessageEl.style.display = 'block';
        benefitsListEl.innerHTML = '';
        try {
            const response = await fetch('http://localhost:3000/vantagens');
            loadingBenefitsMessageEl.style.display = 'none';
            if (response.ok) {
                const vantagens = await response.json();
                if (vantagens && vantagens.length > 0) {
                    const currentStudentBalance = studentData.balance || 0;
                    studentBalanceEl.textContent = currentStudentBalance;
                    const fragment = document.createDocumentFragment();
                    vantagens.forEach(vantagem => {
                        const advantageElement = criarElementoVantagemDisponivel(vantagem, currentStudentBalance);
                        if (advantageElement) {
                            fragment.appendChild(advantageElement);
                        }
                    });
                    benefitsListEl.appendChild(fragment);
                } else {
                    benefitsListEl.innerHTML = '<p class="text-center col-12">Nenhuma vantagem disponível no momento.</p>';
                }
            } else {
                const errorText = await response.text();
                showToast(`Erro ${response.status} ao carregar vantagens: ${errorText}`, false);
                benefitsListEl.innerHTML = '<p class="text-center col-12">Falha ao carregar vantagens.</p>';
            }
        } catch (error) {
            loadingBenefitsMessageEl.style.display = 'none';
            showToast('Erro de conexão ao carregar vantagens.', false);
            benefitsListEl.innerHTML = '<p class="text-center col-12">Erro de conexão ao buscar vantagens.</p>';
        }
    }

    function handleTrocarVantagemClick(event) {
        const button = event.currentTarget;
        const idVantagem = button.getAttribute('data-id-vantagem');
        const nomeVantagem = button.getAttribute('data-nome-vantagem');
        const custoVantagem = button.getAttribute('data-custo-vantagem');
        if (button.disabled) {
            showToast("Saldo insuficiente para esta vantagem.", false);
            return;
        }
        if (confirm(`Deseja realmente trocar ${custoVantagem} moedas pela vantagem "${nomeVantagem}"?`)) {
            trocarVantagem(idVantagem);
        }
    }

    async function trocarVantagem(idVantagem) {
        if (!studentData || !studentData.id) { return; }
        try {
            const response = await fetch('http://localhost:3000/redemptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idAluno: studentData.id, idVantagem: Number(idVantagem) })
            });
            if (response.ok) {
                const result = await response.json();
                showToast(`${result.message || 'Vantagem resgatada!'} Código: ${result.redemption.codigoResgate}`, true);
                if (result.novoSaldo !== undefined) {
                    studentData.balance = result.novoSaldo;
                    localStorage.setItem('student', JSON.stringify(studentData));
                    studentBalanceEl.textContent = studentData.balance;
                }
                await carregarExtratoAluno();
                await loadRedeemedAdvantages();
                await loadAvailableAdvantages();
            } else {
                const errorData = await response.json();
                showToast(errorData.message || errorData || 'Erro ao trocar vantagem.', false);
            }
        } catch (error) {
            showToast('Erro de conexão ao trocar vantagem.', false);
        }
    }

    if (verExtratoAlunoBtn) verExtratoAlunoBtn.addEventListener('click', carregarExtratoAluno);
    if (verMinhasVantagensBtn) verMinhasVantagensBtn.addEventListener('click', loadRedeemedAdvantages);

    async function initDashboard() {
        await carregarExtratoAluno();
        await loadRedeemedAdvantages();
        await loadAvailableAdvantages();
    }
    initDashboard();
});
