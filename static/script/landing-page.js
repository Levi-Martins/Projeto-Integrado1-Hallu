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
  sessionStorage.setItem("simuladorIniciado", false)
}
// sessionStorage.clear()
// localStorage.clear()

function gerarPdf() {
  const content = document.getElementById("content")
  const options = {
    margin: [10, 10, 10, 10],
    filename: "arquivo.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }
  html2pdf().set(options).from(content).save()

}

