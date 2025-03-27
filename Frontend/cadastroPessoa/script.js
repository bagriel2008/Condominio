const formLogin = document.getElementById('login')

form.addEventListener('submit', async(e)=> {
    e.preventDefault()

    const name = document.getElementById('name').value
    const password = document.getElementById('password').value

    const response = await fetch('http://localhost:3030/cadastroMorador', {   
        method:'GET',
        headers:{'Content-Type': ' application/json'},
        body: JSON.stringify({name, password})
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



const formCadastroMorador = document.getElementById('CadastrarMorador')

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

const formCadastroCarro = document.getElementById('CadastrarCarro')

form.addEventListener('submit', async(e)=> {
    e.preventDefault()

    const plate = document.getElementById('plate').value
    const modelAndColor = document.getElementById('modelAndColor').value
    const vacancy = document.getElementById('vacancy').value
    const morador_id = document.getElementById('morador_id').value

    const response = await fetch('http://localhost:3030/cadastroMorador', {   
        method:'POST',
        headers:{'Content-Type': ' application/json'},
        body: JSON.stringify({plate, modelAndColor,vacancy, morador_id})
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