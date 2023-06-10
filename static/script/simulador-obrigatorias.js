
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
            if (cadeira[i][j][0] == "-") {
                semestres[i].innerText = "Não existem cadeiras obrigatórias para esse semestre"
            }

            input.addEventListener("click",()=>{
                console.log(selecionar_todas)
                //colocar pra quando eu selecionar todas as cadeiras e 
                // desmarcar alguma, desmarcar selecionar todas

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
    sessionStorage.setItem("checkTodas", JSON.stringify(checkTodas))



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
    let checkTodas = JSON.parse(sessionStorage.getItem("checkTodas"))
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