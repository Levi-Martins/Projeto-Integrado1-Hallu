
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
        let qtd = 0
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
            input.setAttribute("type", "checkbox")
            input.setAttribute("name", "eletivas")
            input.setAttribute("value", cadeira[i][j][0])
            label.appendChild(input)
            label.append(cadeira[i][j][0])
            semestres[i].appendChild(label)
            horas_cadeira = parseInt(cadeira[i][j][1])
            // console.log(horas_cadeira)


            // if (cadeira[i][j][0] == "-") {
            //     semestres[i].innerText = "Não existem cadeiras obrigatórias para esse semestre"
            // }

            input.addEventListener("click", function (hora_cad) {
                return () => {


                    if (input.checked == true) {
                        horas_eletivas += parseInt(hora_cad)
                        qtd++
                        if (i == 0) {
                            if (qtd > 4) {
                                eletivasOptativas.push(input.value)


                            }
                        }
                        if (i == 1) {
                            if (qtd > 3) {
                                eletivasOptativas.push(input.value)
                                console.log(input)
                            }
                        }
                    }
                    else {
                        horas_eletivas -= parseInt(hora_cad)
                        qtd--
                        let indice = eletivasOptativas.indexOf(input.value)
                        if (indice !== -1) {
                            eletivasOptativas.splice(indice, 1);
                        }

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
    const checkboxes = document.getElementsByName("eletivas");
    let cadeirasSelecionadas = [];

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



function simulador() {
    console.log("Seleção de Eletivas")
    temaTurno()
    eletivas()
    atualizarCheckboxes()
}

simulador()