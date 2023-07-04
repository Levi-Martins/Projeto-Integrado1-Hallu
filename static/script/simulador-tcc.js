let turno_escolhido = sessionStorage.getItem("turno")
let tcc = JSON.parse(sessionStorage.getItem("tcc"))


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




function app() {
    temaTurno()
    mudarTurno()
    infoTcc()
}
app()