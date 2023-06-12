
// sessionStorage.setItem("horas",horas)

let horas = 0
let horas_cadeira;

function obrigatorias() {
    let cadeira = JSON.parse(localStorage.getItem("obrigatorias"))
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

            const checkboxes = semestres[i].querySelectorAll('input[name="obrigatorias"]')
            // console.log(checkboxes)

            for (let j = 0; j < checkboxes.length; j++) {
                checkboxes[j].checked = selecionar_todas.checked

            }
        })

        for (let j in cadeira[i]) {
            const input = document.createElement("input")
            const label = document.createElement("label")
            input.setAttribute("type", "checkbox")
            input.setAttribute("name", "obrigatorias")
            input.setAttribute("value", cadeira[i][j][0])
            label.appendChild(input)
            label.append(cadeira[i][j][0])
            semestres[i].appendChild(label)
            horas_cadeira = parseInt(cadeira[i][j][1])


            if (cadeira[i][j][0] == "-") {
                semestres[i].innerText = "Não existem cadeiras obrigatórias para esse semestre"
            }

            input.addEventListener("click", (function (hora_cad) {
                return () => {

                    if (input.checked == true) {
                        horas += parseInt(hora_cad)
                    }
                    else {
                        horas -= parseInt(hora_cad)
                    }
                    if (horas <= 0) horas = 0


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
                    console.log(horas)

                }

            })(horas_cadeira))

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