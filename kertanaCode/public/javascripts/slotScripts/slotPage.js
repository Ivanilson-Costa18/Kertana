mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
var map

////////////////////////////////////// WINDOW //////////////////////////////////////////////////////

colorsArray = [];
coordinates2 = [];
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
    }).then( value => {
        centerCoordinate = JSON.parse(field.Terreno_Coordenadas);
        coordinates2.push(centerCoordinate)

        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
            center: centerCoordinate.shift(0),
            zoom: 15
            });

            map.addControl(
                new MapboxGeocoder({
                   accessToken: mapboxgl.accessToken,
                   mapboxgl: mapboxgl
                })
               ); 
            
            var draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
               polygon: true,
               trash: true
            }
            });
            map.addControl(draw);
            
            map.on('draw.create',updateArea);
            map.on('draw.delete',updateArea);
            map.on('draw.update',updateArea);
               
            function updateArea(e) {
            var data = draw.getAll();
            
            if (data.features.length > 0) {
            var area = turf.area(data);
            
            } 
            else {
            if (e.type !== 'draw.delete')
            alert('Use the draw tools to draw a polygon!');
            }
            }

        map.on('load', function () {   
            for (singleCoordinates of productionCoordinates){
                coordinates2.push(JSON.parse(singleCoordinates.Producao_Coordenadas))
                colorsArray.push('#088'); //Cor do terreno : Azul
                if (singleCoordinates.Producao_EstadoCrescimento_ID == 1) // Germinacao : Vermelho
                colorsArray.push('#e10');
                if (singleCoordinates.Producao_EstadoCrescimento_ID == 2) // Maturacao : Amarelo
                colorsArray.push('#ff1');
                if (singleCoordinates.Producao_EstadoCrescimento_ID == 3) // Pronto a colher : Verde
                colorsArray.push('#081');
                }
            let count = 0 
            for (coordinate of coordinates2) {
                color = colorsArray[count];

            map.addSource(String(count), {
                    'type': 'geojson',
                    'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                            {
                                            'type': 'Feature',
                                            'geometry': {
                                                'type': 'Polygon',
                                                'coordinates': [coordinate]                               
                                                            }
                                                        }
                                    ]
                                }
                            }); 
                    map.addLayer({
                            'id': String(count),
                            'type': 'fill',
                            'source': String(count),
                            'layout': {},
                            'paint': {
                                'fill-color': color,
                                'fill-opacity': 0.65
                            }
                    });
                count++
                }
            });
    })   
}     


function getFieldObj(field){
    let coordinate = JSON.parse(field.Terreno_Coordenadas);
return coordinate;
}

function deleteResult() {
    var elem = document.getElementById('product-result');
    elem.parentNode.removeChild(elem);
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
                                    '<p id="description-result">'+product.Produto_Descricao+'</p>'+
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
    }
}



