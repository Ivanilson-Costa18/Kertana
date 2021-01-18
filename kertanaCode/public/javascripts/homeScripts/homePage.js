window.addEventListener('scroll', function(){
    var myNav = document.getElementById('mynav');
    var nav = document.getElementById("navsup")
    var header = document.getElementById('header')
    "use strict";
    if (document.body.scrollTop >= 1 ) {
        myNav.classList.add("fixednav");
        nav.classList.add('navhidden')
        header.classList.add('headerafter')
    } 
    else {
        myNav.classList.remove("fixednav");
        nav.classList.remove('navhidden')
        header.classList.remove('headerafter')
    }
});

