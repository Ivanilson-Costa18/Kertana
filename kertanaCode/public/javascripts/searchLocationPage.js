window.onload = async function loadListProducts() {
    let localizacao = sessionStorage.getItem("location");

    let suitable_products = await $.ajax({
        url: "/api/products/storedProcedure/"+localizacao,
        method: 'get',
        dataType: 'json'
    });
        console.log(suitable_products);
}



function listProducts(products) {
    let elemHortlist = document.getElementById("hortList");
    let html ="";
        for (let product of products) {
            html += 
                    '<section class= "hortalica-result">' +
                    ' <section class="imagem-hortalica">' +
                            '<section class="imagem-frame">' +
                        '     <img src="'+product.Produto_Photo+'" class="imagem-resultado" alt="hortalica">'+
                        ' </section>'+
                    '  </section>'+
                    ' <section class="imagem-description">'+
                        ' <p>'+product.Produto_Descricao+'</p>'+
                    ' </section>'+
                ' </section>';

        }
    elemHortlist.innerHTML = html;
}