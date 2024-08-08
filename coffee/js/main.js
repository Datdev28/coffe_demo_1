import { products, getProduct } from "../data/product.js";
import { addToCart, cart } from "../data/cart.js";
let btn_change_background;
let dot_change;
btn_change_background = document.querySelector('.change-background');
dot_change = btn_change_background.querySelectorAll('.dot');
dot_change.forEach((value) => {
  value.addEventListener('click', () => {
    const link_img = value.dataset.linkImg;
    document.querySelector('.section-1').style.backgroundImage = `url(${link_img})`;
    if (!value.classList.contains('is-active')) {
      check();
      value.classList.add('is-active');
    }
  });
});
function check() {
  const check_is = btn_change_background.querySelector('.is-active');
  if (check_is) {
    check_is.classList.remove('is-active');
  }
}
function loadProducts() {
  let html = ``;
  products.forEach((product) => {
    html += `        
        <div class="product">
          <img src="${product.img}">
          <div class="add-btn js-add-to-cart" data-product-id="${product.id}">
            <i class="fa-solid fa-cart-shopping"></i> ADD TO CART
          </div>
          <p>${product.name}</p>
          <div class="rate">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <p class="product-price">$${(product.price / 100).toFixed(2)}</p>
        </div>`
  });
  document.querySelector('.js-item-coffee').innerHTML = html;
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        button.innerHTML = `<i class="fa-solid fa-check"></i> Added product`;
        const productId = button.dataset.productId;
        addToCart(productId);
        quantityProduct();
      });
    });
}
loadProducts();
function quantityProduct(){
  let HTML = '';
  let quantity = 0;
  let quantityProduct = 0;
  cart.forEach((product) => {
   const matchingProduct = getProduct(product.productId);
   quantityProduct++; 
   quantity += product.quantity;
   HTML += `
      <div class="show-cart">
        <div class="container-img">
          <img src="${matchingProduct.img}">
        </div>
        <div class="product-details">
            <div class="name">Name: ${matchingProduct.name}</div>
            <div class="price">Price: $${(matchingProduct.price / 100).toFixed(2)}</div>
            <div class="quantity">Quantity: ${product.quantity} </div>
        </div>
      </div>
   `
  });
    const html = `${quantity} <div class="container-show-cart js-container-show-cart"> `
     + `${HTML} </div>`
    if(quantity > 0) {
      document.querySelector('.js-count-item-cart').innerHTML = html;
      const countItemCart = document.querySelector('.js-count-item-cart');
      const containerShowCart = document.querySelector('.js-container-show-cart')
      countItemCart.addEventListener('mouseover', () => {
        containerShowCart.style.height = `${quantityProduct * 120}px`;
      });
      countItemCart.addEventListener('mouseout', () => {
        containerShowCart.style.height = `0px`;
      });
    } else {
      document.querySelector('.js-count-item-cart').innerHTML = `
         0
        <div class="container-show-cart" 
          <div class="show-cart">
           <div class="cart-empty" style="width: 320px; display: flex; justify-content: center; padding-top: 50px; font-size: 16px;">
            Cart is empty <div>
          </div>
        </div>
      `
    }
    console.log(html);

}
quantityProduct();