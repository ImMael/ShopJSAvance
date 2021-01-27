let search_bar = document.querySelector('#search-item input');
let card_title = document.querySelectorAll('.info__card > h4');

search_bar.addEventListener('keyup',recherche);

function recherche(){
    let input = search_bar.value;
    let temp = input.toUpperCase();
    let cards = document.querySelectorAll('.course__item');
    let errormsg = document.querySelector('.hidden');
    let hiddenCards = 0;
    // console.log(temp);
    for(let i = 0; i < cards.length;i++){
        let newName = card_title[i].innerText.toUpperCase();
        if(!(newName.includes(temp))){
            cards[i].style.display = "none";
            hiddenCards++;
        } else {
            cards[i].style.display = "flex";
        }
        if(hiddenCards === cards.length){
            errormsg.setAttribute('style','display:block !important');
        } else {
            errormsg.setAttribute('style','display:none !important');
        }
    }
}
