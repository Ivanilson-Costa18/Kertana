var localizacao = {}
var coordenada = []
var map
window.onload = async function loadListLocations() {
    let json = sessionStorage.getItem("location");
    localizacao = JSON.parse(json);
    coordenada = JSON.parse(localizacao.coordenadas)
    let suitable_products = await $.ajax({
        url: "/api/products/storedProcedure/"+localizacao.id,
        method: 'get',
        dataType: 'json'
    })            
    listProducts(suitable_products[0]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
    map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
    center: coordenada[0], 
    zoom: 8
});

    var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
        polygon: true,
        trash: true
        }
        });
    map.addControl(draw);
}


map.on('draw.create',updateArea);
map.on('draw.delete',updateArea);
map.on('draw.update',updateArea);
     
function updateArea(e) {
    var data = draw.getAll();

    if (data.features.length > 0) {
        var area = turf.area(data);
        return data.features[0].geometry.coordinates;
    } 
    else {
        if (e.type !== 'draw.delete')
        alert('Use the draw tools to draw a polygon!');
        }
}



function listProducts(products) {
    let elemHortlist = document.getElementById("product-result");
    let html ="";
    for (let product of products) {
        html += 
                '<section class= "hortalica-result">' +
                   ' <section class="imagem-hortalica">' +
                        '<section class="imagem-frame">' +
                       '     <img id="product-icon" src="'+product.Produto_Photo+'">'+
                       ' </section>'+
                  '  </section>'+
                   ' <section class="imagem-description">'+
                       ' <p id="title-result">'+product.Produto_Nome+'</p>'+
                       ' <p id="description-result">'+product.Produto_Descricao+'</p>'+
                   ' </section>'+
                '</section>';
    }
    elemHortlist.innerHTML = html;
}

