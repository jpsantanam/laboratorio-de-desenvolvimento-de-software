document.addEventListener('DOMContentLoaded', () => {
    const formAdicionarInstituicao = document.getElementById('formAdicionarInstituicao');
    const instituicaoNomeInput = document.getElementById('instituicaoNome');
    const listaInstituicoesEl = document.getElementById('listaInstituicoes');

    const formEditarInstituicao = document.getElementById('formEditarInstituicao');
    const editInstituicaoIdInput = document.getElementById('editInstituicaoId');
    const editInstituicaoNomeInput = document.getElementById('editInstituicaoNome');
    const editModalElement = document.getElementById('editInstituicaoModal');
    const editModal = new bootstrap.Modal(editModalElement);

    async function carregarInstituicoes() {
        try {
            const response = await fetch('http://localhost:3000/instituicoes');
            if (response.ok) {
                const instituicoes = await response.json();
                listaInstituicoesEl.innerHTML = '';
                if (instituicoes.length === 0) {
                    listaInstituicoesEl.innerHTML = '<li class="list-group-item">Nenhuma instituição cadastrada.</li>';
                    return;
                }
                instituicoes.forEach(inst => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item d-flex justify-content-between align-items-center';
                    li.textContent = inst.nome;

                    const actionsDiv = document.createElement('div');

                    const editButton = document.createElement('button');
                    editButton.className = 'btn btn-sm btn-warning me-2';
                    editButton.textContent = 'Editar';
                    editButton.onclick = () => abrirModalEdicao(inst);
                    actionsDiv.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-sm btn-danger';
                    deleteButton.textContent = 'Deletar';
                    deleteButton.onclick = () => deletarInstituicao(inst.id, inst.nome);
                    actionsDiv.appendChild(deleteButton);

                    li.appendChild(actionsDiv);
                    listaInstituicoesEl.appendChild(li);
                });
            } else {
                showToast('Erro ao carregar instituições.', false);
                listaInstituicoesEl.innerHTML = '<li class="list-group-item">Erro ao carregar.</li>';
            }
        } catch (error) {
            showToast('Erro de conexão ao carregar instituições.', false);
            console.error("Erro ao carregar:", error);
            listaInstituicoesEl.innerHTML = '<li class="list-group-item">Erro de conexão.</li>';
        }
    }

    formAdicionarInstituicao.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = instituicaoNomeInput.value.trim();
        if (!nome) {
            showToast('Por favor, insira o nome da instituição.', false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/instituicoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome })
            });

            if (response.status === 201) {
                showToast('Instituição adicionada com sucesso!', true);
                instituicaoNomeInput.value = '';
                carregarInstituicoes();
            } else {
                const errorData = await response.json();
                showToast(errorData.message || `Erro ao adicionar instituição (Status: ${response.status})`, false);
            }
        } catch (error) {
            showToast('Erro de conexão ao adicionar instituição.', false);
            console.error("Erro ao adicionar:", error);
        }
    });

    function abrirModalEdicao(instituicao) {
        editInstituicaoIdInput.value = instituicao.id;
        editInstituicaoNomeInput.value = instituicao.nome;
        editModal.show();
    }

    formEditarInstituicao.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = editInstituicaoIdInput.value;
        const nome = editInstituicaoNomeInput.value.trim();

        if (!nome) {
            showToast('O nome não pode ser vazio.', false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/instituicoes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome })
            });
            if (response.ok) {
                showToast('Instituição atualizada com sucesso!', true);
                editModal.hide();
                carregarInstituicoes();
            } else {
                const errorData = await response.json();
                showToast(errorData.message || `Erro ao atualizar (Status: ${response.status})`, false);
            }
        } catch (error) {
            showToast('Erro de conexão ao atualizar.', false);
            console.error("Erro ao atualizar:", error);
        }
    });

    async function deletarInstituicao(id, nome) {
        if (!confirm(`Tem certeza que deseja deletar a instituição "${nome}"?`)) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/instituicoes/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                showToast(`Instituição "${nome}" deletada com sucesso!`, true);
                carregarInstituicoes();
            } else {
                const errorData = await response.json();
                showToast(errorData.message || `Erro ao deletar (Status: ${response.status})`, false);
            }
        } catch (error) {
            showToast('Erro de conexão ao deletar.', false);
            console.error("Erro ao deletar:", error);
        }
    }

    carregarInstituicoes();
});
