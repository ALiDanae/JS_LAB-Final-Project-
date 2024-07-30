const swiper = new Swiper('.swiper', {

  direction: 'horizontal',
 
  loop: true,
 
  autoplay: {
 
    delay: 1500
 
  },

  scrollbar: {

    el: '.swiper-scrollbar',

  },

});




var DATA = [];

var products = [];



fetch('https://dummyapi.online/api/products')

  .then(response => response.json())

  .then(json => {

    DATA.push(...json);

    render(DATA);

  })

  .catch(error => console.error('Error fetching data:', error));




function render(list) {

  const template = list.map(item => {

    return `<div class="product">
   
                <img src="${item.featuredImage}" alt="">
   
                <h3>${item.name}</h3>
   
                <p>${item.brand}</p>
   
                <h2>${item.basePrice}$</h2>

                <button class="addToBasket">افزودن به سبد خرید</button>
   
              </div>`;

  }).join("");




  document.getElementById("root").innerHTML = template;

}











//  cart js








const cart = [];




function renderCart() {

  const cartItemsContainer = document.querySelector('.cart-items');

  const totalPriceElement = document.querySelector('.total-price');

  const cartCountElement = document.querySelector('.cart-count');




  cartItemsContainer.innerHTML = '';

  let totalPrice = 0;




  cart.forEach((item, index) => {

    const itemElement = document.createElement('div');

    itemElement.classList.add('cart-item');

    itemElement.innerHTML = `

           <img src="${item.featuredImage}" alt="${item.name}">

           <div class="cart-item-details">

               <div class="cart-item-name">${item.name}</div>

               <div class="cart-item-brand">${item.brand}</div>

               <div class="cart-item-price">$${item.basePrice.toFixed(2)}</div>

           </div>

           <div class="cart-item-quantity">

               <button class="quantity-button" onclick="changeQuantity(${index}, -1)">-</button>

               <input type="number" class="quantity-input" value="${item.quantity}" min="1" readonly>

               <button class="quantity-button" onclick="changeQuantity(${index}, 1)">+</button>

           </div>

       `;

    cartItemsContainer.appendChild(itemElement);




    totalPrice += item.basePrice * item.quantity;

  });




  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

  cartCountElement.textContent = cart.length;

}




function changeQuantity(index, delta) {

  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }

  renderCart();

}




function addToCart(item) {

  const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

  if (existingItemIndex !== -1) {

      cart[existingItemIndex].quantity += 1;

  } else {

      cart.push({ ...item, quantity: 1 });

  }

  renderCart();

}





const sampleProduct = {

  name: 'iPhone 12 Pro Max',

  brand: 'Apple',

  basePrice: 1099,

  featuredImage: 'https://example.com/iphone12promax.jpg'

};





document.addEventListener('DOMContentLoaded', () => {

  addToCart(sampleProduct);

});