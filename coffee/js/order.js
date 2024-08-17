import { cart, saveToCart, removeFromToCart, updateDeliveryOption } from "../data/cart.js";
import { getProduct } from "../data/product.js";
import { deliveryOptions, getDeliveryOption } from "../data/delivery.js";
import { renderPaymentSummary } from "./payment.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function renderOrder() {
  function loadCart() {
    let HTML = '';
    cart.forEach((item) => {
      const today = dayjs();
      const deliveryOption = getDeliveryOption(item.deliveryOptionId);
      const deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDay.format('dddd, MMMM D');
      const matchingProduct = getProduct(item.productId);
      HTML += `
            <div class="order-infomation js-order-infomation-${matchingProduct.id}">
              <div class="delivery-date">Delivery date: ${dateString} </div>
              <div class="product-infomation">
                <div class="product-img">
                  <img src="${matchingProduct.img}">
                </div>
                <div class="product-details">
                  <div class="product-name">${matchingProduct.name}</div>
                  <div class="product-price">$${(matchingProduct.price / 100).toFixed(2)}</div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">Quantity: ${item.quantity}</div>
                  <div class="edit-quantity">
                    <span class="update-quantity" data-product-id="${matchingProduct.id}">Update</span>
                    <span class="js-update-quantity js-update-quantity-${matchingProduct.id}">
  
                    </span>
                    <span class="delete-product js-delete-product" data-product-id="${matchingProduct.id}">delete</span>
                  </div>
                </div>
                <div class="delivery-options">
                  <div class="delivery-option-title">Choose a delivery option:</div>
                     ${deliveryOptionsHTML(matchingProduct, item)}   
                </div>
              </div>
            </div>
      `
    });
    document.querySelector('.js-container-order-infomation').innerHTML = HTML;
  }
  loadCart();
   function deliveryOptionsHTML(matchingProduct, item) {
    let HTML = ``

    deliveryOptions.forEach((option) => {
      const isCheck = option.id === item.deliveryOptionId;
      const today = dayjs();
      const deliveryDay = today.add(option.deliveryDays, 'days');
      var dateString = deliveryDay.format('dddd, MMMM D');
      const priceString = option.priceCents === 0
        ? 'Free shiping' : `$${(option.priceCents / 100).toFixed(2)} - Shipping`
      HTML += `         
                <div class="delivery-option" data-product-id="${matchingProduct.id}"
                 data-option-id="${option.id}">
                  <input type="radio" ${isCheck ? 'checked' : ''} 
                  name= "delivery-option-${matchingProduct.id}"
                  class="delivery-option-input">
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString}</div>
                  </div>
                </div>`
    });
    return HTML;
  }
  document.querySelectorAll('.delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const productId = option.dataset.productId;
        const deliveryOptionId = option.dataset.optionId;
        updateDeliveryOption(productId, deliveryOptionId);
        renderPaymentSummary();
        renderOrder();
      });
    });
  document.querySelectorAll('.update-quantity')
    .forEach((update) => {
      update.addEventListener('click', () => {
        const productId = update.dataset.productId;
        const updateQuantity = document.querySelector(`.js-update-quantity-${productId}`);
        updateQuantity.innerHTML = `
        <input class="quantity-input" type="number" min="1">
        <span class="save-input js-save">save</span>
        `
        document.querySelector('.js-save')
          .addEventListener('click', () => {
            const getValueInput = parseInt(document.querySelector('.quantity-input').value);
            document.querySelector(`.js-product-quantity-${productId}`).innerHTML = `Quantity: ${getValueInput}`;
            updateQuantity.innerHTML = '';
            cart.forEach((value) => {
              if (value.productId === productId) {
                value.quantity = getValueInput;
                renderPaymentSummary();
                saveToCart();
              }
            });
          });
      });
    });
  document.querySelectorAll('.js-delete-product')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromToCart(productId);
        document.querySelector(`.js-order-infomation-${productId}`).remove();
        renderPaymentSummary();
      });
    });
}
renderOrder();
