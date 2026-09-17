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

    const sql = 'SELECT * FROM PRODUTO ORDER BY nome ASC';

    connection.query(sql, (erro, resultados) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});


server.get('/produtos/busca/:nome', (req, res) => {

    const sql = 'SELECT * FROM PRODUTO WHERE nome LIKE ?';

    const termoBusca = '%' + req.params.nome + '%';

    connection.query(sql, [termoBusca], (erro, resultados) => {
        if(erro) {
            return res.status(500).json({ erro: erro.message});
        }
        res.json(resultados);
    });
});


server.get('/produtos/:id', (req, res) => {

    const {id} = req.params;

    const sql = 'SELECT * FROM PRODUTO WHERE id_produto = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if(erro){
            return res.status(500).json({ erro: erro.message})
        }

        return res.json(resultados);
    });
});



server.post('/produtos' , (req, res) => {
    const {nome , cor , textura , peso , unidade_medida , aplicacao , 
    data_validade , estoque_minimo , estoque_atual , preco_unitario , id_categoria} = req.body

    if (nome == null  || cor == null  || textura == null  ||  peso == null  ||  
        unidade_medida == null  ||  aplicacao == null ||  data_validade == null  ||  
        estoque_atual == null || estoque_minimo == null || preco_unitario == null || id_categoria == null
    
    ){
        return res.status(400).json({erro: 'Todos os campos devem ser preenchidos'})
    }

    const sql = 'INSERT INTO PRODUTO (nome , cor , textura , peso , unidade_medida , aplicacao , data_validade , estoque_minimo , estoque_atual , preco_unitario , id_categoria) VALUES (?,?,?,?,?,?,?,?,?,?,?)'

    connection.query(sql , [nome , cor , textura , peso , unidade_medida , aplicacao , 
    data_validade , estoque_minimo , estoque_atual , preco_unitario , id_categoria] , (erro, resultado) => {

        if(erro){
            return res.status(500).json({erro: erro.message})
        }
        res.json({
            mensagem: 'Produto Cadastrado com sucesso',
            id: resultado.insertId
        })
    })
})

server.put('/produtos/:id', (req, res) => {
    const {nome , cor , textura , peso , unidade_medida , aplicacao , 
    data_validade , estoque_minimo , estoque_atual , preco_unitario , id_categoria} = req.body

    const {id} = req.params

    const sql = 'UPDATE PRODUTO SET nome = ?, cor = ?, textura = ?, peso = ?, unidade_medida = ?, aplicacao = ?, data_validade = ?, estoque_minimo = ?, estoque_atual = ?, preco_unitario = ?, id_categoria = ? WHERE id_produto = ?'

    connection.query(sql , [nome , cor , textura , peso , unidade_medida , aplicacao ,
        data_validade , estoque_minimo , estoque_atual , preco_unitario , id_categoria, id] , (erro) => {
            if(erro){
                return res.status(500).json({erro: erro.message})
            }
            res.json({mensagem: 'Produto atualizado com sucesso'})
        })
})

server.delete('/produtos/:id', (req, res) => {
    const {id} = req.params

    const sql = 'DELETE FROM PRODUTO WHERE id_produto = ?'

    connection.query(sql , [id] , (erro) => {
        if(erro){
            return res.status(500).json({erro: erro.message})
        }
        res.json({mensagem: 'Produto deletado com sucesso'})
    });
});

const PORT = 3025;

server.listen(PORT, () => { 
    console.log(`Servidor rodando na porta: ${PORT}`);
});
