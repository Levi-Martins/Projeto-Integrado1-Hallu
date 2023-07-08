let turno_escolhido = sessionStorage.getItem("turno")
let tcc = JSON.parse(sessionStorage.getItem("tcc"))
console.log(tcc)
let telafinal = true

function temaTurno() {
    if (turno_escolhido == "Noturno") {
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
    }
}

function mudarTurno() {
    const i_turno = document.getElementById("i_turno")
    const nome_turno = document.getElementById("nome_turno")
    if (turno_escolhido == "Diurno") {
        i_turno.classList.add('fa-sun', 'fa-moon')
        i_turno.classList.remove('fa-moon')

        nome_turno.innerText = "Diurno"
    }
    else {
        i_turno.classList.add('fa-moon')
        i_turno.classList.remove('fa-sun')

        nome_turno.innerText = "Noturno"
    }
}

function infoTcc() {
    const id_tcc = document.getElementById("nome_tcc")
    const botaoInfo = document.createElement("button")
    botaoInfo.classList.add("botaoInfo")
    botaoInfo.innerText = "i"
    id_tcc.append(botaoInfo)
    botaoInfo.addEventListener("click", (e) => {

        e.preventDefault()
        const popup = document.getElementById("popup-wrappep")
        popup.style.display = "flex"
        const nome_cadeira = document.getElementById("nome_cadeira")
        nome_cadeira.append(tcc[0][0])

        const pre_requisito = document.getElementById("pre-requisito")
        pre_requisito.innerHTML = `<b>Pré-requisito: </b>${tcc[0][3]}`
        const qtd_horas = document.getElementById("qtd_horas")
        qtd_horas.innerHTML = `<b>Quantidade de horas: </b> ${tcc[0][1]}`
        const objetivo = document.getElementById("objetivo")
        objetivo.innerHTML = `<b>Objetivo: </b>${tcc[0][2]}`
        const btn_close_popup = document.getElementById("btn_close_popup")


        btn_close_popup.addEventListener("click", () => {

            popup.style.display = "none"
            nome_cadeira.innerHTML = ""
            qtd_horas.innerHTML = ""
            pre_requisito.innerHTML = ""
            objetivo.innerHTML = ""
        })


    })


}

function inputTcc() {
    checkbox = document.getElementsByClassName("check-tcc")



    for (let checkboxItem of checkbox) {
        checkboxItem.addEventListener("click", () => {
            if (!telafinal) {
                telafinal = true
                const div = document.getElementsByClassName("input-tcc")
                for (let d in div) {
                    div[d].style.color = "#000"
                    checkbox[d].style.border = "2px solid black"
                }
            }

            let currentIndex = Array.from(checkbox).indexOf(checkboxItem)
            if (checkbox[currentIndex].value == 'consolidado') {
                checkbox[currentIndex + 1].checked = false
            }
            if (checkbox[currentIndex].value == 'nao-consolidado') {
                checkbox[currentIndex - 1].checked = false
            }
        })
    }
}


function armazenarCadeiras() {
    checkbox = document.getElementsByClassName("check-tcc")
    let tcc = []
    for (let c in checkbox) {
        if (checkbox[c].checked) {
            tcc.push(checkbox[c].value)
        }
    }
    sessionStorage.setItem("checktcc", JSON.stringify(tcc))

    const horas_complementares = (document.getElementById("horas_complementares")).value
    sessionStorage.setItem("horas_complementares", horas_complementares)


}

function atualizarCadeiras() {
    tcc = JSON.parse(sessionStorage.getItem("checktcc"))
    checkbox = document.getElementsByClassName("check-tcc")
    for (let c in checkbox) {
        checkbox[c].checked = tcc.includes(checkbox[c].value)

    }
    const horas_complementares = document.getElementById("horas_complementares")
    const horascomplementares = parseInt(sessionStorage.getItem("horas_complementares"))
    horas_complementares.value = horascomplementares

    if ((horas_complementares.value).length > 0) {
        horas_complementares.style.backgroundColor = "#baf5ab"
    }
    else {
        horas_complementares.style.backgroundColor = "#ECECEC"

    }
}

function onInput() {
    const horas_complementares = document.getElementById("horas_complementares")


    horas_complementares.addEventListener("keyup", () => {
        if ((horas_complementares.value).length > 3) {
            let nova = (horas_complementares.value).split("")
            console.log(nova)
            nova.pop()
            horas_complementares.value = nova.join('')
        }

        setInterval(() => {
            if ((horas_complementares.value).length <= 0 || horas_complementares.value == '') {
                horas_complementares.style.backgroundColor = "#ECECEC"
            }
            else {
                horas_complementares.style.backgroundColor = "#baf5ab"

            }

        }, 1000);

    })

    horas_complementares.addEventListener("keydown", () => {
        horas_complementares.style.backgroundColor = "#bac2b8"

    })



}

function finalizar() {
    const checkbox = document.getElementsByClassName("check-tcc")
    lista = []
    for (let i in checkbox) {
        if (telafinal) {
            if (checkbox[i].checked == true) {
                lista.push(checkbox[i].value)
            }
        }

    }

    if (lista.length > 0) {
        window.location.href = "resultado.html"
        armazenarCadeiras()
    }
    else {
        alert("É obrigatório marcar o TCC")

        const div = document.getElementsByClassName("input-tcc")
        for (let d in div) {
            div[d].style.color = "#f00"
            checkbox[d].style.border = "3px solid red"
            telafinal = false

        }


    }
}



function app() {
    temaTurno()
    mudarTurno()
    infoTcc()
    inputTcc()
    atualizarCadeiras()
    onInput()
}
app()