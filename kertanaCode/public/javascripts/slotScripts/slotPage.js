
mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
var map
var field 

////////////////////////////////////// WINDOW //////////////////////////////////////////////////////

window.onload = async function() {
    let json = sessionStorage.getItem("field");
    field = JSON.parse(json);

    let soilConditions = await getSoilMoisture(field.Terreno_AgroAPI_ID)
    let climateConditions = await getTemperatures(field.Terreno_AgroAPI_ID)

    document.getElementById('field-info-soil-section').innerHTML = '<h2 id="info-title">Informação do Solo</h2>'+
                                                                    '<p id="first-paragraph"><b>t10</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+(soilConditions.t10-273.15).toFixed(2)+' ºC</p>'+
                                                                    '<p><b>t0</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+(soilConditions.t0-273.15).toFixed(2)+' ºC</p>'+
                                                                    '<p><b>Humidade</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+soilConditions.moisture+' m&sup3;/m&sup3;</p>';

    document.getElementById('field-info-climate-section').innerHTML = '<h2 id="info-title">Informação do Clima</h2>'+
                                                                        '<p id="first-paragraph"><b>Vento</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+climateConditions.wind.speed+'m/s</p>'+
                                                                        '<p><b>Pressão</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+climateConditions.main.pressure+'hPa</p>'+
                                                                        '<p><b>Humidade</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+climateConditions.main.humidity+'%</p>'+
                                                                        '<p><b>Nuvens</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+climateConditions.clouds.all+'%</p>';

    document.getElementById('field-size-coord-section').innerHTML = '<h3>Tamanho (hectare)</h3>'+
                                                                    '<p>'+(turf.area(turf.polygon([JSON.parse(field.Terreno_Coordenadas)]))/10000).toFixed(2)+' ha(s);</p>'+                
                                                                    '<h3>Lat/Long</h3>'+
                                                                    '<p>'+turf.centroid(turf.polygon([JSON.parse(field.Terreno_Coordenadas)])).geometry.coordinates[0].toFixed(4)+','+turf.centroid(turf.polygon([JSON.parse(field.Terreno_Coordenadas)])).geometry.coordinates[1].toFixed(4)+'</p>'

    let data = await $.ajax({
        url: 'api/fields/'+field.Terreno_ID+'/productions',
        method: 'get',
        dataType: 'json'
    })

    let productions = data.productions
    let products = data.products
    let colorsArray = stateColors(productions)
    listProducts(products, productions)

    productions.unshift({Producao_ID: 0, Producao_Coordenadas: field.Terreno_Coordenadas})
    centerCoordinate = turf.centroid(turf.polygon([JSON.parse(field.Terreno_Coordenadas)]))

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
        center: centerCoordinate.geometry.coordinates,
        zoom: 15
        });
    

    map.on('load', function () {   
        let count = 0 
        for (production of productions) {
            color = colorsArray[count];
            map.addSource(String(production.Producao_ID), {
                    'type': 'geojson',
                    'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                            {
                                            'type': 'Feature',
                                            'geometry': {
                                                'type': 'Polygon',
                                                'coordinates': [JSON.parse(production.Producao_Coordenadas)]                               
                                                            }
                                                        }
                                    ]
                                }
                            }); 
                    map.addLayer({
                            'id': String(production.Producao_ID),
                            'type': 'fill',
                            'source': String(production.Producao_ID),
                            'layout': {},
                            'paint': {
                                'fill-color': color,
                                'fill-opacity': 0.65
                            }
                    });
                count++
                }
        });
    
}     




async function deleteResult(prodID) {
    var elem = document.getElementById('productionID-'+prodID);
    let confirmation = confirm('Deseja remover esta produção do terreno?')
        if(confirmation){
        elem.parentNode.parentNode.removeChild(elem.parentNode)
        let remove = await $.ajax({
            url:'api/fields/'+field.Terreno_ID+'/productions/'+prodID,
            method: 'post',
            dataType:'json'
        })
        map.removeLayer(String(prodID))    
        map.removeSource(String(prodID))
        document.location.reload()
    };
}



