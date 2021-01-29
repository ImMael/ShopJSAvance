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

/**
 * function that load the localStorage (this function is called after DOM Content loaded)
 */
function loadLocalStorage(){
    if(localStorage.getItem('Panier') != null){
        for(let i = 0; i < panier.length; i++){
            console.log(panier[i].title);
            // let pos = Stock.indexOf(panier[i]);
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
    addToCartButtons[i].addEventListener('click', () => {
        const title = titleCourse[i].innerText;
        const price = priceCourse[i].innerText;
        const stock = stockCourse[i].innerText;
        const imgSrc = imageCourse[i].attributes["src"].value;
        const image = imageCourse[i];
        console.log(title + " : " + price + " Amount : " + stock);
        console.log(imgSrc);
        if(stockCourse[i].innerText === '1'){
            stockCourse[i].innerText = 'Rupture de Stock';
            addToCartButtons[i].classList.add('disabled');
        } else {
            stockCourse[i].innerText = parseInt(stockCourse[i].innerText) - 1;
        }

        let articlePanier = {
            img: imgSrc,
            title: title,
            price: price,
            stock: 1
        };
        // console.log(imageCourse[i].attributes["src"].value);
        panier.push(articlePanier);
        console.log(articlePanier.title);

        localStorage.setItem('Panier', JSON.stringify(panier));

        if(priceCourse[i].innerText === 'Gratuit !'){
            unDiscount();
        }

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
        setStocks();
        discounting();
    });
}
/**
 * Function that create a notification for adding something to cart or removing something from the cart, hide after 3 seconds
 * @param {string} title name of the "course"
 * @param {string} arg2 arg to set the notification on buy or remove (has mentionned above)
 */
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
/**
 * Add back a course in the stock after removing the course from the cart
 * @param {HTML Element} index Element to add the stock
 */
function reAdd(index){
    const position = index;
    const storage = localStorage.getItem('Panier');
    let panier = JSON.parse(storage);
    for(let i=0;courseItems.length;i++){
        let title = titleCourse[i].innerText;
        if(panier[position].title === title){
            if(stockCourse[i].innerText === 'Rupture de Stock'){
                stockCourse[i].innerText = 0;
            } else {
                stockCourse[i].innerText = parseInt(stockCourse[i].innerText) + 1;
                addToCartButtons[i].classList.remove('disabled');
                break;
            }
        }
    }
}
/**
 * Remove item in the cart and in the localstorage
 * @param {*} elem element to delete
 */
function removeItem(elem){
    const index = elem.target.parentElement.parentElement.rowIndex - 1;
    const storage = localStorage.getItem('Panier');
    const total = localStorage.getItem('TotalCart');
    let panier = JSON.parse(storage);
    Notif(panier[index].title,'remove');
    reAdd(index);
    if(total > 50){
        Object.keys(COURSES).forEach(function(key) {
            let defaultPrice = COURSES[key].price;
            priceCourse[key].innerText = defaultPrice + ' €';
        });
    }
    localStorage.setItem('TotalCart',total - parseFloat(priceCourse[index].innerText));
    if(localStorage.getItem('TotalCart') <= 0){
        localStorage.setItem('TotalCart',parseFloat('0'));
    }
    setStocks();
    panier.splice(index,1);
    localStorage.setItem('Panier',JSON.stringify(panier));
    elem.target.parentElement.parentElement.remove();
    
}
/**
 * Clearing the cart
 */
function clearLocal(){
    localStorage.setItem('Panier','[]');
    localStorage.setItem('TotalCart','');
    ListInCart.remove();
    resetStocks();
    document.location.reload();
    
}
/**
 * Set the stocks in the localStorage (to display it)
 */
function setStocks(){
    localStorage.setItem('Stocks','[]');
    Stock = [];
    for(let i = 0; i < addToCartButtons.length;i++){
        let articlesStocks = {
            title: titleCourse[i].innerText,
            stocks: parseInt(stockCourse[i].innerText)
        }
        Stock.push(articlesStocks);
        localStorage.setItem('Stocks',JSON.stringify(Stock));
    }
}
/**
 * take the defaults values of the stocks and re-apply them to the courses
 */
function resetStocks(){
    let defaultStocks;
    localStorage.setItem('Stocks','[]');
    Stock = [];
    Object.keys(COURSES).forEach(function(key) {
        defaultStocks = COURSES[key].stock;
        let articlesStocks = {
            title: titleCourse[key].innerText,
            stocks: defaultStocks
        }
        Stock.push(articlesStocks);
        localStorage.setItem('Stocks',JSON.stringify(Stock));
    });
}
/**
 * Apply the discount on the courses
 */
function discounting(){
    let newPrice = 0.0;
    localStorage.setItem('TotalCart','');
    for(let i = 0;i < panier.length;i++){
        //console.log(panier[i].price);
        newPrice += parseFloat(panier[i].price.replace('€',''));
        
    }
    localStorage.setItem('TotalCart',newPrice);
    if(newPrice >= 50){
        alert('Promotion ! 1 ARTICLE OFFERT PENDANT 1 MINUTE !');
        setTimeout(unDiscount,10000);
        for(let i = 0; i < addToCartButtons.length;i++){
            priceCourse[i].innerText = 'Gratuit !';
        }
    }
}
/**
 * remove the discount on the courses
 */
function unDiscount(){
    for(let i = 0;i < addToCartButtons.length;i++){
        priceCourse[i].innerText = panier[i].price;
    }
}