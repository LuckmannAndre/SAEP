const express = require('express');
const cors = require('cors');
const connection = require('./db');

const server = express();

server.use(cors());
server.use(express.json());


server.get('/produtos' , (req, res) =>{
    const sql = 'SELECT * FROM PRODUTO';

    connection.query(sql , (erro, resultados) =>{
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        return res.json(resultados)
    });
});


server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM PRODUTOS ORDER BY nome ASC';
    connection.query(sql, (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        return res.json(resultados);
    })
})

server.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM PRODUTOS WHERE id = ?';
    connection.query(sql, [id], (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        return res.json(resultados);
    })
})

server.get('/produtos/busca/:nome', (req, res) => {

    const termobusca = '%' + req.params.nome + '%';

    const sql = 'SELECT * FROM PRODUTOS WHERE nome LIKE ?';

    connection.query(sql, {termobusca}, (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        return res.json(resultados);
    })
})

const PORT = 3025;

server.listen(PORT, () => { 
    console.log('Servidor rodando na porta: ${PORT}');
});
