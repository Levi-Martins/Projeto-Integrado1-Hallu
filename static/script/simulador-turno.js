
async function request() {
  localStorage.clear()

  if (!localStorage.getItem('arquivosArmazenados')) {
    console.log("Carregando dados")
    const loading = document.getElementById("loading")
    const text_loading = document.getElementById("text_loading")
    const totalRequests = 3
    let progress = 0
    text_loading.innerText = `Carregando: 0`

    const updateProgress = () => {
      progress++
      const percentage = Math.round((progress * 100) / totalRequests)
      text_loading.innerText = `Carregando: ${percentage}%`


    }
    console.log(`Progresso: 0%`)

    // Requisição 1
    await axios.get("http://127.0.0.1:8000/obrigatorias")
      .then(response => {
        localStorage.setItem("obrigatorias", JSON.stringify(response.data))
        updateProgress()
      })

    // Requisição 2
    await axios.get("http://127.0.0.1:8000/eletivas")
      .then(response => {
        localStorage.setItem("eletivas", JSON.stringify(response.data))
        updateProgress()
      })

    // Requisição 3
    await axios.get("http://127.0.0.1:8000/optativas")
      .then(response => {
        localStorage.setItem("optativas", JSON.stringify(response.data))
        updateProgress()
      })

    localStorage.setItem('arquivosArmazenados', true)
    console.log("Dados Carregados")
    loading.style.display = "none"
  } else {
    loading.style.display = "none"

    console.log("Arquivos já em localStorage")
  }
}

function escolhaTurno() {
  const chk = document.getElementById('check')
  const i = document.getElementsByTagName('i')
  if (!sessionStorage.getItem("bool_turno")) {
    sessionStorage.setItem("turno", "Diurno")
    sessionStorage.setItem("bool_turno", true)
  }

  const btn_prosseguir = document.getElementById("btn-turnos")
  let turno_escolhido = sessionStorage.getItem("turno")

  if (turno_escolhido === "Noturno") {
    chk.checked = true;
    document.body.classList.add('dark')

    i[0].classList.replace('fa-sun', 'fa-moon');
  } else {
    chk.checked = false;
    document.body.classList.remove('dark')

    i[0].classList.replace('fa-moon', 'fa-sun');
  }

  chk.addEventListener('click', () => {
    const simuladorIniciado = sessionStorage.getItem("simuladorIniciado")
    console.log(simuladorIniciado)

    if (simuladorIniciado == "true") {
      chk.checked = (chk.checked == true) ? false : true
      const popupWrappep = document.querySelector('.popup-wrappep')
      // alert("Vai perder tudo, Maluco")
      popupWrappep.style.display = 'flex'
      const btn_mudar = document.getElementById("btn-mudar")
      const btn_manter = document.getElementById("btn-nao-mudar")
      btn_mudar.addEventListener("click", () => {
        sessionStorage.clear()
        sessionStorage.setItem("horas", 0)
        sessionStorage.setItem("horas_obrigatorias", 0)
        sessionStorage.setItem("horas_eletivas", 0)
        sessionStorage.setItem("horas_optativas", 0)
        sessionStorage.setItem("simuladorIniciado", false)
        sessionStorage.setItem("bool_turno", true)
        if (chk.checked == true) {
          chk.checked = false
        }
        else {
          chk.checked = true
        }
        if (chk.checked) {
          turno_escolhido = "Noturno"
          console.log(turno_escolhido)
          document.body.classList.add('dark')


          i[0].classList.replace('fa-sun', 'fa-moon');
        } else {
          turno_escolhido = "Diurno"
          console.log(turno_escolhido)
          document.body.classList.remove('dark')


          i[0].classList.replace('fa-moon', 'fa-sun');
        }

        console.log(chk.checked)

        popupWrappep.style.display = 'none'
      })

      btn_manter.addEventListener("click", () => {
        popupWrappep.style.display = 'none'

      })

    }
    const check = document.getElementById('check')
    if (check.checked) {
      turno_escolhido = "Noturno"
      console.log(turno_escolhido)
      document.body.classList.add('dark')


      i[0].classList.replace('fa-sun', 'fa-moon');
    } else {
      turno_escolhido = "Diurno"
      console.log(turno_escolhido)
      document.body.classList.remove('dark')


      i[0].classList.replace('fa-moon', 'fa-sun');
    }
  })



  btn_prosseguir.addEventListener("click", () => {
    sessionStorage.setItem("turno", turno_escolhido)
  })





}


function app() {
  console.log("Simulação Iniciado")
  request()
  escolhaTurno()

}

app() 