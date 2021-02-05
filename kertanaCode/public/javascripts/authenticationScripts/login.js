const loginAccount = async () => {
    let email = document.getElementById("email").value
    let pass = document.getElementById("password").value
    let error = document.getElementById("status")
    
    let validation = await $.ajax({
        url: '/api/farmers/authentication/login',
        method: 'get',
        data: {
            email: email,
            password: pass
        },
        dataType: 'json'
    })
    
    console.log(validation)
    if(typeof validation.id == 'number'){
        sessionStorage.setItem('user_id', validation.id)
        window.location = 'profilePage.html'
    } else {
        error.innerHTML = 'Email ou Password inválidos'
    }

}