

let horas_eletivas = parseInt(sessionStorage.getItem("horas_eletivas"))
let turno_escolhido = sessionStorage.getItem("turno")
let cadeira = JSON.parse(localStorage.getItem("eletivas"))
let eletivas_optativas = JSON.parse(sessionStorage.getItem("eletivas_optativas"))
let clique = false

function temaTurno() {
    if (turno_escolhido == "Noturno") {
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
    }
}


function eletivas() {
    let horas_cadeira

    const semestres = document.getElementsByClassName("cadeiras-semestre")


    for (let i in cadeira) {
        const selecionar_todas = document.createElement("input")
        const label_todas = document.createElement("label")
        selecionar_todas.setAttribute("type", "checkbox")
        selecionar_todas.setAttribute("name", "todas")
        selecionar_todas.setAttribute("value", `semestre${i}`)
        label_todas.appendChild(selecionar_todas)
        label_todas.append("Adicionar Todas")
        semestres[i].appendChild(label_todas)

        selecionar_todas.addEventListener("click", () => {
            clique = true
            const checkboxes = semestres[i].querySelectorAll('input[name="eletivas"]')
            for (let j = 0; j < checkboxes.length; j++) {

                horas_cadeira = parseInt(cadeira[i][j][1])

                if (selecionar_todas.checked == true) {
                    if (checkboxes[j].checked == false) {
                        checkboxes[j].checked = selecionar_todas.checked
                        horas_eletivas += horas_cadeira
                        console.log(`Somando horas: ${horas_eletivas}`)
                    }
                }
                else {
                    if (checkboxes[j].checked == true) {
                        checkboxes[j].checked = selecionar_todas.checked
                        horas_eletivas -= horas_cadeira
                        console.log(`Diminuindo horas: ${horas_eletivas}`)

                    }
                }

            }
        })


        for (let j in cadeira[i]) {
            const input = document.createElement("input")
            const label = document.createElement("label")
            const botaoInfo = document.createElement("button")
            botaoInfo.classList.add("botaoInfo")
            botaoInfo.innerText = "i"
            input.setAttribute("type", "checkbox")
            input.setAttribute("name", "eletivas")
            input.setAttribute("value", cadeira[i][j][0])
            label.appendChild(input)
            label.append(cadeira[i][j][0])
            label.classList.add('texto-label')
            label.append(botaoInfo)
            botaoInfo.addEventListener("click", (e) => {
                e.preventDefault()
                const popup = document.getElementById("popup-wrappep")
                popup.style.display = "flex"


                const nome_cadeira = document.getElementById("nome_cadeira")
                nome_cadeira.append(cadeira[i][j][0])


                const pre_requisito = document.getElementById("pre-requisito")
                pre_requisito.innerHTML = `<b>Pré-requisito: </b>${cadeira[i][j][3]}`
                const qtd_horas = document.getElementById("qtd_horas")
                qtd_horas.innerHTML = `<b>Quantidade de horas: </b> ${cadeira[i][j][1]}`
                const objetivo = document.getElementById("objetivo")
                objetivo.innerHTML = `<b>Objetivo: </b>${cadeira[i][j][2]}`
                const btn_close_popup = document.getElementById("btn_close_popup")


                btn_close_popup.addEventListener("click", () => {

                    popup.style.display = "none"
                    nome_cadeira.innerHTML = ""
                    qtd_horas.innerHTML = ""
                    pre_requisito.innerHTML = ""
                    objetivo.innerHTML = ""
                })

            })

            //espaçamento do botão em labeis que possuem quebra de linha


            semestres[i].appendChild(label)
            horas_cadeira = parseInt(cadeira[i][j][1])

            if (label.clientHeight > 35) {
                botaoInfo.style.marginRight = '30px'
            }



            input.addEventListener("click", function (hora_cad) {
                return () => {
                    clique = true
                    if (input.checked == true) {
                        horas_eletivas += parseInt(hora_cad)

                    }



                    else if (input.checked == false) {

                        horas_eletivas -= parseInt(hora_cad)


                    }


                    if (horas_eletivas <= 0) horas_eletivas = 0
                    if (selecionar_todas.checked == true) {
                        selecionar_todas.checked = false
                    }

                    const semestre_input = semestres[i].querySelectorAll("input[name='eletivas']")
                    let len = 0;
                    let ele = 0;
                    semestre_input.forEach(element => {
                        ele++
                        if (element.checked == true) {
                            len++
                        }
                    })
                    if (len == ele) {
                        selecionar_todas.checked = true
                    }



                }

            }(horas_cadeira))


        }

    }
    const redefinir = document.getElementById("limpar")
    redefinir.addEventListener("click", () => {

        const aparecerPopupLimpar = document.querySelector(".popup-wrappep-limpar")
        aparecerPopupLimpar.style.display = "flex"
        const limparCadeiras = document.querySelector("#btn-limpar")
        const fecharPopupLimpar = document.querySelector("#btn-nao-limpar")
        limparCadeiras.addEventListener('click', () => {
            const checkboxes = document.getElementsByName("eletivas")
            for (let c in checkboxes) {
                checkboxes[c].checked = false
            }
            const todas = document.getElementsByName("todas")
            for (let t in todas) {
                todas[t].checked = false
            }
            q = 0
            horas_eletivas = 0
            sessionStorage.removeItem("eletivas_optativas")
            aparecerPopupLimpar.style.display = "none"
        })
        fecharPopupLimpar.addEventListener("click", () => {
            aparecerPopupLimpar.style.display = "none"
        })


    })

}



