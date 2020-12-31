const pool = require('./connection.js')

module.exports.getAllProducts = async function(fieldID) {
    try{
        const sql = 'SELECT Produto_ID, Produto_Nome, Produto_Photo, Produto_Descricao, Produto_TemperaturaMaxima, Produto_TemperaturaMinima, Produto_TempoGerminacao, Produto_TempoMaturacao, Produto_HumidadeSoloMaxima, Produto_HumidadeSoloMinima, Produto_Mes_Inicial, Produto_Mes_Final '+ 
        'FROM Producao, Produto WHERE  Producao_Produto_ID = Produto_ID AND Producao_Terreno_ID = ?;'
        let products = await pool.query(sql, [fieldID]);
        return products;
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports.getProductionCoordinates = async function(fieldID) {
    try{
    const sql = 'SELECT Producao_Coordenadas '+ 
    'FROM Producao WHERE Producao_Terreno_ID = ?;'
    let productionCoordinates = await pool.query(sql, [fieldID]);
    return productionCoordinates;
}catch(err){
    console.log(err);
    return err;
}
}