function listProducts(products, productions) {
    let elemHortlist = document.getElementById("products-list-section");
    let html ="";
    let count = 0
    while (productions.length > count) {
        let product = products[count]
        let production = productions[count]

        let state = production.EstadoCrescimento_Estado;
        let timeLeft = production.TimeLeft;
        
        html += 
                '<section id="product-result">'+
                '<div id="productionID-'+production.Producao_ID+'">'+
                        '<section id= "hortalica-result">'+
                            '<section id="image-product-section">'+
                                '<img id="image-icon" src="'+product.Produto_Photo+'">'+
                            '</section>'+
                            '<section id="title-section">'+
                                '<h3 id="title-result">'+product.Produto_Nome+'</h3>'+
                            '</section>'+
                            '<section id="remove-product-button-section">'+
                            '<input type="button" id="delete-product" value="&times;" onclick="deleteResult('+production.Producao_ID+')"></input>'+
                            '</section>'+   
                            '<section id="product-description-section">'+
                                '<p id="description-result"><b>Tipo Solo: </b>'+product.Produto_TipoSoloDescricao+'</p>'+
                                '<p id="description-result"><b>Epoca Semear: </b>'+product.Produto_EpocaSemearDescricao+'</p>'+
                                '<p id="description-result"><b>Epoca Colheita: </b>'+product.Produto_EpocaColheitaDescricao+'</p>'+
                                '<p id="description-result"><b>Exposição: </b>'+product.Produto_ExposicaoDescricao+'</p>'+
                                '</section>'+
                                '<section id="feedback-section">'+
                                '<section id="feedback-image-section">'+
                                '<img id="feedback-image" src="/images/feedback-status-ready.PNG">'+
                                '</section>'+
                                '<section id="feedback-message-section">';
                                if(timeLeft <= 0){
                                    html += '<p id="feedback-message">'+state+'</p>';
                                } else{
                                    html += '<p id="feedback-message">'+timeLeft+' (dias)</p>';  
                                }
                                html += 
                            '</section>'+
                            '</section>'+
                            '<section id="separation">'+
                                '<hr style= "width: 90%; margin-bottom:20px;">'+
                            '</section>'+
                        '</section>'+
                    '</div>'+
                '</section>';
                count++
    }
    elemHortlist.innerHTML = html;
}

const stateColors = productions => {
    let colorsArray = ['#088'];
    for (let production of productions){
        if (production.Producao_EstadoCrescimento_ID == 1) // Germinacao : Vermelho
            colorsArray.push('#e10');
        if (production.Producao_EstadoCrescimento_ID == 2) // Maturacao : Amarelo
            colorsArray.push('#ff1');
        if (production.Producao_EstadoCrescimento_ID == 3) // Pronto a colher : Verde
            colorsArray.push('#081');
        }
    return colorsArray
}


///////////////////////////////////////////AGRO API///////////////////////////////////////////////////

async function getSoilMoisture(polygonID) {
    try {
            let result = await $.ajax({
            url: "http://api.agromonitoring.com/agro/1.0/soil?polyid="+polygonID+"&appid=eaf41ee48e35adb39c24586fc8eb11c6",
            method: "get",
            dataType: "json"
        });
        soilInfo = result;
        return soilInfo;
    } catch(err) {
        console.log(err);
        return err
    }
}

async function getTemperatures(polygonID) {
    try {
            let result = await $.ajax({
            url: 'http://api.agromonitoring.com/agro/1.0/weather?polyid='+polygonID+'&units=metric&appid=eaf41ee48e35adb39c24586fc8eb11c6',
            method: "get",
            dataType: "json"
        });
        weatherInfo = result;
        return weatherInfo
    } catch(err) {
        console.log(err);
        return err
    }
}



