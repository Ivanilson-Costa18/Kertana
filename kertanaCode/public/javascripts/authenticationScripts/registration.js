const createAccount = async () =>{
    let fName = document.getElementById('first-name').value
    let lName = document.getElementById('last-name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    let params = {
        fn: fName,
        ln: lName,
        e: email,
        p: password
    }
    let validation = validateParameters(params)
    if(validation){
        let registration = await $.ajax({
            url: '/api/farmers/',
            method: 'post',
            data: {
                firstName: fName,
                lastName: lName,
                emailAddress: email,
                pass: password
            },
            dataType: 'json'
        })
        if(registration.status){
            document.getElementById('status').innerHTML = ""
            alert(registration.msg)
            window.location = "index.html"
        } else {
            document.getElementById('status').innerHTML = registration.msg
        }
    }
}

const validateParameters = params => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(params.fn == ""){
        document.getElementById('status').innerHTML = 'Por favor insira o primeiro nome.'
        return false
    }
    if (params.ln == ""){
        document.getElementById('status').innerHTML = 'Por favor insira o último nome.'
        return false
    }
    if(params.e == "" && !re.test(params.e)){
        document.getElementById('status').innerHTML = 'Por favor introduza um email válido.'
        return false
    }
    if(params.p.length < 6){
        document.getElementById('status').innerHTML = 'A palavra passe deve ter 6 caractéres.'
        return false
    }
    return true
}