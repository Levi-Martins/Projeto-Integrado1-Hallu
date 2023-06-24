
// sessionStorage.setItem("horas",horas)
sessionStorage.setItem("simuladorIniciado", true)
let horas_obrigatorias = parseInt(sessionStorage.getItem("horas_obrigatorias"))

function obrigatorias() {
    let cadeira = JSON.parse(localStorage.getItem("obrigatorias"))
    const semestres = document.getElementsByClassName("cadeiras-semestre")
    let horas_cadeira

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

            const checkboxes = semestres[i].querySelectorAll('input[name="obrigatorias"]')

            for (let j = 0; j < checkboxes.length; j++) {
                horas_cadeira = parseInt(cadeira[i][j][1])

                if (selecionar_todas.checked == true) {
                    if (checkboxes[j].checked == false) {
                        checkboxes[j].checked = selecionar_todas.checked
                        horas_obrigatorias += horas_cadeira
                        console.log(checkboxes[j])
                        console.log(`Somando horas: ${horas_obrigatorias}`)
                    }
                }
                else {
                    if (checkboxes[j].checked == true) {
                        checkboxes[j].checked = selecionar_todas.checked
                        horas_obrigatorias -= horas_cadeira
                        console.log(`Diminuindo horas: ${horas_obrigatorias}`)

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
            input.setAttribute("name", "obrigatorias")
            input.setAttribute("value", cadeira[i][j][0])
            label.appendChild(input)
            label.append(cadeira[i][j][0])
            label.append(botaoInfo)
            botaoInfo.addEventListener("click", (e) => {
                e.preventDefault()
                const popup = document.getElementById("popup-wrappep")
                popup.style.display = "flex"
                const nome_cadeira = document.getElementById("nome_cadeira")
                nome_cadeira.append(cadeira[i][j][0])
              




                const pre_requisito = document.getElementById("pre-requisito")
                pre_requisito.innerHTML =`<b>Pré-requesito: </b>${cadeira[i][j][3]}`
                const qtd_horas = document.getElementById("qtd_horas")
                qtd_horas.innerHTML =`<b>Quantidade de horas: </b> ${cadeira[i][j][1]}`
                const objetivo = document.getElementById("objetivo")
                objetivo.innerHTML=`<b>Objetivo: </b>${cadeira[i][j][2]}`
                const btn_close_popup = document.getElementById("btn_close_popup")

                btn_close_popup.addEventListener("click", () => {

                    popup.style.display = "none"
                    nome_cadeira.innerHTML = ""
                    qtd_horas.innerHTML = ""
                    pre_requisito.innerHTML = ""
                    objetivo.innerHTML = ""
                })

            })
            semestres[i].appendChild(label)
            horas_cadeira = parseInt(cadeira[i][j][1])


            if (cadeira[i][j][0] == "-") {
                semestres[i].innerText = "Não existem cadeiras obrigatórias para esse semestre"
            }

            input.addEventListener("click", (function (hora_cad) {
                return () => {

                    if (input.checked == true) {
                        horas_obrigatorias += parseInt(hora_cad)

                    }
                    else {
                        horas_obrigatorias -= parseInt(hora_cad)


                    }
                    if (horas_obrigatorias <= 0) horas_obrigatorias = 0


                    if (selecionar_todas.checked == true) {
                        selecionar_todas.checked = false
                    }

                    const semestre_input = semestres[i].querySelectorAll("input[name='obrigatorias']")
                    let len = 0;
                    let ele = 0;
                    semestre_input.forEach(element => {
                        ele++
                        if (element.checked == true) {
                            len++
                        }

                    })
                    // console.log(len)
                    // console.log(ele)
                    if (len == ele) {
                        selecionar_todas.checked = true
                    }

                    console.log(`Horas da cadeira: ${horas_obrigatorias}`)


                }

            })(horas_cadeira))
            const redefinir = document.getElementById("limpar")
            redefinir.addEventListener("click", () => {
                input.checked = false
                selecionar_todas.checked = false
                horas_obrigatorias = 0
                console.log(`horas obrigatorias: ${horas_obrigatorias}`)
                console.log(horas_obrigatorias)

            })

        }


    }
}

function armazenarCadeiras() {
    const checkboxes = document.getElementsByName("obrigatorias")
    let cadeirasSelecionadas = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            cadeirasSelecionadas.push(checkboxes[i].value)
        }
    }

    sessionStorage.setItem("obrigatorias_selecionadas", JSON.stringify(cadeirasSelecionadas))


    const selecionar_todas = document.getElementsByName('todas')
    let checkTodas = []

    for (let i = 0; i < selecionar_todas.length; i++) {
        if (selecionar_todas[i]) {
            if (selecionar_todas[i].checked == true) {
                checkTodas.push(selecionar_todas[i].value)
            }
        }
    }
    sessionStorage.setItem("check_obrigatorias", JSON.stringify(checkTodas))
    sessionStorage.setItem("horas_obrigatorias", horas_obrigatorias)


}

function atualizarCheckboxes() {
    const checkboxes = document.getElementsByName("obrigatorias")
    let cadeirasSelecionadas = JSON.parse(sessionStorage.getItem("obrigatorias_selecionadas"))
    if (cadeirasSelecionadas) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = cadeirasSelecionadas.includes(checkboxes[i].value)
        }
    }

    const selecionar_todas = document.getElementsByName('todas')
    let checkTodas = JSON.parse(sessionStorage.getItem("check_obrigatorias"))
    if (checkTodas) {
        for (let i = 0; i < selecionar_todas.length; i++) {
            selecionar_todas[i].checked = checkTodas.includes(selecionar_todas[i].value)
        }
    }
}


function simulador() {
    console.log("Seleção de obrigatórias")
    obrigatorias()
    atualizarCheckboxes()
}

simulador()