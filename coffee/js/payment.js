import { cart } from "../data/cart.js"
import { getProduct } from "../data/product.js";
import { getDeliveryOption } from "../data/delivery.js";

export function renderPaymentSummary() {
  let totalItem = 0;
  let total_money_product = 0;
  let total_money_delivery = 0;
  let matchingProduct;
  let matchingDelivery;
  cart.forEach((item) => {
    totalItem ++;
    matchingProduct = getProduct(item.productId);
    matchingDelivery = getDeliveryOption(item.deliveryOptionId); 
    total_money_product += matchingProduct.price * item.quantity;
    total_money_delivery +=  matchingDelivery.priceCents;
  });
  const total_all_after_tax = total_money_delivery + total_money_product;
  const tax = total_all_after_tax * 10 / 100;
  const total_all_before_tax = total_all_after_tax + tax;
    const HTML = `
          <div class="payment-summary-title">Order Summary</div>
          <div class="payment-summary-row">
            <div>item(${totalItem}):</div>
            <div class="payment-summary-money">$${(total_money_product / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary-row">
            <div>Shipping & Handling:</div>
            <div class="payment-summary-money">$${(total_money_delivery / 100).toFixed(2)}</div>
          </div>
          <div class="dash-1"></div>
          <div class="payment-summary-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(total_all_after_tax / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
          </div>
          <div class="dash-2"></div>
          <div class="total-money">
            <div>Order total:</div>
            <div class="money">$${(total_all_before_tax / 100).toFixed(2)}</div>
          </div>
          <button class="place-order-button js-place-order-button">Place your order</button>
     `
     document.querySelector('.payment-summary').innerHTML = HTML;
     document.querySelector('.js-place-order-button')
     .addEventListener('click', () => {
        window.location.href = 'sign.html';
     });
}
renderPaymentSummary();
