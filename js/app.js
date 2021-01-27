const ListInCart = document.querySelector('tbody');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const courseItems = document.querySelectorAll('.course__item');
const titleCourse = document.querySelectorAll('.course__item .info__card h4');
const priceCourse = document.querySelectorAll('.course__item .info__card .discount');
const stockCourse = document.querySelectorAll('.course__item .info__card .stock');
const imageCourse = document.querySelectorAll('.course__item .course_img img');
const emptyCart = document.querySelector('#empty-cart');
const body = document.querySelector('body');
let panier = JSON.parse(localStorage.getItem('Panier')) || [];
const item = document.createElement('ul');
item.setAttribute('id','notification_container');

document.addEventListener('DOMContentLoaded', loadLocalStorage);
emptyCart.addEventListener('click',clearLocal);

function loadLocalStorage(){
    if(localStorage.getItem('Panier') != null){
        for(let i = 0; i < panier.length; i++){
            console.log(panier[i].title);
            const article = document.createElement('tr');

            const articleImg = document.createElement('td');

            const imageTd = document.createElement('img');
            imageTd.setAttribute('src', panier[i].img);
            articleImg.appendChild(imageTd);

            const articleTitle = document.createElement('td');
            articleTitle.innerText = panier[i].title;

            const articlePrice = document.createElement('td');
            articlePrice.innerText = panier[i].price;

            const articleStock = document.createElement('td');
            articleStock.innerText = panier[i].stock;

            const articleRemove = document.createElement('td');
            const iconClose = document.createElement('img');
            iconClose.addEventListener('click',removeItem);
            iconClose.setAttribute('src', 'img/x-mark.png');
            iconClose.className = 'supprimer-item';

            articleRemove.appendChild(iconClose);
            article.appendChild(articleImg);
            article.appendChild(articleTitle);
            article.appendChild(articlePrice);
            article.appendChild(articleStock);
            article.appendChild(articleRemove);
            ListInCart.appendChild(article);
        }
    } else {
        console.log('LocalStorage Vide')
    }
}

// Fonction d'ajout au panier

// addToCartButtons.forEach(addToCart => {
//     addToCart.addEventListener('click', AjouterAuPanier);
// });

for(let i = 0; i < addToCartButtons.length; i++){
    const title = titleCourse[i].innerText;
    const price = priceCourse[i].innerText;
    const stock = stockCourse[i].innerText;
    const imgSrc = imageCourse[i].attributes["src"].value;
    const image = imageCourse[i];

    

    addToCartButtons[i].addEventListener('click', () => {
        console.log(title + " : " + price + " Amount : " + stock);
        console.log(imgSrc);

        let articlePanier = {
            img: imgSrc,
            title: title,
            price: price,
            stock: 1
        };
        console.log(imageCourse[i].attributes["src"].value);
        panier.push(articlePanier);
        console.log(articlePanier.title);

        localStorage.setItem('Panier', JSON.stringify(panier));

        const article = document.createElement('tr');

        const articleImg = document.createElement('td')
        const imageTd = document.createElement('img');
        imageTd.setAttribute('src', imgSrc);
        articleImg.appendChild(imageTd);

        const articleTitle = document.createElement('td');
        articleTitle.innerText = title;

        const articlePrice = document.createElement('td');
        articlePrice.innerText = price;

        const articleStock = document.createElement('td');
        articleStock.innerText = 1;

        const articleRemove = document.createElement('td');
        const iconClose = document.createElement('img');
        iconClose.addEventListener('click',removeItem);
        iconClose.setAttribute('src', 'img/x-mark.png');
        iconClose.className = 'supprimer-item';
        articleRemove.appendChild(iconClose);

        article.appendChild(articleImg);
        article.appendChild(articleTitle);
        article.appendChild(articlePrice);
        article.appendChild(articleStock);
        article.appendChild(articleRemove);

        ListInCart.appendChild(article);
        Notif(title);
    });
}

function Notif(title,arg2 = "buy"){
    const itemcontent = document.createElement('li');
    itemcontent.setAttribute('class','content');

    const itemimg = document.createElement('img');
    itemimg.setAttribute('src','img/info.png');

    const itemtxt = document.createElement('p');
    if(arg2 === "buy"){
        itemtxt.innerHTML = title + ' à été ajouté au panier';
    } else {
        itemtxt.innerHTML = title + ' à été supprimé du panier';
    }

    itemcontent.appendChild(itemimg);
    itemcontent.appendChild(itemtxt);
    item.appendChild(itemcontent);
    body.appendChild(item);
    setTimeout(function() {
        item.removeChild(itemcontent);
    },3000);
}

function removeItem(elem){
    const index = elem.target.parentElement.parentElement.rowIndex - 1;
    const storage = localStorage.getItem('Panier');
    let panier = JSON.parse(storage);
    Notif(panier[index].title,'remove');
    panier.splice(index,1);
    let testa = JSON.stringify(panier);
    localStorage.setItem('Panier',testa);
    elem.target.parentElement.parentElement.remove();
}

function clearLocal(){
    localStorage.clear();
    ListInCart.remove();
}

// function AjouterAuPanier(e){
//     e.preventDefault();
//     // let id = parseInt(e.target.attributes[2].value);
//     console.log(e.target.parentNode.firstChild.nextSibling.innerText);
// }