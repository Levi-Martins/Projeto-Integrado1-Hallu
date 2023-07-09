
// sessionStorage.setItem("horas",horas)
sessionStorage.setItem("simuladorIniciado", true)
let horas_obrigatorias = parseInt(sessionStorage.getItem("horas_obrigatorias"))
let turno_escolhido = sessionStorage.getItem("turno")
tcc = []

function temaTurno() {
    if (turno_escolhido == "Noturno") {
        document.body.classList.add("dark")

    }
    else {
        document.body.classList.remove("dark")

    }
}

function credito(horas){
    return horas/16
}

function obrigatorias() {
    let cadeira = JSON.parse(localStorage.getItem("obrigatorias"))
    const semestres = document.getElementsByClassName("cadeiras-semestre")
    let horas_cadeira
    let cadeira_turno = [cadeira[6][1][0], cadeira[6][1][1], cadeira[6][1][2], cadeira[6][1][3]]
    console.log(cadeira_turno)
    for (let i in cadeira) {

        const selecionar_todas = document.createElement("input")
        const label_todas = document.createElement("label")
        selecionar_todas.setAttribute("type", "checkbox")
        selecionar_todas.setAttribute("name", "todas")
        selecionar_todas.setAttribute("value", `semestre${i}`)
        label_todas.appendChild(selecionar_todas)
        label_todas.append("Adicionar Todas")
        label_todas.classList.add("label_todas")
        semestres[i].appendChild(label_todas)

        selecionar_todas.addEventListener("click", () => {

            const checkboxes = semestres[i].querySelectorAll('input[name="obrigatorias"]')
            console.log(checkboxes)

            for (let j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].value != cadeira_turno[0]) {
                    horas_cadeira = parseInt(cadeira[i][j][1])
                    console.log(cadeira[i][j][1])
                }
                else {
                    horas_cadeira = parseInt(cadeira_turno[1])
                }


                if (selecionar_todas.checked == true) {
                    if (checkboxes[j].checked == false) {
                        checkboxes[j].checked = selecionar_todas.checked
                        horas_obrigatorias += horas_cadeira

                    }
                }
                else {
                    if (checkboxes[j].checked == true) {
                        checkboxes[j].checked = selecionar_todas.checked
                        horas_obrigatorias -= horas_cadeira


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
            label.classList.add('texto-label')
            label.append(botaoInfo)
            botaoInfo.addEventListener("click", (e) => {
                e.preventDefault()

                const popup = document.getElementById("popup-wrappep")
                popup.style.display = "flex"



                const nome_cadeira = document.getElementById("nome_cadeira")
                nome_cadeira.append(cadeira[i][j][0])



                const pre_requisito = document.getElementById("pre-requisito")
                pre_requisito.innerHTML = `<b>Pré-requisito: </b>${cadeira[i][j][3]}`
                const qtd_horas = document.getElementById("qtd_horas")
                qtd_horas.innerHTML = `<b>Horas e Créditos: </b> ${cadeira[i][j][1]}h / ${credito(cadeira[i][j][1])} créditos`
                const objetivo = document.getElementById("objetivo")
                objetivo.innerHTML = `<b>Objetivo: </b>${cadeira[i][j][2]}`
                const btn_close_popup = document.getElementById("btn_close_popup")


                btn_close_popup.addEventListener("click", () => {

                    popup.style.display = "none"
                    nome_cadeira.innerHTML = ""
                    qtd_horas.innerHTML = ""
                    pre_requisito.innerHTML = ""
                    objetivo.innerHTML = ""
                })

            })

            const input2 = document.createElement("input")
            const label2 = document.createElement("label")
            input2.setAttribute("type", "checkbox")
            input2.setAttribute("name", "obrigatorias")
            input2.setAttribute("value", cadeira_turno[0])
            const botaoInfo2 = document.createElement("button")
            botaoInfo2.innerText = "i"
            botaoInfo2.classList.add("botaoInfo")


            if (i == 7 && turno_escolhido == "Noturno" && j == j.length) {
                input2.setAttribute("value", cadeira_turno[0])
                label2.appendChild(input2)
                label2.append(cadeira_turno[0])
                label2.append(botaoInfo2)
                label2.classList.add('texto-label')

                botaoInfo2.addEventListener("click", (e) => {
                    e.preventDefault()
                    const popup = document.getElementById("popup-wrappep")
                    popup.style.display = "flex"
                    const nome_cadeira = document.getElementById("nome_cadeira")
                    nome_cadeira.append(cadeira_turno[0])

                    const pre_requisito = document.getElementById("pre-requisito")
                    pre_requisito.innerHTML = `<b>Pré-requesito: </b>${cadeira_turno[3]}`
                    const qtd_horas = document.getElementById("qtd_horas")
                    qtd_horas.innerHTML = `<b>Horas e Créditos: </b> ${cadeira_turno[1]}h / ${credito(cadeira_turno[1])} créditos`

                    const objetivo = document.getElementById("objetivo")
                    objetivo.innerHTML = `<b>Objetivo: </b>${cadeira_turno[2]}`
                    const btn_close_popup = document.getElementById("btn_close_popup")

                    btn_close_popup.addEventListener("click", () => {

                        popup.style.display = "none"
                        nome_cadeira.innerHTML = ""
                        qtd_horas.innerHTML = ""
                        pre_requisito.innerHTML = ""
                        objetivo.innerHTML = ""
                    })

                })

                input2.addEventListener("click", () => {
                    if (input2.checked == true) {
                        horas_obrigatorias += parseInt(cadeira_turno[1])

                    }
                    else {
                        horas_obrigatorias -= parseInt(cadeira_turno[1])


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

                })


            }

            if (cadeira[i][j][0] == "Projeto de Trabalho Final") {
                if (turno_escolhido == "Noturno") {
                    continue
                }
                else {

                    semestres[i].appendChild(label)
                }
            }

            else {
                if (cadeira[i][j][0] == "Trabalho de Conclusão de Curso") {
                    tcc.push([cadeira[i][j][0], cadeira[i][j][1], cadeira[i][j][2], cadeira[i][j][3]])
                }
                else { semestres[i].appendChild(label) }
                if (i == 7 && turno_escolhido == "Noturno" && j == j.length) {
                    semestres[i].append(label2)
                }
            }
            //espaçamento do botão em labeis que possuem quebra de linha
            if (label.clientHeight > 35 || label2.clientHeight > 35) {
                botaoInfo.style.marginRight = '30px'
                botaoInfo2.style.marginRight = '20px'
            }




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


        }
    }
    const redefinir = document.getElementById("limpar")
    redefinir.addEventListener("click", () => {

        const aparecerPopupLimpar = document.querySelector(".popup-wrappep-limpar")
        aparecerPopupLimpar.style.display = "flex"
        const limparCadeiras = document.querySelector("#btn-limpar")
        const fecharPopupLimpar = document.querySelector("#btn-nao-limpar")
        limparCadeiras.addEventListener('click', () => {
            const checkboxes = document.getElementsByName("obrigatorias")
            for (let c in checkboxes) {
                checkboxes[c].checked = false
            }
            const todas = document.getElementsByName("todas")
            for (let t in todas) {
                todas[t].checked = false
            }
            horas_obrigatorias = 0
            aparecerPopupLimpar.style.display = "none"
        })
        fecharPopupLimpar.addEventListener("click", () => {
            aparecerPopupLimpar.style.display = "none"
        })


    })
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
    sessionStorage.setItem("tcc", JSON.stringify(tcc))

    let feitas = []
    let nao_feitas = []
    const form = document.getElementsByClassName("cadeiras-semestre")
    const formArray = Array.from(form)

    for (let f in formArray) {
        if (f == 4) {
            continue
        }
        let feitas_semestre = []
        let nao_feitas_semestre = []

        const semestre = formArray[f].querySelectorAll('input[name="obrigatorias"]')
        const semestreArray = Array.from(semestre)

        for (let s in semestreArray) {
            if (semestreArray[s].checked) {
                feitas_semestre.push(semestreArray[s].value)
            }
            else {
                nao_feitas_semestre.push(semestreArray[s].value)
            }
        }
        feitas.push(feitas_semestre)
        nao_feitas.push(nao_feitas_semestre)
    }
    sessionStorage.setItem("obrigatorias_feitas_semestre", JSON.stringify(feitas))
    sessionStorage.setItem("obrigatorias_nao_feitas_semestre", JSON.stringify(nao_feitas))




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

function simulador() {
    console.log("Seleção de obrigatórias")
    temaTurno()
    mudarTurno()
    obrigatorias()
    atualizarCheckboxes()
}

simulador()