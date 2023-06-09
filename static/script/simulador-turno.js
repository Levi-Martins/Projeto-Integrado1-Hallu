
async function request() {
    // localStorage.clear()
    const loading = document.getElementById("loading")
    const turno = document.getElementById("background-turnos")
    if (!localStorage.getItem('arquivosArmazenados')) {
        turno.style.display = "none"
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
        turno.style.display = "flex"
        loading.style.display = "none"

    } else {
        console.log("Arquivos já em localStorage")
        loading.style.display = "none"

    }

}


function escolhaTurno() {
    const chk = document.getElementById('check')
    const i = document.getElementsByTagName('i')
    let turno_escolhido = "Diurno"
    const btn_prosseguir = document.getElementById("btn-turnos")
    chk.addEventListener('click', () => {
        document.body.classList.toggle('dark')

        const check = document.getElementById('check')
        if (check.checked) {
            console.log('aaaa')
            turno_escolhido = "Noturno"

            i[0].classList.replace('fa-sun', 'fa-moon');
        } else {
            console.log('bbbb')
            turno_escolhido = "Diurno"
            i[0].classList.replace('fa-moon', 'fa-sun');
        }
    })
    btn_prosseguir.addEventListener("click", () =>{
        sessionStorage.setItem("turno",turno_escolhido)
    })
    


}


function app() {
    console.log("Simulação Iniciado")
    request()
    escolhaTurno()

}

app() 