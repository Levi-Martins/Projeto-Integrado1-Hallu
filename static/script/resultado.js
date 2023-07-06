obrigatoria = JSON.parse(sessionStorage.getItem("obrigatorias_selecionadas"))
horas_obrigatorias = parseInt(sessionStorage.getItem("horas_obrigatorias"))
eletivas = JSON.parse(sessionStorage.getItem("eletivas_selecionadas"))
horas_eletivas = parseInt(sessionStorage.getItem("horas_eletivas"))
optativa = JSON.parse(sessionStorage.getItem("optativas_selecionadas"))
horas_optativas = parseInt(sessionStorage.getItem("horas_optativas"))
eletivas_optativas = JSON.parse(sessionStorage.getItem("eletivas_optativas"))
horas_optativas_livres = parseInt(sessionStorage.getItem("horas_livres"))
horas_complementares = parseInt(sessionStorage.getItem("horas_complementares"))
tcc = sessionStorage.getItem("tcc")
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
        console.log(i_turno.classList)
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
    const qtd_livre = document.getElementById("qtd_optativa_livre")
    const qtd_complementares = document.getElementById("qtd_complementares")
    const qtd_tcc = document.getElementById("tcc_consolidado")
    if (!horas_complementares) {
        horas_complementares = 0
    }

    if (!horas_optativas_livres) { horas_optativas_livres = 0 }


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
    console.log(eletivas.length)
    qtd_eletiva.innerHTML = `${eletivas.length}/7`
    qtd_optativa.innerHTML = `${optativa.length}/12`
    qtd_livre.innerHTML = `Horas de Optativas Livres ${horas_optativas_livres}h`
    qtd_complementares.innerHTML = `Horas Complementares ${horas_complementares}h`
    if (tcc == '["nao-consolidado"]') {
        qtd_tcc.innerHTML = `TCC sem nota consolidada`

    }
    else if (tcc == '["consolidado"]') qtd_tcc.innerHTML = `TCC com nota consolidada`
    console.log(tcc)

    const h1 = document.getElementById("h1-texto")
    const h2 = document.getElementById("h2-texto'")
    if (obrigatoria.length >= 21 && eletivas.length >= 7 && optativa.length >= 12 && horas_complementares >= 192 && tcc == '["consolidado"]'){
        h1.innerHTML = 'Parabéns!'
        h2.innerHTML = 'Você já está apto a se formar!'
    }
    else{
        h1.innerHTML = 'Quase lá!'
        h2.innerHTML = 'Você ainda não está apto a se formar.'
    }

}


function app() {
    temaTurno()
    mudarTurno()
    resultado()
}
app()