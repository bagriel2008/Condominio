async function cadastroCars() {
    const response = await fetch('http://localhost:3030/cadastroCarro')
    const data = await response.json()
    const tbody = document.querySelector('tbody')
    tbody.innerHTML = ''

    data.cadastroCarro.forEach(car => {

        const row = document.createElement('tr')
        row.innerHTML = `
                <td>${veiculos.id}</td>
                <td>${veiculos.morador_id}</td>
                <td>${veiculos.plate}</td>
                <td>${veiculos.modelAndColor}</td>
                <td>${veiculos.vacancy}</td>

                <td>
                    <button  class = "edit-btn" onclick="editCars(${veiculos.id})">Editar </button>
                    <button class = "delete-btn" onclick="deleteCars(${veiculos.id})">Deletar </button>

                </td>

            `
        tbody.appendChild(row)


    }
    );
}

document.querySelector('.car-form form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.getElementById('car-name').value
    const placa = document.getElementById('car-placa').value



    await fetch('http://localhost:3030/cadastroCarro', {

        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({name, placa})
    })

    document.querySelector('.car-form form').reset()
    cadastroCars()
})

async function editCars(id) {
    const name = prompt('novo nome')

    await fetch(`http://localhost:3030/cadastroCarro/${id}`, {
        method: 'put',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name }),
        body: JSON.stringify({ placa })

    })

    cadastroCars()

}


async function deleteCars(id) {
    await fetch(`http://localhost:3030/cadastroCarro/${id}`,{
        method: 'DELETE'
    })
    cadastroCars()
}

cadastroCars()