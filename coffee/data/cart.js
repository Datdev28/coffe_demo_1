export let cart = JSON.parse(localStorage.getItem('cart')) || [];
export let cartBooking = JSON.parse(localStorage.getItem('cartBooking')) || [];
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveToCart();
}
export function saveToCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function saveToCartBooking() {
  localStorage.setItem('cartBooking', JSON.stringify(cartBooking));
}
export function removeFromToCart(productId) {
  const newCart = []; 
  cart.forEach((item) => {
    if(item.productId !== productId) {
      newCart.push(item);
    }
    cart = newCart;
    saveToCart();
  });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
   cart.forEach((item) => {
      if(item.productId === productId) {
        item.deliveryOptionId = deliveryOptionId;
      }
   });
   saveToCart();
}