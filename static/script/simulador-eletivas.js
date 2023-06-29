let horas_eletivas = parseInt(sessionStorage.getItem("horas_eletivas"))

let turno_escolhido = sessionStorage.getItem("turno")
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
    let cadeira = JSON.parse(localStorage.getItem("eletivas"))
    let horas_cadeira

    const semestres = document.getElementsByClassName("cadeiras-semestre")
    let eletivasOptativas = []


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


                    if (input.checked == true) {
                        horas_eletivas += parseInt(hora_cad)

                        if (i == 0) {

                        }
                        if (i == 1) {

                        }
                    }
                    else {
                        horas_eletivas -= parseInt(hora_cad)

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
                    // console.log(horas_eletivas)
                    console.log(eletivasOptativas)
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
}

function armazenarCadeiras() {
    const forms = document.getElementsByClassName("cadeiras-semestre")

    // sessionStorage.clear()
    for (let f = 0; f < forms.length; f++) {

        const checkboxes = forms[f].querySelectorAll('input[name="eletivas"]')

        let x = 0
        for (let c = 0; c < checkboxes.length; c++) {
            if (checkboxes[c].checked == true) {
                x++
            }
        }

        if (f == 0) {
            if (x > 4) {
                let eletivas = []
                for (let k = 4; k < checkboxes.length; k++) {
                    if (checkboxes[k].checked) {
                        if (x < 6 && (checkboxes[0].checked == false || checkboxes[1].checked == false || checkboxes[2].checked == false || checkboxes[3].checked == false)) {
                            eletivas_optativas.push(checkboxes[k + 1].value)

                            break
                        }
                        else {
                            eletivas_optativas.push(checkboxes[k].value)
                        }
                    }
                }

                sessionStorage.setItem("eletivas_optativas4", JSON.stringify(eletivas))

            }
        }

        if (f == 1) {
            if (x > 3) {
                for (let k = 3; k < checkboxes.length; k++) {
                    if (checkboxes[k].checked) {
                        sessionStorage.setItem("eletivas_optativas5", JSON.stringify(checkboxes[k].value))
                    }
                }
            }
        }
    }


    let cadeirasSelecionadas = [];
    const checkboxes = document.getElementsByName("eletivas")

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            console.log(checkboxes[i].checked)
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