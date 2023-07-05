obrigatoria = JSON.parse(sessionStorage.getItem("obrigatorias_selecionadas"))
horas_obrigatorias = parseInt(sessionStorage.getItem("horas_obrigatorias"))
eletivas = JSON.parse(sessionStorage.getItem("eletivas_selecionadas"))
horas_eletivas = parseInt(sessionStorage.getItem("horas_eletivas"))
optativa = JSON.parse(sessionStorage.getItem("optativas_selecionadas"))
horas_optativas = parseInt(sessionStorage.getItem("horas_optativas"))
eletivas_optativas = JSON.parse(sessionStorage.getItem("eletivas_optativas"))
let turno_escolhido = sessionStorage.getItem("turno")


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



function resultado() {
    const qtd_obrigatoria = document.getElementById("qtd_obrigatoria")
    const qtd_eletiva = document.getElementById("qtd_eletiva")
    const qtd_optativa = document.getElementById("qtd_optativa")

    qtd_obrigatoria.innerHTML = `${obrigatoria.length}/21`
    for (let e in eletivas) {
        for (o in eletivas_optativas) {
            if (eletivas[e] == eletivas_optativas[o][0]) {
                const index = eletivas.indexOf(eletivas[e]);
                if (index > -1) {
                    eletivas.splice(index, 1);
                }
            }
        }
    }
    for (let e in eletivas_optativas) {
        optativa.push(eletivas_optativas[e][0])
    }

    qtd_eletiva.innerHTML = `${eletivas.length}/7`
    qtd_optativa.innerHTML = `${optativa.length}/12`


}


function app() {
    temaTurno()
    mudarTurno()
    resultado()
}
app()