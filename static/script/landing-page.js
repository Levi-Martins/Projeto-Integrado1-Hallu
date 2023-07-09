//carousel
$(document).ready(function () {
  const owl = $('.owl-carousel')
  owl.owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    autoWidth: true,
    items: 6
  });

  $(".btn-prev").on('click', () => {
    owl.trigger('prev.owl.carousel');
  })
  $(".btn-next").on('click', () => {
    owl.trigger('next.owl.carousel');
  })
});

sessionStorage.clear()


if (!sessionStorage.getItem("simuladorIniciado")) {
  sessionStorage.setItem("horas", 0)
  sessionStorage.setItem("horas_obrigatorias", 0)
  sessionStorage.setItem("horas_eletivas", 0)
  sessionStorage.setItem("horas_optativas", 0)
  sessionStorage.setItem("checktcc", JSON.stringify(['nao-marcado']))
  sessionStorage.setItem("simuladorIniciado", false)
}

function mudaVideo(){
  const check = document.querySelector('#check')
  const i = document.getElementsByTagName('i')
  const ball = document.querySelector('.ball')
  const diurno = document.querySelector('.video-diurno')
  const noturno = document.querySelector('.video-noturno')


  check.addEventListener('click', ()=>{
    if(check.checked){
      console.log("noturno")
      ball.classList.add('dark')
      i[0].classList.replace('fa-sun', 'fa-moon');  
      diurno.style.display = "none"
      noturno.style.display = "flex"

    }else{
      console.log("diurno")
      ball.classList.remove('dark')
      i[0].classList.replace('fa-moon', 'fa-sun');
      noturno.style.display = "none"
      diurno.style.display = "flex"

    }
  })
  
}
mudaVideo()
// sessionStorage.clear()
// localStorage.clear()


