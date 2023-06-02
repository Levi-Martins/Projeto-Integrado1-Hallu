//carousel
$(document).ready(function(){
  const owl = $('.owl-carousel')
    owl.owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1440:{
              items:4
          },
          1920:{
            items:5
        }

      }
    });

    $(".btn-prev").on('click', ()=>{
      owl.trigger('prev.owl.carousel');
    })
    $(".btn-next").on('click', ()=>{
      owl.trigger('next.owl.carousel');
    })
  });



