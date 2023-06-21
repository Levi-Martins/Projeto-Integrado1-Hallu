
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
    let turno_escolhido = sessionStorage.getItem("turno");

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