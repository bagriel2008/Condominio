const express = require("express");
const cors = require("cors");
const connection = require("./db_config");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3030;


app.post('/login', (req, res) =>{
    const {name, password} = req.body

    const query = 'SELECT * FROM users WHERE name = ? AND password = ?';    
    connection.query(query, [name, password], (err, results) =>{
        if (err) {
            return res.status(500).json({success:false, message:'Erro no servidor'})
        }
        if (results.length > 0) {
            res.json({success:true, message:"Login bem sucedido!"})
        }
        else {
            res.json({success:false, message:"Usuario ou senha não encontrados!"})

        }
    })
})


app.post('/cadastroMorador', (req, res) =>{
    const {name, blocoAndApartament, phoneAndEmail, status} = req.body
    const query = "INSERT INTO users (name, blocoAndApartament, phoneAndEmail, status) VALUES (?,?,?,?)"
    
    connection.query(query, [name, blocoAndApartament, phoneAndEmail, status], (err, results) =>{
        if (err) {
            return res.status(500).json({success:false, message:'Erro no servidor'})
        }
        else {
            res.json({success:true, message:'Cadastro bem sucedido', 
            data:{ id: results.insertId, name, blocoAndApartament, phoneAndEmail, status }})
        }
    })
})


app.post('/cadastroCarro', (req, res) =>{
    const {plate, modelAndColor, vacancy, morador_id} = req.body
    const query = "INSERT INTO veiculos (plate, modelAndColor, vacancy, morador_id) VALUES (?,?,?,?)"
    
    connection.query(query, [plate, modelAndColor, vacancy, morador_id], (err, results) =>{
        if (err) {
            return res.status(500).json({success:false, message:'Erro no servidor'})
        }
        else {
            res.json({success:true, message:'Cadastro bem sucedido', 
            data:{ id: results.insertId, plate, modelAndColor, vacancy, morador_id }})
        }
    })
})




app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));