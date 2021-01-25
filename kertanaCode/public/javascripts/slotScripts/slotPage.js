mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
var map

////////////////////////////////////// WINDOW //////////////////////////////////////////////////////

var colorsArray = ['#088'];
var coordinates = [];
window.onload = async function loadPage() {
    let json = sessionStorage.getItem("field");
    let field = JSON.parse(json);
    getSoilMoisture(field.Terreno_AgroAPI_ID)
    getTemperatures(field.Terreno_AgroAPI_ID)
    let products = await $.ajax({
        url: "/api/productions/"+field.Terreno_ID+"/products",
        method: "get",
        dataType: "json"
    });
    let productionCoordinates =  await $.ajax({
        url: "/api/productions/"+field.Terreno_ID+"/coordinates",
        method: 'get',
        dataType: 'json'
    });

    let growthStates =  await $.ajax({
        url: "/api/productions/"+field.Terreno_ID+"/growthStates",
        method: 'get',
        dataType: 'json'
    });

    listProducts(products, growthStates);

   

    fieldCoordinates = await $.ajax({
        url: "/api/fields/"+field.Terreno_ID,
        method: 'get',
        dataType: 'json'
    })
        centerCoordinate = turf.centroid(turf.polygon([JSON.parse(field.Terreno_Coordenadas)]));
        coordinates.push({coordinates: JSON.parse(field.Terreno_Coordenadas), prodID: 0})

        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
            center: centerCoordinate.geometry.coordinates,
            zoom: 12
            });

        map.on('load', function () {   
            for (singleCoordinates of productionCoordinates){
                let coord = JSON.parse(singleCoordinates.Producao_Coordenadas)
                coordinates.push({coordinates: coord, prodID: singleCoordinates.Producao_Produto_ID})
                if (singleCoordinates.Producao_EstadoCrescimento_ID == 1) // Germinacao : Vermelho
                    colorsArray.push('#e10');
                if (singleCoordinates.Producao_EstadoCrescimento_ID == 2) // Maturacao : Amarelo
                    colorsArray.push('#ff1');
                if (singleCoordinates.Producao_EstadoCrescimento_ID == 3) // Pronto a colher : Verde
                    colorsArray.push('#081');
                }
            let count = 0 
            for (coordinate of coordinates) {
                color = colorsArray[count];

            map.addSource(String(coordinate.prodID), {
                    'type': 'geojson',
                    'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                            {
                                            'type': 'Feature',
                                            'geometry': {
                                                'type': 'Polygon',
                                                'coordinates': [coordinate.coordinates]                               
                                                            }
                                                        }
                                    ]
                                }
                            }); 
                    map.addLayer({
                            'id': String(coordinate.prodID),
                            'type': 'fill',
                            'source': String(coordinate.prodID),
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


function getFieldObj(field){
    let coordinate = JSON.parse(field.Terreno_Coordenadas);
    return coordinate;
}

async function deleteResult() {
    var elem = document.getElementById('product-result');
    var elemChild = elem.firstChild.id
    let confirmation = confirm('Deseja remover este produto da terreno?')
    if(confirmation){
        elem.parentNode.removeChild(elem)
        let remove = await $.ajax({
            url:'api/productions/'+Number(elemChild.split('-')[1])+'/fields',
            method: 'post',
            dataType:'json'
        })
        map.removeLayer(String(Number(elemChild.split('-')[1])))    
        map.removeSource(String(Number(elemChild.split('-')[1])))
    };
}



function listProducts(products, growthStates) {
    let elemHortlist = document.getElementById("products-list-section");
    let html ="";
    for (let product of products) {
        for (let growthState of growthStates){
            if (product.Produto_ID == growthState.Producao_Produto_ID){
                let state = growthState.EstadoCrescimento_Estado;
                let timeLeft = growthState.TimeLeft;
                html += 
                        '<section id="product-result">'+
                            '<div id="productID-'+product.Produto_ID+'">'+
                                '<section id= "hortalica-result">'+
                                    '<section id="image-product-section">'+
                                        '<img id="image-icon" src="'+product.Produto_Photo+'">'+
                                    '</section>'+
                                    '<section id="title-section">'+
                                        '<h3 id="title-result">'+product.Produto_Nome+'</h3>'+
                                    '</section>'+
                                    '<section id="remove-product-button-section">'+
                                        '<input type="button" id="delete-product" value="&times;" onclick="deleteResult()"></input>'+
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
                
            }
        }
    }
    elemHortlist.innerHTML = html;
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
        console.log(soilInfo.moisture);
        return soilInfo.moisture;
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
        weatherInfo = result.main;
        return console.log(weatherInfo);
    } catch(err) {
        console.log(err);
        return err
    }
}



