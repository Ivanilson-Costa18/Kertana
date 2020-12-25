window.onload = async function loadListProducts() {
    let productName = sessionStorage.getItem("product");
    let product = await $.ajax({
        url: "/api/products/"+productName,
        method: "get",
        dataType: "json"
    });
    let suitable_locations = await $.ajax({
        url: "/api/locations/storedProcedure/"+productName,
        method: 'get',
        dataType: 'json'
    })
        listProducts(product);
        console.log(suitable_locations);
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
                '<hr style= "width: 100%; margin-bottom:20px;">'+ 
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
             '<hr style= "width: 100%; margin-bottom:20px;">'+ 
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
          '</section>';
          '<hr style= "width: 100%; margin-bottom:20px;">';

                   
    }
    elemHortlist.innerHTML = html;
}