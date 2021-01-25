const pool = require('./connection.js')

module.exports.getAllProducts = async function(fieldID) {
    try{
        const sql = 'SELECT Produto_ID, Produto_Nome, Produto_Photo, Produto_TipoSoloDescricao, Produto_EpocaSemearDescricao, Produto_EpocaColheitaDescricao, Produto_ExposicaoDescricao, Produto_TemperaturaMaxima, Produto_TemperaturaMinima, Produto_HumidadeSoloMaxima, Produto_HumidadeSoloMinima, Produto_Mes_Inicial, Produto_Mes_Final '+ 
        'FROM Producao, Produto WHERE  Producao_Produto_ID = Produto_ID AND Producao_Terreno_ID = ? AND Producao_EstadoPoligonoProducao_ID = 2;'
        let products = await pool.query(sql, [fieldID]);
        return products;
    }catch(err){
        console.log(err);
        return err;
    }
}

module.exports.getProductionCoordinates = async function(fieldID) {
    try{
    const sql = 'SELECT Producao_Produto_ID, Producao_Coordenadas, Producao_EstadoCrescimento_ID '+ 
    'FROM Producao WHERE Producao_Terreno_ID = ? AND Producao_EstadoPoligonoProducao_ID = 2;'
    let productionCoordinates = await pool.query(sql, [fieldID]);
    return productionCoordinates;
}catch(err){
    console.log(err);
    return err;
}
}


module.exports.getProductionsGrowthState = async function(fieldID) {
    try{
    const sql = 'CALL growth_state(?);'
    let growthStates = await pool.query(sql, [fieldID]);
    return growthStates[0];
}catch(err){
    console.log(err);
    return err;
}
}

module.exports.insertProduction = async function(fieldID, production){
    try{
        const sql = 'INSERT INTO Producao(Producao_Produto_ID, Producao_Terreno_ID, Producao_EstadoCrescimento_ID, Producao_EstadoPoligonoProducao_ID, Producao_Coordenadas, Producao_dataPlantacao) VALUES(?,?,1,2,?,?)'
        let result = await pool.query(sql,[production.product, fieldID, production.coordinates, production.date])
        if(result.changedRows > 0) return {msg: 'Insert into database successful'}
        else return{msg: 'Insert into database failed'}
    } catch(err){
        console.log(err)
        return err
    }
}

module.exports.removeProduct = async function(productID){
    try {
        const sql = 'UPDATE Producao SET Producao_EstadoPoligonoProducao_ID = 1 WHERE Producao_Produto_ID = ?'
        let result = await pool.query(sql, [productID])
        if(result.changedRows > 0)
            return {msg: 'Update database successful'}
        else return{msg: 'Update database failed'}
    } catch (err) {
        console.log(err);
        return err
    }
}