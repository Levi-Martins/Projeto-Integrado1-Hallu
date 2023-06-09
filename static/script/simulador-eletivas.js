
function eletivas() {
    let cadeira = JSON.parse(localStorage.getItem("eletivas"))
    // console.log(cadeira)
    const semestres = document.getElementsByClassName("cadeiras-semestre")
    for (let i in cadeira) {
        console.log(`Semestre ${parseInt(i) + 1}`)
        for (let j in cadeira[i]) {
            console.log(cadeira[i][j][0])
            const input = document.createElement("input")
            const label = document.createElement("label")
            input.setAttribute("type", "checkbox")
            input.setAttribute("name", "eletivas")
            input.setAttribute("value", cadeira[i][j][0])
            label.appendChild(input)

            label.append(cadeira[i][j][0])
            // console.log(input)
            semestres[i].appendChild(label)


        }
        console.log(" ")
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

    sessionStorage.setItem("eletivas_selecionadas", JSON.stringify(cadeirasSelecionadas));
}

function atualizarCheckboxes() {
    const checkboxes = document.getElementsByName("eletivas");
    let cadeirasSelecionadas = JSON.parse(sessionStorage.getItem("eletivas_selecionadas"));

    if (cadeirasSelecionadas) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = cadeirasSelecionadas.includes(checkboxes[i].value);
        }
    }
}



function simulador() {
    console.log("Seleção de obrigatórias")
    eletivas()
    atualizarCheckboxes()
}

simulador()