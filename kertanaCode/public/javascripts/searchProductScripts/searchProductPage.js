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
                return data.features[0].geometry.coordinates;
            } 
            else {
                if (e.type !== 'draw.delete')
                alert('Use the draw tools to draw a polygon!');
                }
        }
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
                   
        listProducts(product);
})}


function deleteResult(id) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
}

function listProducts(products) {
    let elemHortlist = document.getElementById("product-result");
    let html ="";
    for (let product of products) {
        html += 
                '<section class= "hortalica-result" id='+count+'>' +
                   ' <section class="imagem-hortalica">' +
                        '<section class="imagem-frame">' +
                       '     <img id="product-icon" src="'+product.Produto_Photo+'">'+
                       ' </section>'+
                  '  </section>'+
                   ' <section class="imagem-description">'+
                       ' <p id="title-result">'+product.Produto_Nome+'</p>'+
                       '<button id="delete-product" onclick="deleteResult('+count+')">&times;</button>'+
                       ' <p id="description-result">'+product.Produto_Descricao+'</p>'+
                   ' </section>';
        count++
    }

    elemHortlist.innerHTML = html;
}

 
////////////////////////////////////////// MODAL ///////////////////////////////////////////
function addProductList() {
    product  = document.getElementById('search-container')
    if(product.value == ""){
      alert('Insira uma hortaliça');
    } else {
      list(product.value, hortalicas);
      product.innerHTML= "";
      modal.classList.remove('active');
      overlay.classList.remove('active');
  }
}
  
  function cancelAddProduct() {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
  
  overlay.addEventListener('click', () => {
    cancelAddProduct();
  })
  

  function list(nome, products) {
    let html ="";
    for (product of products) {
      if(nome == product.Produto_Nome){
                 html =  ' <section class="imagem-hortalica">' +
                        '<section class="imagem-frame">' +
                       '     <img id="product-icon" src="'+product.Produto_Photo+'">'+
                       ' </section>'+
                  '  </section>'+
                   ' <section class="imagem-description">'+
                       ' <p id="title-result">'+product.Produto_Nome+'</p>'+
                       '<button id="delete-product" onclick="deleteResult('+count+')">&times;</button>'+
                       ' <p id="description-result">'+product.Produto_Descricao+'</p>'+
                   ' </section>';
    }
  }
    let newDiv = document.createElement("section")
    newDiv.classList.add('hortalica-result')
    newDiv.setAttribute('id',count)
    newDiv.innerHTML = html
    document.getElementById('product-result').appendChild(newDiv);
    count++
}