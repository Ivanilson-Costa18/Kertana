window.onload = async function loadListProducts() {
    let json = sessionStorage.getItem("location");
    let localizacao = JSON.parse(json);
    let suitable_products = await $.ajax({
        url: "/api/products/storedProcedure/"+localizacao.id,
        method: 'get',
        dataType: 'json'
    })
        let coordenada = JSON.parse(localizacao.coordenadas);
        mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnBnIiwiYSI6ImNraGwybDczMzFnOXcyeHA2MnM0ZWF4aDQifQ.dbfnIhEI5JJf-TV1LyEQQw';
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ivanpg/ckhp1ckfr2dbd19o0op09umzk', 
        center: coordenada[0], 
        zoom: 8
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
        
                console.log(data.features[0].geometry.coordinates);
                createPolygon(data.features[0].geometry.coordinates).then(value => {getSoilMoisture(value);})
            } 
            else {
                if (e.type !== 'draw.delete')
                alert('Use the draw tools to draw a polygon!');
                }
            }
        
        
        
            async function createPolygon(coordinates) {
                try {
                    obj = 
                    {
                        "name":"Search Polygon",
                        "geo_json":{
                           "type":"Feature",
                           "properties":{
                     
                           },
                           "geometry":{
                              "type":"Polygon",
                              "coordinates":coordinates
                           }
                        }
                     }
                        let result = await $.ajax({
                        url: "http://api.agromonitoring.com/agro/1.0/polygons?appid=eaf41ee48e35adb39c24586fc8eb11c6",
                        method: "post",
                        dataType: "json",
                        data:JSON.stringify(obj),
                        contentType: "application/json"
                    });
                    console.log(JSON.stringify(result));
                    console.log(result.id);
                    return result.id;
                } catch(err) {
                    console.log(err);
                }
            }
                
            
            
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

                
    listProducts(suitable_products[0]);



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
                       '<a onclick="deleteResult()"><img id="delete-result" src="/images/DeleteResult.PNG" alt="Delete Result" width="15px" height="15px"></a>'+
                       ' <p id="description-result">'+product.Produto_Descricao+'</p>'+
                   ' </section>'+
                '</section>'+
                '<hr style= "width: 100%; margin-bottom:20px;">';             
    }
    elemHortlist.innerHTML = html;
}

