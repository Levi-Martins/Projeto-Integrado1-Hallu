let horas = parseInt(sessionStorage.getItem("horas"))

function optativas() {
    let cadeira = JSON.parse(localStorage.getItem("optativas"))
    let horas_cadeira
    console.log(horas)

    const form = document.getElementById("form-cadeiras")
    const selecionar_todas = document.createElement("input")
    const label_todas = document.createElement("label")
    selecionar_todas.setAttribute("type", "checkbox")
    selecionar_todas.setAttribute("name", "todas")
    selecionar_todas.setAttribute("value", `semestreOptativa`)
    label_todas.appendChild(selecionar_todas)
    label_todas.append("Adicionar Todas")
    form.appendChild(label_todas)

    for (i in cadeira) {

        selecionar_todas.addEventListener("click", () => {

            const checkboxes = form.querySelectorAll('input[name="optativas"]')

            for (let j = 0; j < checkboxes.length; j++) {
                horas_cadeira = parseInt(cadeira[i][1])

                if (selecionar_todas.checked == true) {
                    if (checkboxes[j].checked == false) {
                        checkboxes[j].checked = selecionar_todas.checked
                        horas += horas_cadeira
                        console.log(checkboxes[j])
                    }
                }
                else {
                    if (checkboxes[j].checked == true) {
                        checkboxes[j].checked = selecionar_todas.checked
                        horas -= horas_cadeira

                    }
                }

            }
            console.log(horas)
        })


        const input = document.createElement("input")
        const label = document.createElement("label")
        input.setAttribute("type", "checkbox")
        input.setAttribute("name", "optativas")
        input.setAttribute("value", cadeira[i][0])
        label.appendChild(input)
        label.append(cadeira[i][0])
        form.appendChild(label)
        horas_cadeira = parseInt(cadeira[i][1])

        input.addEventListener("click", (function (hora_cad) {
            return () => {

                if (input.checked == true) {
                    horas += parseInt(hora_cad)
                    console.log(`Somando horas: ${horas}`)
                }
                else {
                    horas -= parseInt(hora_cad)
                    console.log(`Diminuindo horas: ${horas}`)

                }
                if (horas <= 0) horas = 0


                if (selecionar_todas.checked == true) {
                    selecionar_todas.checked = false
                }

                const semestre_input = form.querySelectorAll("input[name='optativas']")
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
                console.log(`Horas da cadeira: ${hora_cad}`)

                console.log(`Horas: ${horas}`)

            }

        })(horas_cadeira))

    }



}


function app() {
    console.log("Seleção de Eletivas")
    optativas()
}
app()