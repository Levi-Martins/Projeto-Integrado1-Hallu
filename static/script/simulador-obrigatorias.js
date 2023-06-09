
function obrigatorias() {
    let cadeira = JSON.parse(localStorage.getItem("obrigatorias"))
    // console.log(cadeira)
    const semestres = document.getElementsByClassName("cadeiras-semestre")
    for (let i in cadeira) {

        // console.log(`Semestre ${parseInt(i) + 1}`)

        const selecionar_todas = document.createElement("input")
        const label_todas = document.createElement("label")
        selecionar_todas.setAttribute("type", "checkbox")
        selecionar_todas.setAttribute("name", "todas")
        label_todas.appendChild(selecionar_todas)
        label_todas.append("Adicionar Todas")
        semestres[i].appendChild(label_todas)

        selecionar_todas.addEventListener("click", () => {
            const checkboxes = semestres[i].querySelectorAll('input[name="obrigatorias"]');
            for (let j = 0; j < checkboxes.length; j++) {
                checkboxes[j].checked = selecionar_todas.checked;
            }
        });

        for (let j in cadeira[i]) {
            // console.log(cadeira[i][j][0])



            const input = document.createElement("input")
            const label = document.createElement("label")

            input.setAttribute("type", "checkbox")
            input.setAttribute("name", "obrigatorias")
            input.setAttribute("value", cadeira[i][j][0])
            label.appendChild(input)

            label.append(cadeira[i][j][0])
            // console.log(input)
            semestres[i].appendChild(label)
            if (cadeira[i][j][0] == "-") {
                // console.log(semestres[i])
                semestres[i].innerText = "Não existem cadeiras obrigatórias para esse semestre"
            }




        }
        // console.log(" ")
    }

}

function armazenarCadeiras() {
    const checkboxes = document.getElementsByName("obrigatorias");
    let cadeirasSelecionadas = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            cadeirasSelecionadas.push(checkboxes[i].value);
        }
    }

    sessionStorage.setItem("obrigatorias_selecionadas", JSON.stringify(cadeirasSelecionadas));
}

function atualizarCheckboxes() {
    const checkboxes = document.getElementsByName("obrigatorias");
    let cadeirasSelecionadas = JSON.parse(sessionStorage.getItem("obrigatorias_selecionadas"));

    if (cadeirasSelecionadas) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = cadeirasSelecionadas.includes(checkboxes[i].value);
        }
    }
}



function simulador() {
    console.log("Seleção de obrigatórias")
    obrigatorias()
    atualizarCheckboxes()
}

simulador()