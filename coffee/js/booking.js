import { cartBooking, saveToCartBooking } from "../data/cart.js";

function renderBooking (){
  const booking = cartBooking.pop();
  saveToCartBooking();
  const selectPeople = document.querySelector('.select-people');
  selectPeople.querySelectorAll('option').forEach((option) => {
    if(booking.peopleValue === `${option.value}`){
         option.selected = true;
    }
  });
  const selectTime = document.querySelector('.select-time');
  selectTime.querySelectorAll('option').forEach((option) => {
    if(booking.timeValue === `${option.value}`) {
      option.selected = true;
    }
  });
  const date = new Date(booking.dateValue);
  const getMonth = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"];
  const day = date.getDate();
  const month = getMonth[date.getMonth()];
  const year = date.getFullYear();
  const formatDate =  document.querySelector('.js-box-date')
  formatDate.innerHTML = `${day} ${month}, ${year}`;
  document.querySelector('.js-confirm-btn')
  .addEventListener('click', () => {
    const numberPhone = document.querySelector('.number-phone-input').value;
    if(numberPhone.length > 10) {
      document.querySelector('.error-number').style.visibility = 'visible';
    } else {
      document.querySelector('.error-number').style.visibility = 'hidden';
    }
    const phoneRegex = /^0\d+$/;
    if(phoneRegex.test(numberPhone)) {
      document.querySelector('.error-characters').style.visibility = 'hidden';
    } else {
      document.querySelector('.error-characters').style.visibility = 'visible';
    }
});
}
renderBooking();

