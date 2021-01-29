const inpFName = document.querySelector('#nom');
const inpName = document.querySelector('#prenom');
const inpadress = document.querySelector('#adress');
const inptel = document.querySelector('#tel');
const inpMail = document.querySelector('#mail');
const inpcard = document.querySelector('#card');
const allImg = document.querySelectorAll('.icone-verif');
const allSpan = document.querySelectorAll('span');
const allLigne = document.querySelectorAll('.ligne div');
const submit = document.querySelector('.valider');

// Validation création du MDP

let valeurInp;
const specialCar = /[^a-zA-Z0-9]/;
const alphabet = /[a-z]/i;
const chiffres = /[0-9]/;

let objValidation = {
    symbole : 0,
    lettre : 0,
    chiffre : 0
}

inpFName.addEventListener('input',  function(e) {
    let inputFName = document.getElementById('nom').value;
    if(!(inputFName.length > 2) || !(/^[A-Za-z]+$/.test(inputFName))){
        allSpan[0].style.display = 'flex';
        allImg[0].src = 'ressources/error.svg'
        allImg[0].style.display = 'flex';
    } else {
        allSpan[0].style.display = 'none';
        allImg[0].src = 'ressources/check.svg'
        allImg[0].style.display = 'flex';
    }
})
inpName.addEventListener('input',  function(e) {
    let inputName = document.getElementById('prenom').value;
    if(!(inputName.length > 2) || !(/^[A-Za-z]+$/.test(inputName))){
        allSpan[1].style.display = 'flex';
        allImg[1].src = 'ressources/error.svg'
        allImg[1].style.display = 'flex';
    } else {
        allSpan[1].style.display = 'none';
        allImg[1].src = 'ressources/check.svg'
        allImg[1].style.display = 'flex';
    }
})
inpadress.addEventListener('input',  function(e) {
    let inputAdress = document.getElementById('adress').value;
    if(!(inputAdress.length > 2)){
        allSpan[2].style.display = 'flex';
        allImg[2].src = 'ressources/error.svg'
        allImg[2].style.display = 'flex';
    } else {
        allSpan[2].style.display = 'none';
        allImg[2].src = 'ressources/check.svg'
        allImg[2].style.display = 'flex';
    }
})
inpMail.addEventListener('input',  function(e) {
    let inputMail = document.getElementById('mail').value;
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputMail) && (inputMail.includes('.fr') || inputMail.includes('.com') || inputMail.includes('.net'))){
        allSpan[3].style.display = 'none';
        allImg[3].src = 'ressources/check.svg'
        allImg[3].style.display = 'flex';
    } else {
        allSpan[3].style.display = 'flex';
        allImg[3].src = 'ressources/error.svg'
        allImg[3].style.display = 'flex';
    }
})
inptel.addEventListener('input',  function(e) {
    let inputTel = document.getElementById('tel').value;
    if(!(/^\d+$/.test(inputTel))){
        allSpan[4].style.display = 'flex';
        allImg[4].src = 'ressources/error.svg'
        allImg[4].style.display = 'flex';
    } else {
        allSpan[4].style.display = 'none';
        allImg[4].src = 'ressources/check.svg'
        allImg[4].style.display = 'flex';
    }
})
inpcard.addEventListener('input',  function(e) {
    let inputCard = document.getElementById('card').value;
    if(!(/^\d+$/.test(inputCard))){
        allSpan[5].style.display = 'flex';
        allImg[5].src = 'ressources/error.svg'
        allImg[5].style.display = 'flex';
    } else {
        allSpan[5].style.display = 'none';
        allImg[5].src = 'ressources/check.svg'
        allImg[5].style.display = 'flex';
    }
})
submit.addEventListener('click',function(e){
    e.preventDefault();
    alert('Formulaire accepté mais envoie impossible');
    document.location.href = '../index.html';
});