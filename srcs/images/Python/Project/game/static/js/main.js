function redirectToURL() {
    window.location.href = 'https://localhost:8000/game';
}
document.getElementById('gotoPong').addEventListener('click', redirectToURL);

function redirectToURL() {
    window.location.href = 'https://localhost:8000/login/';
}
document.getElementById('sign_in').addEventListener('click', redirectToURL);

function signIn(){
    let oauth2Endpoint = "https://api.intra.42.fr/oauth/token"

    let form = document.createElement('form')
    form.setAttribute('method','GET')
    form.setAttribute('action',oauth2Endpoint)

    let params = {
        "access_token":"",
        "token_type":"",
        "expires_in":'',
        "scope":"",
        "created_at":''
    }
}