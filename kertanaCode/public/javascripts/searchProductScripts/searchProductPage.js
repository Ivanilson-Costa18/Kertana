var count=0



///////////////////////////////////////// WINDOW //////////////////////////////////////////////////////

var suitable_locations = {}

window.onload = async function loadListProducts() {
    let productID = sessionStorage.getItem("productID");
    let product = await $.ajax({
        url: "/api/products/"+productID,
        method: "get",
        dataType: "json"
    });
    suitable_locations = await $.ajax({
        url: "/api/locations/storedProcedure/"+productID,
        method: 'get',
        dataType: 'json'
    }).then( value => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
        center: [-7.956215,39.506282], 
        zoom: 5.5
        });
        map.on('load', function () {   
        let count = 0
        for (local of value[0] ){
            let coordinate = JSON.parse(local.Freguesia_Coordenadas)
            console.log(coordinate)
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
                                                            }}
                                    ]}}); 
            map.addLayer({
                    'id': String(count),
                    'type': 'fill',
                    'source': String(count),
                    'layout': {},
                    'paint': {
                        'fill-color': '#088',
                        'fill-opacity': 0.65
                    }
                    });
            count++}
        });
                   
        //listProducts(product);
})}


function deleteResult(id) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
}
/*
function listProducts(products) {
    let elemHortlist = document.getElementById("product-result");
    let html ="";
    for (let product of products) {
        html += 
                '';
        count++
    }

    elemHortlist.innerHTML = html;
}

*/
