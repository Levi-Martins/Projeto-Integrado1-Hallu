let horas = parseInt(sessionStorage.getItem("horas"))

function optativas() {
    let cadeira = JSON.parse(localStorage.getItem("optativas"))
    let horas_cadeira
    console.log(horas)

    const form = document.getElementById("form-cadeiras")
    const optativas_escolhidas = document.getElementById("form-optativas-escolhidas")

    for (i in cadeira) {

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
                    const div = document.createElement("div")
                    div.classList.add("optativaEscolhida")
                    
                    const botao = document.createElement("button")
                    botao.innerText = "x"
                    const label_escolhidas = document.createElement("label")
                    label_escolhidas.innerText = input.value
                    
                    div.appendChild(botao)
                    div.appendChild(label_escolhidas)
                    optativas_escolhidas.appendChild(div)
                }
                else {
                    horas -= parseInt(hora_cad)
                    console.log(`Diminuindo horas: ${horas}`)

                }
                if (horas <= 0) horas = 0



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