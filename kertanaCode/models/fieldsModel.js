const pool = require('./connection.js');

module.exports.getAllProductions = async function(fieldID) {
    try{
        const sql = 'SELECT * FROM Produto WHERE Produto_ID IN (SELECT Producao_Produto_ID FROM Producao WHERE Producao_Terreno_ID = ? AND Producao_EstadoPoligonoProducao_ID = 2);'
        let products = await pool.query(sql, [fieldID]);
        const sql2 = 'SELECT * FROM Producao WHERE Producao_Terreno_ID = ? AND Producao_EstadoPoligonoProducao_ID = 2;'
        let production = await pool.query(sql2, [fieldID]);
        const sql3 = 'CALL growth_state(?);'
        let growthStates = await pool.query(sql3, [fieldID]);
        let productions = {
            products: products,
            productions: production,
            growthStates: growthStates[0]
        }
        return productions
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

module.exports.removeProduction = async function(productionID, fieldID){
    try {
        const sql = 'DELETE FROM Producao WHERE Producao_Terreno_ID = ? AND Producao_ID = ? '
        let result = await pool.query(sql, [fieldID, productionID])
        return result
    } catch (err) {
        console.log(err);
        return err
    }
}