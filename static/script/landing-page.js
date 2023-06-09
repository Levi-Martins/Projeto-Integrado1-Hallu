//carousel
$(document).ready(function(){
  const owl = $('.owl-carousel')
    owl.owlCarousel({
      loop:true,
      margin:10,
      dots:false,
      nav:false,
      autoWidth:true,
      items:6
    });

    $(".btn-prev").on('click', ()=>{
      owl.trigger('prev.owl.carousel');
    })
    $(".btn-next").on('click', ()=>{
      owl.trigger('next.owl.carousel');
    })
  });


  async function request() {
    // localStorage.clear()
    // sessionStorage.clear()
    const loading = document.getElementById("loading")
    if (!localStorage.getItem('arquivosArmazenados')) {
        console.log("Carregando dados")
        await axios.all([
            axios.get("http://127.0.0.1:8000/obrigatorias"),
            axios.get("http://127.0.0.1:8000/eletivas"),
            axios.get("http://127.0.0.1:8000/optativas")
        ]).then(axios.spread((ob, ele, opt) => {
            localStorage.setItem("obrigatorias", JSON.stringify(ob.data))
            localStorage.setItem("eletivas", JSON.stringify(ele.data))
            localStorage.setItem("optativas", JSON.stringify(opt.data))
        }))
        localStorage.setItem('arquivosArmazenados', true)
        console.log("Dados Carregados")
        loading.style.display = "none"

    } else {
        console.log("Arquivos já em localStorage")
        loading.style.display = "none"
    }
}

function app(){
  request()

}


app()


