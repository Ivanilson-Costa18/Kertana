window.onload = function() {
    loadListProducts();
}
/*
async function loadListProducts() {
    try {
        let products = await $.ajax({
            url: "/api/products",
            method: "get",
            dataType: "json"
        });
        listProducts(products);
        
    } catch(err) {
        let elemHortlist = document.getElementById("hortList");
        console.log(err);
        elemHortlist.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
} 
*/
window.onload = async function loadListProducts() {
    let productName = sessionStorage.getItem("productName");

    let product = await $.ajax({
        url: "/api/products/"+productName,
        method: "get",
        dataType: "json"
    });
    listProducts(product);

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