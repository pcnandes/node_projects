function ProdutosDAO(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from livros', callback);
}

ProdutosDAO.prototype.salva = function(produto, callback){
    //this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
    this._connection.query('insert into livros set ?', produto, callback);
}

module.exports = function(){
    return ProdutosDAO;
};
