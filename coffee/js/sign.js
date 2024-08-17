let isActive = false;
document.querySelector('.js-check-box')
.addEventListener('click', () => {
  if(!isActive){
    document.querySelector('.js-check-icon').style.visibility = 'visible';
    isActive = true;
  } else {
    document.querySelector('.js-check-icon').style.visibility = 'hidden';
    isActive = false;
  }
});
const login_btn = document.querySelector('.js-login-btn');
function login() {
  const getValueUser = document.querySelector('.js-input-user').value;
  const getValuePassword = document.querySelector('.js-input-password').value;
  if(getValueUser === ''){
    document.querySelector('.js-error-user').style.visibility = 'visible';
  }else {
    document.querySelector('.js-error-user').style.visibility = 'hidden';
  }
  if(getValuePassword === ''){
    document.querySelector('.js-error-password').style.visibility = 'visible';
  }else {
    document.querySelector('.js-error-password').style.visibility = 'hidden';
  }
  if(getValueUser === 'quangdat2804' && getValuePassword === '123'){
    login_btn.innerHTML = `
    <div class="container-dot">
      <div class="dot1"></div>
      <div class="dot2"></div>
      <div class="dot3"></div>
    </div>
  `
  setTimeout(() => {
    window.location.href = 'booking.html';
  }, 3000);
  }
}
login_btn.addEventListener('click', () => {
  login();
});
document.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
    login();
  }
});
