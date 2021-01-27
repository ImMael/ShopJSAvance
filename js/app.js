const ListInCart = document.querySelector('tbody');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const courseItems = document.querySelectorAll('.course__item');
const titleCourse = document.querySelectorAll('.course__item .info__card h4');
const priceCourse = document.querySelectorAll('.course__item .info__card .discount');
const stockCourse = document.querySelectorAll('.course__item .info__card .stock');
const imageCourse = document.querySelectorAll('.course__item .course_img img');
const body = document.querySelector('body');

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
        iconClose.setAttribute('src', 'img/x-mark.png');
        iconClose.className = 'supprimer-item';
        articleRemove.appendChild(iconClose);

        article.appendChild(articleImg);
        article.appendChild(articleTitle);
        article.appendChild(articlePrice);
        article.appendChild(articleStock);
        article.appendChild(articleRemove);

        ListInCart.appendChild(article);

     // notifications ------------

        const item = document.createElement('div');
        item.setAttribute('id','notification_container');

        const itemcontent = document.createElement('div');
        itemcontent.setAttribute('class','content');

        const itemimg = document.createElement('img');
        itemimg.setAttribute('src','img/info.png');

        const itemtxt = document.createElement('p');
        itemtxt.innerHTML = title + ' à été ajouté au panier';

        
        itemcontent.appendChild(itemimg);
        itemcontent.appendChild(itemtxt);
        item.appendChild(itemcontent);
        body.appendChild(item);

        

    });
}


// function AjouterAuPanier(e){
//     e.preventDefault();
//     // let id = parseInt(e.target.attributes[2].value);
//     console.log(e.target.parentNode.firstChild.nextSibling.innerText);
// }