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

function credito(horas) {
    return horas / 16
}

function optativas() {
    let cadeira = JSON.parse(localStorage.getItem("optativas"))
    let horas_cadeira

    const form = document.getElementById("form-cadeiras")
    const optativas_escolhidas = document.getElementById("form-optativas-escolhidas")

    for (i in cadeira) {

        const input = document.createElement("input")
        const label = document.createElement("label")
        const botaoInfo = document.createElement("button")
        botaoInfo.classList.add("botaoInfo")
        botaoInfo.innerText = "i"
        input.setAttribute("type", "checkbox")
        input.setAttribute("name", "optativas")
        input.setAttribute("value", cadeira[i][0])
        label.classList.add('c')
        label.appendChild(input)
        label.append(cadeira[i][0])
        label.append(botaoInfo)

        botaoInfo.addEventListener("click", function (cad) {
            return (e) => {
                e.preventDefault()
                const popup = document.getElementById("popup-wrappep")
                popup.style.display = "flex"
                const nome_cadeira = document.getElementById("nome_cadeira")
                nome_cadeira.append(cad[0])

                const pre_requisito = document.getElementById("pre-requisito")
                pre_requisito.innerHTML = `<b>Pré-requisito: </b>${cad[3]}`
                const qtd_horas = document.getElementById("qtd_horas")
                qtd_horas.innerHTML = `<b>Horas e Créditos: </b> ${cad[i]}h / ${credito(cad[i])} créditos`

                const objetivo = document.getElementById("objetivo")
                objetivo.innerHTML = `<b>Objetivo: </b>${cad[2]}`
                const btn_close_popup = document.getElementById("btn_close_popup")


                btn_close_popup.addEventListener("click", () => {

                    popup.style.display = "none"
                    nome_cadeira.innerHTML = ""
                    qtd_horas.innerHTML = ""
                    pre_requisito.innerHTML = ""
                    objetivo.innerHTML = ""
                })
            }
        }(cadeira[i]))


        form.appendChild(label)
        horas_cadeira = parseInt(cadeira[i][1])

        if (label.clientHeight > 35) {
            botaoInfo.style.marginRight = '30px'
        }

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
            c[i].style.display = "flex";
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
    sessionStorage.setItem("eletivas_optativas", JSON.stringify(eletivas_optativas))

    const horas_livres = (document.getElementById("horas_livres")).value
    sessionStorage.setItem("horas_livres", horas_livres)

}

function atualizarCheckboxes() {
    const checkboxes = document.getElementsByName("optativas")
    const form = document.getElementById("form-cadeiras")
    const optativas_escolhidas = document.getElementById("form-optativas-escolhidas")



    for (let e in eletivas_optativas) {


        const input = document.createElement("input")
        const label = document.createElement("label")
        const botaoInfo = document.createElement("button")
        botaoInfo.classList.add("botaoInfo")
        botaoInfo.innerText = "i"

        input.setAttribute("type", "checkbox")
        input.setAttribute("name", "eletivas_optativas")
        input.setAttribute("value", eletivas_optativas[e][0])
        label.classList.add('c')
        label.appendChild(input)
        label.append(`${eletivas_optativas[e][0]}*`)
        label.append(botaoInfo)
        botaoInfo.addEventListener("click", function (cad) {
            return (e) => {
                e.preventDefault()
                const popup = document.getElementById("popup-wrappep")
                popup.style.display = "flex"
                const nome_cadeira = document.getElementById("nome_cadeira")
                nome_cadeira.append(cad[0])

                const pre_requisito = document.getElementById("pre-requisito")
                pre_requisito.innerHTML = `<b>Pré-requesito: </b>${cad[3]}`
                const qtd_horas = document.getElementById("qtd_horas")
                qtd_horas.innerHTML = `<b>Horas e Créditos: </b> ${cad[1]}h / ${credito(cad[1])} créditos`

                const objetivo = document.getElementById("objetivo")
                objetivo.innerHTML = `<b>Objetivo: </b>${cad[2]}`
                const btn_close_popup = document.getElementById("btn_close_popup")


                btn_close_popup.addEventListener("click", () => {

                    popup.style.display = "none"
                    nome_cadeira.innerHTML = ""
                    qtd_horas.innerHTML = ""
                    pre_requisito.innerHTML = ""
                    objetivo.innerHTML = ""
                })
            }
        }(eletivas_optativas[e]))


        form.prepend(label)

        horas_cadeira = parseInt(eletivas_optativas[e][1])

        let divCriada

        if (eletivas_optativas[e][4] == 1) {
            input.checked = true
        }
        else {
            input.checked = false
        }
        console.log(input.checked)


        input.addEventListener("click", (function (hora_cad) {
            return () => {

                if (input.checked == true) {
                    eletivas_optativas[e][4] = 1

                    const div = document.createElement("div")
                    div.classList.add("eletiva_optativaEscolhida")
                    const botao = document.createElement("button")
                    botao.innerText = "x"
                    const label_escolhidas = document.createElement("label")
                    label_escolhidas.innerText = `${input.value}*`
                    div.appendChild(botao)
                    div.appendChild(label_escolhidas)
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
                    const div = Array.from(document.getElementsByClassName("eletiva_optativaEscolhida"))
                    for (let d in div) {
                        if (div[d].innerHTML.includes(input.value)) {
                            div[d].parentNode.removeChild(div[d])
                            console.log(eletivas_optativas[e][4])
                            eletivas_optativas[e][4] = 0
                        }

                    }


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





        if (eletivas_optativas[e][4] == 1) {


            const div = document.createElement("div")
            div.classList.add("eletiva_optativaEscolhida")
            const botao = document.createElement("button")
            botao.innerText = "x"
            const label_escolhidas = document.createElement("label")
            label_escolhidas.innerText = `${eletivas_optativas[e][0]}*`
            div.appendChild(botao)
            div.appendChild(label_escolhidas)
            optativas_escolhidas.appendChild(div)


            botao.addEventListener("click", (event) => {
                event.preventDefault()
                input.checked = false
                eletivas_optativas[e][4] = 0
                div.parentNode.removeChild(div)
                horas_optativas -= 64
                if (horas_optativas <= 0) horas_optativas = 0
            })

        }


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

    const horas_livres = document.getElementById("horas_livres")
    const horaslivres = parseInt(sessionStorage.getItem("horas_livres"))
    horas_livres.value = horaslivres

    if ((horas_livres.value).length > 0) {
        horas_livres.style.backgroundColor = "#baf5ab"
        const botao_apagar = document.createElement("button")
        const div_horas = document.getElementById("div_horas")
        botao_apagar.classList.add("botao_apagar")
        botao_apagar.innerText = 'x'
        botao_apagar.addEventListener("click", () => {
            horas_livres.value = ""
            horas_livres.style.backgroundColor = "#ECECEC"
            botao_apagar.remove()

        })
        div_horas.appendChild(botao_apagar)
    }
    else {
        horas_livres.style.backgroundColor = "#ECECEC"

    }

}

function onInput() {
    const horas_livres = document.getElementById("horas_livres")
    const botao_apagar = document.createElement("button")
    const div_horas = document.getElementById("div_horas")
    botao_apagar.classList.add("botao_apagar")
    botao_apagar.innerText = 'x'
    botao_apagar.addEventListener("click", () => {
        horas_livres.value = ""
        horas_livres.style.backgroundColor = "#ECECEC"
        botao_apagar.remove()

    })


    horas_livres.addEventListener("keyup", () => {

        if ((horas_livres.value).length > 3) {
            let nova = (horas_livres.value).split("")
            console.log(nova)
            nova.pop()
            horas_livres.value = nova.join('')
        }

        setInterval(() => {
            if ((horas_livres.value).length <= 0 || horas_livres.value == '') {
                horas_livres.style.backgroundColor = "#ECECEC"
                horas_livres.style.backgroundColor = "#ECECEC"
                botao_apagar.remove()

            }
            else {
                horas_livres.style.backgroundColor = "#baf5ab"
                div_horas.appendChild(botao_apagar)

            }

        }, 1000);



    })


    horas_livres.addEventListener("keydown", () => {
        horas_livres.style.backgroundColor = "#bac2b8"

    })



}

function limpar() {

    const redefinir = document.getElementById("limpar")
    redefinir.addEventListener("click", () => {

        const aparecerPopupLimpar = document.querySelector(".popup-wrappep-limpar")
        aparecerPopupLimpar.style.display = "flex"
        const limparCadeiras = document.querySelector("#btn-limpar")
        const fecharPopupLimpar = document.querySelector("#btn-nao-limpar")
        limparCadeiras.addEventListener('click', () => {
            const checkboxes = document.getElementsByName("optativas")
            for (let c in checkboxes) {
                checkboxes[c].checked = false
            }
            const checkeletivas = document.getElementsByName("eletivas_optativas")
            for (let c in checkeletivas) {
                checkeletivas[c].checked = false
            }
            const form = document.getElementById("form-optativas-escolhidas")
            const div = document.getElementsByClassName("eletiva_optativaEscolhida")
            for (let d in div) {
                form.remove(div[d])
            }
            for (let e in eletivas_optativas) {
                eletivas_optativas[e][4] = 0
            }
            const input_horas = document.getElementById("horas_livres")
            input_horas.value = ""
            horas_livres.style.backgroundColor = "#ECECEC"

            horas_optativas = 0
            aparecerPopupLimpar.style.display = "none"
        })
        fecharPopupLimpar.addEventListener("click", () => {
            aparecerPopupLimpar.style.display = "none"
        })


    })

}

function optativasLivres() {
    const question = document.querySelector('#question')
    const saibaMais = document.querySelector('#saiba-mais')
    const closePopup = document.querySelector("#btn_close_popup-horas")
    const popup = document.querySelector('.popup-wrappep-horas')
    const infoOptativas = document.querySelector('#info-optativas')

    question.addEventListener('click', () => {
        popup.style.display = "flex"
        console.log('clicou')
        if (turno_escolhido == 'Diurno') {
            infoOptativas.innerText = 'Optativas livres são quaisquer cadeiras que você faz dentro da UFC e não fazem parte da oferta padrão do curso. Você pode cursar no máximo 128 horas de optativas livres, que são integralizadas a sua carga horária total de optativas!'
        } else {
            infoOptativas.innerText = 'Optativas livres são quaisquer cadeiras que você faz dentro da UFC e não fazem parte da oferta padrão do curso. Você pode cursar no máximo 256 horas de optativas livres, que são integralizadas a sua carga horária total de optativas!'
        }
    })

    saibaMais.addEventListener('click', () => {
        popup.style.display = "flex"
        console.log('clicou')
    })

    closePopup.addEventListener('click', () => {
        popup.style.display = "none"

    })
}

function app() {
    console.log("Seleção de Eletivas")
    temaTurno()
    mudarTurno()
    optativas()
    optativasLivres()
    atualizarCheckboxes()
    onInput()

}
app()