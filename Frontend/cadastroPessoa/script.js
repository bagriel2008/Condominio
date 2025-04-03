async function listarMoradores() {
    try {
        const response = await fetch('http://localhost:3030/moradores');
        const data = await response.json();
        const tbody = document.getElementById('moradores-table-body');

        tbody.innerHTML = '';

        data.moradores.forEach(morador => {
            if (!morador.nameOfPeople || morador.nameOfPeople.trim() === '') return; // Ignora valores nulos/vazios

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${morador.id}</td>
                <td>${morador.nameOfPeople}</td>
                <td>${morador.blocoAndApartament || 'N/A'}</td>
                <td>${morador.phoneAndEmail || 'N/A'}</td>
                <td>${morador.status || 'N/A'}</td>
                <td>
                    <button class="edit-btn" onclick="editMorador(${morador.id})">Editar</button>
                    <button class="delete-btn" onclick="deleteMorador(${morador.id})">Deletar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao buscar moradores:", error);
    }
}

document.getElementById('CadastrarMorador').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameOfPeople = document.getElementById('nameOfPeople').value;
    const blocoAndApartament = document.getElementById('blocoAndApartament').value;
    const phoneAndEmail = document.getElementById('phoneAndEmail').value;
    const status = document.getElementById('status').value;

    console.log({ nameOfPeople, blocoAndApartament, phoneAndEmail, status }); // ✅ Verificar os dados antes do envio

    const response = await fetch('http://localhost:3030/cadastroMorador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameOfPeople, blocoAndApartament, phoneAndEmail, status })
    });

    console.log(response); // ✅ Verificar a resposta do servidor

    const results = await response.json();

    if (results.success) {
        alert('Cadastro bem-sucedido!');
        listarMoradores();
    } else {
        alert(`Erro: ${results.message}`);
    }
});

async function editMorador(id) {
    const nameOfPeople = prompt('Novo nome');
    const blocoAndApartament = prompt('Novo bloco e apartamento');
    const phoneAndEmail = prompt('Novo telefone e email');
    const status = prompt('Novo status');



    await fetch(`http://localhost:3030/editPessoa/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameOfPeople, blocoAndApartament, phoneAndEmail, status })
    });


    listarMoradores();

}

async function deleteMorador(id) {
    await fetch(`http://localhost:3030/deleteMorador/${id}`, {
        method: 'DELETE'
    });
    listarMoradores();
}

listarMoradores()