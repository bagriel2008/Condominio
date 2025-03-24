const form = document.getElementById('CadastrarMorador')

form.addEventListener('submit', async(e)=> {
    e.preventDefault()

    const name = document.getElementById('name').value
    const blocoAndApartament = document.getElementById('blocoAndApartament').value
    const phoneAndEmail = document.getElementById('phoneAndEmail').value
    const status = document.getElementById('status').value

    const response = await fetch('http://localhost:3030/cadastroMorador', {   
        method:'POST',
        headers:{'Content-Type': ' application/json'},
        body: JSON.stringify({name, blocoAndApartament,phoneAndEmail, status})
    })
    console.log(response);
    const results = await response.json()

    if (results.success) {
        alert('cadastro bem sucedido')
        window.location.href=''
    } else {
        alert('Falta alguma informação')
    }

})