  let btn_change_background;
  let dot_change;
  btn_change_background = document.querySelector('.change-background');
  dot_change = btn_change_background.querySelectorAll('.dot');
  dot_change.forEach((value) => {
    value.addEventListener('click', ()=> {
      const link_img = value.dataset.linkImg;
      document.querySelector('.section-1').style.backgroundImage = `url(${link_img})`;
       if(!value.classList.contains('is-active')){
        check();
        value.classList.add('is-active');
       }
    });
  });
  function check (){
    const check_is = btn_change_background.querySelector('.is-active');
    if(check_is){
      check_is.classList.remove('is-active');
    }
  }
  const product = [{
    
  }]
