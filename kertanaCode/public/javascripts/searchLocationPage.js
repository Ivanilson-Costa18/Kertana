window.onload = async function loadListProducts() {
    let localizacao = sessionStorage.getItem("location");

    let suitable_products = await $.ajax({
        url: "/api/products/storedProcedure/"+localizacao,
        method: 'get',
        dataType: 'json'
    })
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