module.exports = function(app) {
    app.get('/produtos', function(req, res) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(err, results) {
            console.log('aquiiii');
            console.log(err);
            res.render('produtos/lista', {lista: results});
        });

        connection.end();
    });
}
