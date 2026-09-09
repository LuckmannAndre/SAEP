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

const PORT = 3025;

server.listen(PORT, () => { 
    console.log('Servidor rodando na porta: ${PORT}');
});const express = require('express');
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
