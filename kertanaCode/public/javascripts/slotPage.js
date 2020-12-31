coordinates2 = [];
window.onload = async function loadPage() {
    let json = sessionStorage.getItem("field");
    let field = JSON.parse(json);
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
    console.log(productionCoordinates[0])

    listProducts(products);

    fieldCoordinates = await $.ajax({
        url: "/api/fields/"+field.Terreno_ID,
        method: 'get',
        dataType: 'json'
    }).then( value => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
        centerCoordinate = JSON.parse(value[0].Terreno_Coordenadas);
        coordinates2.push(centerCoordinate)
var map = new mapboxgl.Map({
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
        map.on('load', function () {   
        for (singleCoordinates of productionCoordinates){
            coordinates2.push(JSON.parse(singleCoordinates.Producao_Coordenadas))
            }
        console.log(coordinates2)
        // coordinates2[0] = terreno, os seguintes sao producoes
        // nao sei fazer a condicao ... a verificar o length do array, o arr.lenght() method nao resultou
        for (i = 0; i < 6; i++) {
        map.addSource(String(i), {
                'type': 'geojson',
                'data': {
                        'type': 'FeatureCollection',
                        'features': [
                                        {
                                        'type': 'Feature',
                                        'geometry': {
                                        'type': 'Polygon',
                                        'coordinates': [coordinates2.shift()]                               
                                                        }}
                                ]}}); 
                map.addLayer({
                        'id': String(i),
                        'type': 'fill',
                        'source': String(i),
                        'layout': {},
                        'paint': {
                        'fill-color': '#088',
                        'fill-opacity': 0.65
                        }
                });}
        });

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
        

    })   
}     


function getFieldObj(field){
console.log(JSON.parse(field.Terreno_Coordenadas))
let coordinate = JSON.parse(field.Terreno_Coordenadas);
return coordinate;
}

function deleteResult() {
    var elem = document.getElementById('product-result');
    elem.parentNode.removeChild(elem);
}

function listProducts(products) {
    let elemHortlist = document.getElementById("hortList");
    let html ="";
    for (let product of products) {
        html += 
                '<section id="product-result">'+
                    '<section class= "hortalica-result">'+
                        '<section class="imagem-hortalica">'+
                            '<section class="imagem-frame">'+
                                '<img id="product-icon" src="'+product.Produto_Photo+'">'+
                            '</section>'+
                        '</section>'+
                        '<section class="imagem-description">'+
                            '<p id="title-result">'+product.Produto_Nome+'</p>'+
                            '<button id="delete-product" onclick="deleteResult()">&times;</button>'+
                            '<p id="description-result">'+product.Produto_Descricao+'</p>'+
                            '<section class="image-feedback-section">'+
                                '<img class="feedback-image" src="/images/colheita-feedback-icon.PNG">'+
                                '<p class="feedback-message">Pronto a colher!</p>'+
                            '</section>'+
                        '</section>'+
                    '</section>'+
                '</section>';
                
    }

    elemHortlist.innerHTML = html;
}


