const express = require("express");
const cors = require("cors");
const connection = require("./db_config");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3030;

app.post('/cadastro', (req, res) =>{
    const {username, password, email} = req.body
    const query = "INSERT INTO users (username, password, email) VALUES (?,?,?)"
    
    connection.query(query, [username, password, email], (err, results) =>{
        if (err) {
            return res.status(500).json({success:false, message:'Erro no servidor'})
        }
        else {
            res.json({success:true, message:'Cadastro bem sucedido', 
            data:{ id: results.insertId, username, password, email }})
        }
    })
})





app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));