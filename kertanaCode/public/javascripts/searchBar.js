window.onload = function() {
    loadListProducts();
}

async function loadListProducts() {
    try {
        let products = await $.ajax({
            url: "/api/products",
            method: "get",
            dataType: "json"
        });
        showProducts(products);
        
    } catch(err) {
        console.log(err);
    }
}


function showProducts(products) {
    let elemMain = document.getElementById("list");
    let html ="";
    for (let product of products) {
        html += '<li class="animals">'+product.nome+'</li>';
    }
    elemMain.innerHTML = html;
}


function showProduct(productID) {
    sessionStorage.setItem("productID",productID);
    window.location = "map.html";
}

async function filtrar() {
    try {
        let hortalica = document.getElementById("search-hortalica").value;
        let localizacao = document.getElementById("search-localizacao").value;
        if (hortalica == null) {
            let products = await $.ajax({
            url: '/api/localizations?artist='+localizacao,
            method: "get",
            dataType: "json"
        })} else {
            let products = await $.ajax({
                url: "/api/products?product="+hortalica,
                method: "get",
                dataType: "json"
        })};
        showProducts(products);       
    } catch(err) {
        console.log(err);
    }
}
 