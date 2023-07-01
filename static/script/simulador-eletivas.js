let horas_eletivas = parseInt(sessionStorage.getItem("horas_eletivas"))
let turno_escolhido = sessionStorage.getItem("turno")
let cadeira = JSON.parse(localStorage.getItem("eletivas"))

function temaTurno() {
    if (turno_escolhido == "Noturno") {
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
    }
}


function temaTurno() {
    if (turno_escolhido == "Noturno") {
        document.body.classList.add("dark")

    }
    else {
        document.body.classList.remove("dark")

    }
}

function eletivas() {
    let horas_cadeira

    const semestres = document.getElementsByClassName("cadeiras-semestre")
    let eletivasOptativas = []
    let quinto = 0
    let quarto = 0
    let cadeiras4 = []
    let cadeiras5 = []
    let go_opt = false

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
                pre_requisito.innerHTML = `<b>Pré-requesito: </b>${cadeira[i][j][3]}`
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
                    let semestrex = 4
                    if (i == 1) {
                        semestrex = 5
                    }
                    if (input.checked == true) {
                        horas_eletivas += parseInt(hora_cad)
                        if (semestrex == 4) {
                            quarto++

                            if (quarto == 4) {
                                cadeiras4.push([cadeira[i][j][0], cadeira[i][j][1], cadeira[i][j][2], cadeira[i][j][3]])
                                go_opt = true
                                const forms = document.getElementsByClassName("cadeiras-semestre")
                                for (let f = 0; f < forms.length; f++) {
                                    const checkboxes = forms[f].querySelectorAll('input[name="eletivas"]')
                                    if (f == 0) {
                                        for (let k = 0; k < checkboxes.length; k++) {
                                            if (go_opt && !checkboxes[k].checked) {
                                                console.log(checkboxes[k])
                                            }
                                        }
                                    }
                                }
                                console.log(go_opt)
                            }
                        }
                        else {
                            if (quinto > 3) {
                                console.log(input.value)
                                quinto++
                            } else {
                                quinto++

                            }
                        }

                    }
                    else {
                        horas_eletivas -= parseInt(hora_cad)
                        if (semestrex = 4) {

                            quarto--
                            if (quarto < 4) {
                                go_opt = false
                            }
                        }
                        else {
                            quinto--
                        }
                        // let indice = eletivasOptativas.indexOf(input.value)
                        // if (indice !== -1) {
                        //     eletivasOptativas.splice(indice, 1);
                        // }

                    }
                    if (horas_eletivas <= 0) horas_eletivas = 0

                    // console.log(selecionar_todas)
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
                    if (quarto <= 0) quarto = 0
                    if (quinto <= 0) quinto = 0


                    console.log(`Quarto semestre: ${quarto}`)
                    console.log(`Quinto semestre: ${quinto}`)

                }

            }(horas_cadeira))

            const redefinir = document.getElementById("limpar")
            redefinir.addEventListener("click", () => {
                input.checked = false
                selecionar_todas.checked = false
                horas_eletivas = 0
                console.log(`horas obrigatorias: ${horas_eletivas}`)
                console.log(horas_eletivas)

            })
        }

    }
    console.log("Fim ")

}



function armazenarCadeiras() {
    const forms = document.getElementsByClassName("cadeiras-semestre")

    // sessionStorage.clear()
    for (let f = 0; f < forms.length; f++) {
        const checkboxes = forms[f].querySelectorAll('input[name="eletivas"]')
        let x = 0

        if (f == 0) {
            for (let k = 0; k < checkboxes.length; k++) {

                // let lista = [checkboxes[k].value, cadeira[0][k][1], cadeira[0][k][2], cadeira[0][k][3]]

            }


        }


        if (f == 1) {

            for (let k = 3; k < checkboxes.length; k++) {
                let lista = [checkboxes[k].value, cadeira[0][k][1], cadeira[0][k][2], cadeira[0][k][3]]

            }
        }
        console.log(x)
    }


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
    const selecionar_todas = document.getElementsByName('todas')
    let checkTodas = JSON.parse(sessionStorage.getItem("check_eletivas"))
    if (checkTodas) {
        for (let i = 0; i < selecionar_todas.length; i++) {
            selecionar_todas[i].checked = checkTodas.includes(selecionar_todas[i].value)
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