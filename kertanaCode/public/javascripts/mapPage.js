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
    let elemHortlist = document.getElementById("hortList");
    let html ="";
    for (let product of products) {
        html += 
                '<section class= "hortalica-result">' +
                   ' <section class="imagem-hortalica">' +
                        '<section class="imagem-frame">' +
                       '     <img src="/images/FarmBG.jpeg" class="imagem-resultado" alt="hortalica">'+
                       ' </section>'+
                  '  </section>'+
                   ' <section class="imagem-description">'+
                       ' <p>'+product.nome+'</p>'+
                   ' </section>'+
               ' </section>';

    }
    elemHortlist.innerHTML = html;
}