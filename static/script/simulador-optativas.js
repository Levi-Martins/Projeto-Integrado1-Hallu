let horas = parseInt(sessionStorage.getItem("horas"))
let turno_escolhido = sessionStorage.getItem("turno")
let horas_optativas = parseInt(sessionStorage.getItem("horas_optativas"))
let eletivas_optativas = JSON.parse(sessionStorage.getItem("eletivas_optativas"))

function temaTurno() {
    if (turno_escolhido == "Noturno") {
        document.body.classList.add("dark")
    } else {
        document.body.classList.remove("dark")
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


function optativas() {
    let cadeira = JSON.parse(localStorage.getItem("optativas"))
    let horas_cadeira

    const form = document.getElementById("form-cadeiras")
    const optativas_escolhidas = document.getElementById("form-optativas-escolhidas")

    for (i in cadeira) {

        const input = document.createElement("input")
        const label = document.createElement("label")
        input.setAttribute("type", "checkbox")
        input.setAttribute("name", "optativas")
        input.setAttribute("value", cadeira[i][0])
        label.classList.add('c')
        label.appendChild(input)
        label.append(cadeira[i][0])
        form.appendChild(label)
        horas_cadeira = parseInt(cadeira[i][1])
        let divCriada

        input.addEventListener("click", (function (hora_cad) {
            return () => {

                const div = document.createElement("div")
                div.classList.add("optativaEscolhida")
                const botao = document.createElement("button")
                botao.innerText = "x"
                const label_escolhidas = document.createElement("label")
                label_escolhidas.innerText = input.value
                div.appendChild(botao)
                div.appendChild(label_escolhidas)

                if (input.checked == true) {
                    horas_optativas += parseInt(hora_cad)
                    divCriada = div

                    console.log(`Somando horas: ${horas_optativas}`)
                    optativas_escolhidas.appendChild(div)
                    botao.addEventListener("click", (e) => {
                        e.preventDefault()
                        input.checked = false
                        div.parentNode.removeChild(div)
                        horas_optativas -= parseInt(hora_cad)
                        console.log(`Horas: ${horas_optativas}`)
                        if (horas_optativas <= 0) horas_optativas = 0

                    })
                }
                else {
                    horas_optativas -= parseInt(hora_cad)
                    console.log(`Diminuindo horas: ${horas_optativas}`)
                    if (divCriada && divCriada.parentNode) {
                        console.log(divCriada)
                        divCriada.parentNode.removeChild(divCriada)
                        divCriada = null

                    }

                }
                if (horas_optativas <= 0) horas_optativas = 0



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

                console.log(`Horas: ${horas_optativas}`)

            }

        })(horas_cadeira))



    }



}

function pesquisar() {
    let input = document.getElementById('busca').value
    input = input.toLowerCase();
    let c = document.getElementsByClassName('c');

    for (i = 0; i < c.length; i++) {
        if (c[i].innerHTML.toLowerCase().includes(input)) {
            c[i].style.display = "list-item";
        }
        else {
            c[i].style.display = "none";
        }

    }
}

function armazenarCadeiras() {
    const checkboxes = document.getElementsByName("optativas")
    let cadeirasSelecionadas = [];

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            cadeirasSelecionadas.push(checkboxes[i].value)
        }
    }

    sessionStorage.setItem("optativas_selecionadas", JSON.stringify(cadeirasSelecionadas))


    const selecionar_todas = document.getElementsByName('todas')
    let checkTodas = []

    for (let i = 0; i < selecionar_todas.length; i++) {
        if (selecionar_todas[i]) {
            if (selecionar_todas[i].checked == true) {
                checkTodas.push(selecionar_todas[i].value)
            }
        }
    }

    sessionStorage.setItem("horas_optativas", horas_optativas)


}

function atualizarCheckboxes() {
    const checkboxes = document.getElementsByName("optativas")
    const form = document.getElementById("form-cadeiras")
    const optativas_escolhidas = document.getElementById("form-optativas-escolhidas")
    


    for (let e in eletivas_optativas) {


        const input = document.createElement("input")
        const label = document.createElement("label")
        input.setAttribute("type", "checkbox")
        input.setAttribute("name", "eletiva_optativas")
        input.setAttribute("value", eletivas_optativas[e][0])
        label.classList.add('c')
        label.appendChild(input)
        label.append(eletivas_optativas[e][0])
        form.prepend(label)

        horas_cadeira = parseInt(eletivas_optativas[e][1])

        let divCriada

        

        input.addEventListener("click", (function (hora_cad) {
            return () => {

                const div = document.createElement("div")
                div.classList.add("eletiva_optativaEscolhida")
                const botao = document.createElement("button")
                botao.innerText = "x"
                const label_escolhidas = document.createElement("label")
                label_escolhidas.innerText = input.value
                div.appendChild(botao)
                div.appendChild(label_escolhidas)

                if (input.checked == true) {
                    horas_optativas += parseInt(hora_cad)
                    divCriada = div

                    optativas_escolhidas.appendChild(div)
                    botao.addEventListener("click", (e) => {
                        e.preventDefault()
                        input.checked = false
                        div.parentNode.removeChild(div)
                        horas_optativas -= parseInt(hora_cad)
                        console.log(`Horas: ${horas_optativas}`)
                        if (horas_optativas <= 0) horas_optativas = 0

                    })
                }
                else {
                    horas_optativas -= parseInt(hora_cad)
                    console.log(`Diminuindo horas: ${horas_optativas}`)
                    if (divCriada && divCriada.parentNode) {
                        console.log(divCriada)
                        divCriada.parentNode.removeChild(divCriada)
                        divCriada = null

                    }

                }
                if (horas_optativas <= 0) horas_optativas = 0


            }

        })(horas_cadeira))
















        const div = document.createElement("div")
        div.classList.add("eletiva_optativaEscolhida")
        const botao = document.createElement("button")
        botao.innerText = "x"
        const label_escolhidas = document.createElement("label")
        label_escolhidas.innerText = eletivas_optativas[e][0]
        div.appendChild(botao)
        div.appendChild(label_escolhidas)
        optativas_escolhidas.appendChild(div)





        botao.addEventListener("click", (e) => {
            e.preventDefault()
            checkboxes[i].checked = false
            div.parentNode.removeChild(div)
            horas_optativas -= 64
            if (horas_optativas <= 0) horas_optativas = 0
        })

    }




    let cadeirasSelecionadas = JSON.parse(sessionStorage.getItem("optativas_selecionadas"))
    if (cadeirasSelecionadas) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = cadeirasSelecionadas.includes(checkboxes[i].value)


            if (checkboxes[i].checked) {

                const div = document.createElement("div")
                div.classList.add("optativaEscolhida")
                const botao = document.createElement("button")
                botao.innerText = "x"
                const label_escolhidas = document.createElement("label")
                label_escolhidas.innerText = checkboxes[i].value
                div.appendChild(botao)
                div.appendChild(label_escolhidas)
                optativas_escolhidas.appendChild(div)

                checkboxes[i].addEventListener("click", () => {
                    div.parentNode.removeChild(div)
                })
                botao.addEventListener("click", (e) => {
                    e.preventDefault()
                    checkboxes[i].checked = false
                    div.parentNode.removeChild(div)
                    horas_optativas -= 64
                    if (horas_optativas <= 0) horas_optativas = 0
                })
            }
        }
    }

}

function app() {
    console.log("Seleção de Eletivas")
    temaTurno()
    mudarTurno()
    optativas()
    atualizarCheckboxes()
    
}
app()