function armazenarCadeiras() {

    const forms = document.getElementsByClassName("cadeiras-semestre")

    let lista = []
    let q = 0
    for (let e in eletivas_optativas) {
        if (eletivas_optativas[e][4] == 1) {
            q++
        }
    }
    if (q == 0 || clique) {
        for (let f = 0; f < forms.length; f++) {
            const checkboxes = forms[f].querySelectorAll('input[name="eletivas"]')
            let x = 0
            let nocheckbox = []
            let yescheckbox = []


            for (let k = 0; k < checkboxes.length; k++) {
                if (checkboxes[k].checked) {
                    x++
                    if (f == 0 && x > 4) {
                        yescheckbox.push(k)
                    }
                    else if (f == 1 && x > 3) {
                        yescheckbox.push(k)

                    }

                }
                if (!checkboxes[k].checked) {
                    nocheckbox.push(k)
                }

            }


            if (f == 0) {
                if (x >= 4) {
                    for (let k of nocheckbox) {
                        lista.push([cadeira[0][k][0], cadeira[0][k][1], cadeira[0][k][2], cadeira[0][k][3], 0])
                    }
                    for (let x of yescheckbox) {
                        lista.push([cadeira[0][x][0], cadeira[0][x][1], cadeira[0][x][2], cadeira[0][x][3], 1])
                    }
                }

            }
            else {

                if (x >= 3) {
                    for (let k of nocheckbox) {
                        lista.push([cadeira[1][k][0], cadeira[1][k][1], cadeira[1][k][2], cadeira[1][k][3], 0])
                    }
                    for (let x of yescheckbox) {
                        lista.push([cadeira[1][x][0], cadeira[1][x][1], cadeira[1][x][2], cadeira[1][x][3], 1])
                    }
                }
            }


        }
        sessionStorage.setItem("eletivas_optativas", JSON.stringify(lista))

    }
    else {
        sessionStorage.setItem("eletivas_optativas", JSON.stringify(eletivas_optativas))

    }

    sessionStorage.setItem("clique", clique)





    let cadeirasSelecionadas = [];
    const checkboxes = document.getElementsByName("eletivas")

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            cadeirasSelecionadas.push(checkboxes[i].value);
        }
    }

    sessionStorage.setItem("eletivas_selecionadas", JSON.stringify(cadeirasSelecionadas))

    const selecionar_todas = document.getElementsByName('todas')
    let checkTodas = []

    for (let i = 0; i < selecionar_todas.length; i++) {
        if (selecionar_todas[i]) {
            if (selecionar_todas[i].checked == true) {
                checkTodas.push(selecionar_todas[i].value)
            }
        }


    }
    sessionStorage.setItem("check_eletivas", JSON.stringify(checkTodas))
    sessionStorage.setItem("horas_eletivas", horas_eletivas)




}

function atualizarCheckboxes() {
    const checkboxes = document.getElementsByName("eletivas");


    let cadeirasSelecionadas = JSON.parse(sessionStorage.getItem("eletivas_selecionadas"))

    if (cadeirasSelecionadas) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = cadeirasSelecionadas.includes(checkboxes[i].value)
        }
    }


    if (eletivas_optativas) {
        for (let e in eletivas_optativas) {

            if (eletivas_optativas[e][4] == 1) {
                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].value == eletivas_optativas[e][0]) {
                        checkboxes[i].checked = true
                    }
                }
            }
            else {
                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].value == eletivas_optativas[e][0]) {
                        checkboxes[i].checked = false

                    }
                }
            }
        }
    }

    const selecionar_todas = document.getElementsByName('todas')
    let checkTodas = JSON.parse(sessionStorage.getItem("check_eletivas"))
    if (checkTodas) {
        for (let i = 0; i < selecionar_todas.length; i++) {
            selecionar_todas[i].checked = checkTodas.includes(selecionar_todas[i].value)
        }
    }

    const forms = document.getElementsByClassName("cadeiras-semestre")

    for (let f = 0; f < forms.length; f++) {
        const checkboxes = forms[f].querySelectorAll('input[name="eletivas"]')
        let x = 0
        for (let k = 0; k < checkboxes.length; k++) {
            if (checkboxes[k].checked) {
                x++
            }
        }

        console.log(x)
        console.log(checkboxes.length)
        if (x >= checkboxes.length) {
            selecionar_todas[f].checked = true
        }
        else {
            selecionar_todas[f].checked = false
        }

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


function simulador() {
    console.log("Seleção de Eletivas")
    temaTurno()
    mudarTurno()
    eletivas()
    atualizarCheckboxes()

}

simulador()