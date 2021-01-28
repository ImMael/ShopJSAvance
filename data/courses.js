const COURSES = {
  1: {id: 1, img: 'ux_ui.jpg', title: 'UX/UI', initial_price: 200, price: 9.99, mark: 4, stock: 10},
  2: {id: 2, img: 'php_8.png', title: 'PHP 8', initial_price: 200, price: 9.99, mark: 3, stock: 10},
  3: {id: 3, img: 'react_js.png', title: 'React JS', initial_price: 200, price: 9.99, mark: 2, stock: 5},
  4: {id: 4, img: 'node_js.jpg', title: 'Node JS', initial_price: 200, price: 9.99, mark: 5, stock: 3},
  5: {id: 5, img: 'my_sql.png', title: 'MySQL', initial_price: 200, price: 9.99, mark: 4, stock: 2}
}
{/* <div class="course__item">
      <figure class="course_img">
        <img src="img/courses/ux_ui.jpg">
      </figure>
      <div class="info__card">
        <h4>UX/UI</h4>
        <figure class="mark m_4">
          <img src="img/rates.png">
        </figure>
        <p>
          <span class="price">200 €</span>
          <span class="discount">9.99 €</span>
        </p>
        <p>
          Disponible: <span class="stock">10</span>
        </p>
        <a href="#" class="add-to-cart" data-id="1"><i class="fa fa-cart-plus"></i>Ajouter au panier</a>
      </div>
    </div> */}
    
const CardsContainer = document.querySelector('.courses__container');

for(let i=1;i <= 5;i++){
  let id = COURSES[i]['id'];
  let image = COURSES[i]['img'];
  let title = COURSES[i]['title'];
  let initial_price = COURSES[i]['initial_price'];
  let price = COURSES[i]['price'];
  let mark = COURSES[i]['mark'];
  let stock = COURSES[i]['stock'];
  console.log(id, image, title, initial_price, price, mark, stock);

  const courseItem = document.createElement('div');
  courseItem.className = 'course__item';
  
  const figureItem = document.createElement('figure');
  figureItem.className = 'course_img';

  const imageItem = document.createElement('img');
  imageItem.src = `img/courses/${image}`;
  figureItem.appendChild(imageItem);

  const cardInfo = document.createElement('div');
  cardInfo.className = 'info__card';

  const nameItem = document.createElement('h4');
  nameItem.innerText = title;

  const figureRates = document.createElement('figure');
  figureRates.className = `mark m_${mark}`;

  const ratesImg = document.createElement('img');
  ratesImg.src = 'img/rates.png';
  figureRates.appendChild(ratesImg);

  const priceParas = document.createElement('p');
  const spanInitPrice = document.createElement('span');
  spanInitPrice.className = 'price';
  spanInitPrice.innerText = `${initial_price} €`;
  priceParas.appendChild(spanInitPrice);

  const spanPrice = document.createElement('span');
  spanPrice.className = 'discount';
  spanPrice.innerText = `${price} €`;
  priceParas.appendChild(spanPrice);

  const dispoPara = document.createElement('p');
  const spanDispo = document.createElement('span');
  spanDispo.className = 'stock';
  spanDispo.innerText = stock;
  // dispoPara.innerHTML = `Disponible: ${spanDispo}`;
  dispoPara.innerText = 'Disponible: ';
  dispoPara.appendChild(spanDispo);

  const addButton = document.createElement('a'); //<a href="#" class="add-to-cart" data-id="1"><i class="fa fa-cart-plus"></i>Ajouter au panier</a>
  addButton.setAttribute('href', '#');
  addButton.setAttribute('data-id', id);
  addButton.className = 'add-to-cart';

  const iconAdd = document.createElement('i');
  iconAdd.className = 'fa fa-cart-plus';
  addButton.appendChild(iconAdd);
  addButton.innerText = 'Ajouter au panier';

  cardInfo.appendChild(nameItem);
  cardInfo.appendChild(figureRates);
  cardInfo.appendChild(priceParas);
  cardInfo.appendChild(dispoPara);
  cardInfo.appendChild(addButton);

  courseItem.appendChild(figureItem);
  courseItem.appendChild(cardInfo);

  CardsContainer.appendChild(courseItem);
}
