const express = require("express");
const cors = require("cors");
const connection = require("./db_config");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3030;


app.post('/login', (req, res) =>{
    const {name, password} = req.body

    const query = 'SELECT * FROM moradores WHERE name = ? AND password = ?';    
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
    const { nameOfPeople, blocoAndApartament, phoneAndEmail, status } = req.body;
    const query = "INSERT INTO moradores (nameOfPeople, blocoAndApartament, phoneAndEmail, status) VALUES (?,?,?,?)";
    
    connection.query(query, [nameOfPeople, blocoAndApartament, phoneAndEmail, status], (err, results) =>{
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ success: false, message: 'Erro no servidor', error: err });
        }
        res.json({ success: true, message: 'Cadastro bem-sucedido!', data: { id: results.insertId, nameOfPeople, blocoAndApartament, phoneAndEmail, status } });
    });
});


app.post('/cadastroCarro', (req, res) => {
    const { owner_name, plate, modelAndColor, vacancy } = req.body;
    const query = "INSERT INTO veiculos (owner_name, plate, modelAndColor, vacancy) VALUES (?,?,?,?)";

    connection.query(query, [owner_name, plate, modelAndColor, vacancy], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }
        res.json({ success: true, message: 'Cadastro bem sucedido', 
            data: { id: results.insertId, owner_name, plate, modelAndColor, vacancy }
        });
    });
});

// veiculos

app.get('/veiculos', (req, res) => {
    const query = "SELECT id, owner_name, plate, modelAndColor, vacancy FROM veiculos";

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar veículos' });
        }
        res.json({ success: true, veiculos: results });
    });
});


app.put('/editCarro/:id', (req, res) => {
    const { id } = req.params;
    const { modelAndColor, plate, owner_name, vacancy } = req.body;
    
    const query = 'UPDATE veiculos SET modelAndColor = ?, plate = ?, owner_name = ?, vacancy = ? WHERE id = ?';
    connection.query(query, [modelAndColor, plate, owner_name, vacancy, id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar veículo' });
        }
        res.json({ success: true, message: 'Veículo atualizado com sucesso!' });
    });
});


app.delete('/deleteCars/:id', (req, res) =>{
    const {id} = req.params
    const query = 'DELETE FROM veiculos WHERE id = ?'
    connection.query(query, [id], (err)=>{
        if (err) {
            return res.status(500).json({success:false, massage:'Erro ao deletar produto'})
        }
        res.json({success:true, massage:'Produto deletado'})
    })
})

// =========================

// moradores

app.get('/moradores', (req, res) => {
    const query = "SELECT id, nameOfPeople, phoneAndEmail, blocoAndApartament, status FROM moradores";

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar moradores' });
        }
        res.json({ success: true, moradores: results });
    });
});

app.put('/editPessoa/:id', (req, res) => {
    const { id } = req.params;
    const { nameOfPeople, phoneAndEmail, blocoAndApartament, status } = req.body;

    const query = 'UPDATE moradores SET nameOfPeople = ?, phoneAndEmail = ?, blocoAndApartament = ?, status = ? WHERE id = ?';

    connection.query(query, [nameOfPeople, phoneAndEmail, blocoAndApartament, status, id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar morador' });
        }
        res.json({ success: true, message: 'Morador atualizado com sucesso!' });
    });
});

app.delete('/deleteMorador/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM moradores WHERE id = ?';

    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar morador' });
        }
        res.json({ success: true, message: 'Morador excluído com sucesso!' });
    });
});



app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));