document.addEventListener('DOMContentLoaded', () => {
    // Form and input elements
    const studentForm = document.getElementById('studentForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const rgInput = document.getElementById('rg');
    const addressInput = document.getElementById('address');
    const passwordContainer = document.getElementById('passwordContainer');
    const newPasswordContainer = document.getElementById('newPasswordContainer');
    const confirmNewPasswordContainer = document.getElementById('confirmNewPasswordContainer');
    const passwordInput = document.getElementById('password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmNewPasswordInput = document.getElementById('confirm-new-password');

    // Buttons
    const editButton = document.getElementById('editButton');
    const cancelEditButton = document.getElementById('cancelEditButton');
    const editButtons = document.getElementById('editButtons');
    const editModeButtons = document.getElementById('editModeButtons');
    const deleteAccountButton = document.getElementById('deleteAccountButton');

    // Load student data from localStorage
    let studentData = JSON.parse(localStorage.getItem('student')) || {};

    // Populates form fields
    function populateForm(data) {
        nameInput.value = data.name || '';
        emailInput.value = data.email || '';
        cpfInput.value = data.cpf || '';
        rgInput.value = data.rg || '';
        addressInput.value = data.address || '';
    }

    // Sets the readOnly property of inputs
    function setInputsReadonly(isReadonly) {
        nameInput.readOnly = isReadonly;
        emailInput.readOnly = isReadonly;
        cpfInput.readOnly = isReadonly;
        rgInput.readOnly = isReadonly;
        addressInput.readOnly = isReadonly;
    }

    // Enable view mode: fields are read-only, password label and placeholder are "Senha", new password fields hidden, and only Edit button visible.
    function enableViewMode() {
        populateForm(studentData);
        setInputsReadonly(true);

        passwordContainer.classList.add('d-none');
        newPasswordContainer.classList.add('d-none');
        confirmNewPasswordContainer.classList.add('d-none');

        // Show only the Edit button
        editButtons.classList.remove('d-none');
        editModeButtons.classList.add('d-none');
    }

    // Enable edit mode: fields become editable, new password fields appear, password field changes to "Senha Atual"
    function enableEditMode() {
        setInputsReadonly(false);

        passwordContainer.classList.remove('d-none');
        newPasswordContainer.classList.remove('d-none');
        confirmNewPasswordContainer.classList.remove('d-none');

        // Hide the Edit button, show Cancel and Salvar buttons
        editButtons.classList.add('d-none');
        editModeButtons.classList.remove('d-none');
    }

    // Initialize page in view mode
    enableViewMode();

    // Edit button event
    editButton.addEventListener('click', () => {
        enableEditMode();
    });

    // Cancel edit: revert any changes and return to view mode
    cancelEditButton.addEventListener('click', () => {
        enableViewMode();
    });

    // Form submission: validate and update account
    studentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Prepare updated data object without password by default.
        const updatedData = {
            name: nameInput.value,
            email: emailInput.value,
            cpf: cpfInput.value,
            rg: rgInput.value,
            address: addressInput.value
        };

        // If new password fields are filled, validate and include in updatedData.
        if (newPasswordInput.value.trim() || confirmNewPasswordInput.value.trim()) {
            // If attempting password change, validate the current password.
            if (passwordInput.value.trim() !== studentData.password) {
                showToast('Senha atual incorreta!', false);
                return;
            }
            // Validate that new password is different from the current password.
            else if (newPasswordInput.value.trim() === passwordInput.value.trim()) {
                showToast('A nova senha deve ser diferente da senha atual!', false);
                return;
            }
            // Validate that new password and its confirmation match.
            else if (newPasswordInput.value !== confirmNewPasswordInput.value) {
                showToast('Nova senha e confirmação não coincidem!', false);
                return;
            }
            // Password is valid, proceed to update.
            else {
                updatedData.password = newPasswordInput.value;
            }
        }

        try {
            // PUT request to update student account; adjust the endpoint as needed.
            const response = await fetch(`http://localhost:3000/students/${studentData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                const dataFromServer = await response.json();
                showToast('Conta atualizada com sucesso!', true);
                // Update localStorage with the new data and update the form.
                localStorage.setItem('student', JSON.stringify(dataFromServer));
                studentData = dataFromServer;
                enableViewMode();
            } else {
                showToast('Erro ao atualizar conta.', false);
            }
        } catch (error) {
            showToast('Erro ao conectar com o servidor.', false);
            console.error(error);
        }
    });

    // Delete account process: show confirmation modal then attempt delete via DELETE request.
    deleteAccountButton.addEventListener('click', () => {
        const deleteModalElement = document.getElementById('deleteStudent');
        const deleteModal = new bootstrap.Modal(deleteModalElement);
        deleteModal.show();
    });

    document.getElementById('confirm-delete-student-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/students/${studentData.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                showToast('Conta deletada com sucesso!', true);
                localStorage.removeItem('student');
                // Redirect to the home or login page
                window.location.href = 'index.html';
            } else {
                showToast('Erro ao deletar conta.', false);
            }
        } catch (error) {
            showToast('Erro na conexão com o servidor.', false);
            console.error(error);
        }
    });
});