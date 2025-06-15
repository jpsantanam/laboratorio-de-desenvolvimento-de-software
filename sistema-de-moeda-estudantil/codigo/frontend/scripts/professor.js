document.addEventListener('DOMContentLoaded', () => {
    const professorData = JSON.parse(localStorage.getItem('professor'));
    if (!professorData || !professorData.id) {
        showToast('Professor não autenticado. Redirecionando para login...', false);
        setTimeout(() => window.location.href = 'professor-login.html', 2000);
        return;
    }

    const authToken = professorData.token;

    document.getElementById('professorName').textContent = professorData.name || 'Professor';
    document.getElementById('welcomeProfessor').textContent = `Bem-vindo(a), ${professorData.name}!`;

    const saldoMoedasEl = document.getElementById('saldoMoedasProfessor');
    const enviarMoedasForm = document.getElementById('enviarMoedasForm');
    const selectAlunoEl = document.getElementById('selectAluno');
    const quantidadeMoedasEl = document.getElementById('quantidadeMoedas');
    const mensagemReconhecimentoEl = document.getElementById('mensagemReconhecimento');
    const verExtratoProfessorBtn = document.getElementById('verExtratoProfessor');
    const listaExtratoProfessorEl = document.getElementById('listaExtratoProfessor');

    async function carregarExtratoProfessor() {
        const professorData = JSON.parse(localStorage.getItem('professor'));
        const saldoMoedasEl = document.getElementById('saldoMoedasProfessor');
        const listaExtratoProfessorEl = document.getElementById('listaExtratoProfessor');

        if (!professorData || !professorData.id) {
            showToast("Não foi possível identificar o professor para carregar o extrato.", false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/professors/${professorData.id}/extrato`);

            if (response.ok) {
                const data = await response.json();
                saldoMoedasEl.textContent = data.saldoMoedas !== undefined ? data.saldoMoedas : 'Erro';
                listaExtratoProfessorEl.innerHTML = '';

                if (data.transacoes && data.transacoes.length > 0) {
                    data.transacoes.forEach(tx => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item';

                        let destinatarioInfo = `ID Destinatário: ${tx.idDestinatario || 'N/A'}`;

                        if (tx.tipoDestinatario === 'Student' && tx.alunoDestinatario) {
                            const nomeAluno = tx.alunoDestinatario.name || 'Nome não disponível';
                            const emailAluno = tx.alunoDestinatario.email || 'Email não disponível';
                            destinatarioInfo = `<strong>Para</strong>: ${nomeAluno} (${emailAluno})`;
                        } else if (tx.tipoDestinatario) {
                            destinatarioInfo = `Destinatário (${tx.tipoDestinatario}): ID ${tx.idDestinatario || 'N/A'}`;
                        } else if (tx.tipoDestinatario === 'Student' && !tx.alunoDestinatario) {
                            destinatarioInfo = `Para Aluno ID: ${tx.idDestinatario} (Detalhes não carregados)`;
                            console.warn('Transação para aluno, mas dados do alunoDestinatario não vieram do backend:', tx);
                        }

                        li.innerHTML = `
                        <strong>Data:</strong> ${new Date(tx.dataHora).toLocaleString()}<br/>
                        ${destinatarioInfo}<br/>
                        <strong>Quantidade:</strong> ${tx.quantidadeMoedas} moedas<br/>
                        <strong>Mensagem:</strong> ${tx.mensagem || 'N/A'}
                    `;
                        listaExtratoProfessorEl.appendChild(li);
                    });
                } else {
                    listaExtratoProfessorEl.innerHTML = '<li class="list-group-item">Nenhuma transação encontrada.</li>';
                }
            } else {
                saldoMoedasEl.textContent = 'Erro';
                const errorText = await response.text();
                showToast(`Erro ${response.status} ao carregar extrato do professor. ${errorText}`, false);
                console.error('Erro ao carregar extrato:', response.status, errorText);
                listaExtratoProfessorEl.innerHTML = '<li class="list-group-item">Falha ao carregar extrato.</li>';
            }
        } catch (error) {
            saldoMoedasEl.textContent = 'Erro';
            showToast('Erro de conexão ao carregar extrato.', false);
            console.error('Erro de conexão ao carregar extrato:', error);
            listaExtratoProfessorEl.innerHTML = '<li class="list-group-item">Erro de conexão.</li>';
        }
    }

    async function carregarAlunos() {
        selectAlunoEl.innerHTML = '<option value="">Carregando alunos...</option>';
        selectAlunoEl.disabled = true;
        try {
            const responseAlunos = await fetch('http://localhost:3000/students');
            if (!responseAlunos.ok) {
                const errorText = await responseAlunos.text();
                console.error('Erro ao buscar alunos:', responseAlunos.status, errorText);
                showToast(`Erro ${responseAlunos.status} ao carregar lista de alunos.`, false);
                selectAlunoEl.innerHTML = `<option value="">Erro ${responseAlunos.status}</option>`;
                return;
            }
            const alunos = await responseAlunos.json();
            selectAlunoEl.innerHTML = '<option value="">Selecione um aluno</option>';
            if (alunos && alunos.length > 0) {
                alunos.forEach(aluno => {
                    if (aluno && typeof aluno.id !== 'undefined' && typeof aluno.name !== 'undefined' && typeof aluno.email !== 'undefined') {
                        const option = document.createElement('option');
                        option.value = aluno.id;
                        option.textContent = `${aluno.name} (${aluno.email})`;
                        selectAlunoEl.appendChild(option);
                    } else {
                        console.warn('Aluno com dados incompletos recebido do backend:', aluno);
                    }
                });
                selectAlunoEl.disabled = false;
            } else {
                selectAlunoEl.innerHTML = '<option value="">Nenhum aluno encontrado</option>';
            }
        } catch (error) {
            showToast('Erro de conexão ao carregar lista de alunos.', false);
            console.error('Erro ao carregar alunos:', error);
            selectAlunoEl.innerHTML = '<option value="">Erro de conexão</option>';
        }
    }

    async function carregarDadosIniciais() {
        await carregarExtratoProfessor();
        await carregarAlunos();
    }

    enviarMoedasForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const idAlunoDestino = selectAlunoEl.value;
        const quantidade = quantidadeMoedasEl.value;
        const mensagem = mensagemReconhecimentoEl.value;

        if (!idAlunoDestino) {
            showToast('Por favor, selecione um aluno.', false);
            return;
        }
        if (!quantidade || Number(quantidade) <= 0) {
            showToast('Por favor, insira uma quantidade válida de moedas.', false);
            return;
        }
        if (!mensagem.trim()) {
            showToast('Por favor, escreva uma mensagem de reconhecimento.', false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/professors/enviar-moedas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idProfessor: professorData.id,
                    idAlunoDestino,
                    quantidade: Number(quantidade),
                    mensagem
                })
            });

            if (response.ok) {
                const result = await response.json();
                showToast(result.message || 'Moedas enviadas com sucesso!', true);
                if (result.novoSaldoProfessor !== undefined) {
                    saldoMoedasEl.textContent = result.novoSaldoProfessor;
                } else {
                    await carregarExtratoProfessor();
                }
                enviarMoedasForm.reset();
            } else {
                const errorData = await response.json();
                showToast(errorData.message || `Erro ${response.status} ao enviar moedas.`, false);
                console.error('Erro envio moedas:', response.status, errorData);
            }
        } catch (error) {
            showToast('Erro de conexão ao enviar moedas.', false);
            console.error('Erro envio moedas:', error);
        }
    });

    verExtratoProfessorBtn.addEventListener('click', carregarExtratoProfessor);

    carregarDadosIniciais();
});
