
async function request() {
    localStorage.clear()
    const loading = document.getElementById("loading")
    const turno = document.getElementById("display-turno")
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
    const btn = document.getElementById("btn-prosseguir")
    let turnoSelecionado = "diurno"
    btn.addEventListener("click", (e) => {
        e.preventDefault
        const radios = document.getElementsByName("turno")
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                turnoSelecionado = radios[i].value
                sessionStorage.setItem("turno", turnoSelecionado)
                break
            }
        }

    })


}

function app() {
    console.log("Simulação Iniciado")
    request()
    escolhaTurno()

}

app() 