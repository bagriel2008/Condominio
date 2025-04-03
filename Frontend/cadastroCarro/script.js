async function listarVeiculos() {
    try {
        const response = await fetch('http://localhost:3030/veiculos');
        const data = await response.json();
        const tbody = document.getElementById('veiculos-table-body');

        tbody.innerHTML = '';

        data.veiculos.forEach(veiculo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${veiculo.id}</td>
                <td>${veiculo.owner_name}</td>
                <td>${veiculo.plate}</td>
                <td>${veiculo.modelAndColor}</td>
                <td>${veiculo.vacancy}</td>
                <td>
                    <button class="edit-btn" onclick="editCarro(${veiculo.id})">Editar</button>
                    <button class="delete-btn" onclick="deleteCarro(${veiculo.id})">Deletar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao buscar veículos:", error);
    }
}

document.getElementById('CadastrarCarro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const owner_name = document.getElementById('owner_name').value;
    const plate = document.getElementById('plate').value;
    const modelAndColor = document.getElementById('modelAndColor').value;
    const vacancy = document.getElementById('vacancy').value;

    const response = await fetch('http://localhost:3030/cadastroCarro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner_name, plate, modelAndColor, vacancy })
    });

    const result = await response.json();

    if (result.success) {
        alert('Cadastro bem-sucedido!');
    } else {
        alert('Erro ao cadastrar veículo!');
    }

    listarVeiculos()
});

async function editCarro(id) {
    const owner_name = prompt('novo nome')
    const modelAndColor = prompt('novo modelo e cor')
    const plate = prompt('novo placa')
    const vacancy = prompt('nova vaga')


    await fetch(`http://localhost:3030/editCarro/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ owner_name, modelAndColor, plate, vacancy })

    })

    listarVeiculos()

}


async function deleteCarro(id) {
    await fetch(`http://localhost:3030/deleteCars/${id}`, {
        method: 'DELETE'
    })
    listarVeiculos()
}

listarVeiculos()