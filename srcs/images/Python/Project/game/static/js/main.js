function PlayTheGame() {
    window.location.href = 'https://localhost:8000/game';
}
document.getElementById('gotoPong').addEventListener('click', PlayTheGame);

function redirectToLogin() {
    window.location.href = 'https://localhost:8000/login/';
}
document.getElementById('sign_in').addEventListener('click', redirectToLogin);

function RevokeToken() {
    window.location.href = 'https://localhost:8000/token/';
}
document.getElementById('viewToken').addEventListener('click', RevokeToken);