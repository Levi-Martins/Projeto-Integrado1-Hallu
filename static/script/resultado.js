obrigatoria = JSON.parse(sessionStorage.getItem("obrigatorias_selecionadas"))
obrigatorias_feitas = JSON.parse(sessionStorage.getItem("obrigatorias_feitas_semestre"))
obrigatorias_nao_feitas = JSON.parse(sessionStorage.getItem("obrigatorias_nao_feitas_semestre"))


horas_obrigatorias = parseInt(sessionStorage.getItem("horas_obrigatorias"))
eletivas = JSON.parse(sessionStorage.getItem("eletivas_selecionadas"))
eletivas_feitas = JSON.parse(sessionStorage.getItem("eletivas_feitas_semestre"))
eletivas_nao_feitas = JSON.parse(sessionStorage.getItem("eletivas_nao_feitas_semestre"))

console.log(eletivas_nao_feitas)
horas_eletivas = parseInt(sessionStorage.getItem("horas_eletivas"))
optativa = JSON.parse(sessionStorage.getItem("optativas_selecionadas"))
horas_optativas = parseInt(sessionStorage.getItem("horas_optativas"))
eletivas_optativas = JSON.parse(sessionStorage.getItem("eletivas_optativas"))
horas_optativas_livres = parseInt(sessionStorage.getItem("horas_livres"))
horas_complementares = parseInt(sessionStorage.getItem("horas_complementares"))
tcc = sessionStorage.getItem("checktcc")
let turno_escolhido = sessionStorage.getItem("turno")


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
        console.log(i_turno.classList)
        nome_turno.innerText = "Diurno"
    }
    else {
        i_turno.classList.add('fa-moon')
        i_turno.classList.remove('fa-sun')
        nome_turno.innerText = "Noturno"
    }
}



function resultado() {
    const qtd_obrigatoria = document.getElementById("qtd_obrigatoria")
    const qtd_eletiva = document.getElementById("qtd_eletiva")
    const qtd_optativa = document.getElementById("qtd_optativa")
    const qtd_livre = document.getElementById("qtd_optativa_livre")
    const qtd_complementares = document.getElementById("qtd_complementares")
    const qtd_tcc = document.getElementById("tcc_consolidado")
    if (!horas_complementares) {
        horas_complementares = 0
    }

    if (!horas_optativas_livres) { horas_optativas_livres = 0 }


    qtd_obrigatoria.innerHTML = `${obrigatoria.length}/21`
    for (let e in eletivas) {
        for (o in eletivas_optativas) {
            if (eletivas[e] == eletivas_optativas[o][0]) {
                const index = eletivas.indexOf(eletivas[e]);
                if (index > -1) {
                    eletivas.splice(index, 1);
                }
            }
        }
    }

    for (let e in eletivas_optativas) {
        if (eletivas_optativas[e][4] == 1) {
            optativa.push(`${eletivas_optativas[e][0]}*`)
        }
    }
    for (let i in eletivas_optativas) {
        if (eletivas_optativas[i][4] == 1) {
            horas_optativas += parseInt(eletivas_optativas[i][1])
        }
    }
    qtd_eletiva.innerHTML = `${eletivas.length}/7`
    console.log(optativa.length)
    qtd_optativa.innerHTML = `${optativa.length}/12`
    qtd_livre.innerHTML = `Horas de Optativas Livres ${horas_optativas_livres}h`
    qtd_complementares.innerHTML = `Horas Complementares ${horas_complementares}h`
    if (tcc == '["nao-consolidado"]') {
        qtd_tcc.innerHTML = `TCC sem nota consolidada`

    }
    else if (tcc == '["consolidado"]') qtd_tcc.innerHTML = `TCC com nota consolidada`
    console.log(tcc)

    const h1 = document.getElementById("h1-texto")
    const h2 = document.getElementById("h2-texto")
    if (obrigatoria.length >= 21 && eletivas.length >= 7 && optativa.length >= 12 && horas_complementares >= 192 && tcc == '["consolidado"]') {
        h1.innerHTML = 'Parabéns!'
        h2.innerHTML = 'Você já está apto a se formar!'
    }
    else {
        h1.innerHTML = 'Quase lá!'
        h2.innerHTML = 'Você ainda não está apto a se formar.'
    }

}

function enviarEmail() {

    const popupWrappep = document.querySelector('.popup-wrappep-enviar-email')
    const cancelar = document.querySelector('#cancelar')
    popupWrappep.style.display = 'flex'
    cancelar.addEventListener('click', () => {
        popupWrappep.style.display = 'none'
    })
}

function gerarPdf() {
    const doc = new jsPDF({
        format: 'a4',
        unit: 'mm',
        putOnlyUsedFonts: true,
        // lineHeight: 1.5
    })
    const date = new Date().toLocaleString()


    const img = new Image()
    img.src = (turno_escolhido == "Diurno") ? 'assets/img/fundo-pdf-diurno.jpg' : 'assets/img/fundo-pdf-noturno.jpg'
    doc.addImage(img, 'jpg', 0, 0, 210, 297)
    doc.setFontSize(9)
    doc.setFont("Helvetica")
    doc.text(`SIMULAÇÃO ${date}`, 76, 30)

    //OBRIGATÓRIAS
    {
        doc.setFontSize(10)
        doc.setFontStyle('bold')
        let x = (obrigatoria.length > 0) ? 17.7 : 18
        doc.text(`Feitas: ${obrigatoria.length}/21`, x, 53.9)
        let x1
        if (horas_obrigatorias > 1000) {
            x1 = 49
        }
        else if (horas_obrigatorias > 0 && horas_obrigatorias < 1000) {
            x1 = 49.9
        }
        else {
            x1 = 52
        }
        doc.setFontStyle('normal')
        doc.text(`Horas Obtidas: ${horas_obrigatorias}/1344`, x1, 53.9)

        let x2 = (creditos(horas_obrigatorias) > 0) ? 105 : 105.7
        doc.text(`Créditos Obtidos: ${creditos(horas_obrigatorias)}/84`, x2, 53.9)



        let lastX

        for (let x = 0; x < 3; x++) {
            doc.setFontStyle('bold')
            doc.setFontSize(8.5)

            doc.text(`${x + 1}º semestre (${obrigatorias_feitas[x].length}/5)`, (x * 37) + 16, 60)
            lastX = (x * 37) + 16
            if (obrigatorias_feitas[x].length > 0) {
                doc.setTextColor('#11A020')
                doc.text("Feitas:", (x * 37) + 16, 65)
                doc.setFontStyle('normal')
                doc.setFontSize(7.7)
                doc.setTextColor('#000000')

                let lastY
                for (let i in obrigatorias_feitas) {
                    if (obrigatorias_feitas[x][i] == undefined) {
                        continue
                    }
                    doc.text(`${parseInt(i) + 1}. ${obrigatorias_feitas[x][i]}`, (x * 37) + 17, 70 + (i * 3))
                    lastY = i * 3
                }
                if (obrigatorias_feitas[x].length < 5) {
                    doc.setFontStyle('bold')
                    doc.setFontSize(8.5)
                    doc.setTextColor('#ED1010')
                    doc.text("Não Feitas:", (x * 37) + 16, 75 + lastY)
                    console.log(lastY)
                    doc.setFontStyle('normal')
                    doc.setFontSize(7.7)
                    doc.setTextColor('#000000')
                    for (let i in obrigatorias_nao_feitas) {
                        if (obrigatorias_nao_feitas[x][i] == undefined) {
                            continue
                        }
                        doc.text(`${parseInt(i) + 1}. ${obrigatorias_nao_feitas[x][i]}`, (x * 37) + 17, 80 + lastY + (i * 3))
                    }

                }
            }
            else {
                doc.setTextColor('#ED1010')
                doc.text("Não Feitas:", (x * 37) + 16, 65)
                doc.setFontStyle('normal')
                doc.setFontSize(7.7)
                doc.setTextColor('#000000')
                for (let i in obrigatorias_nao_feitas) {
                    if (obrigatorias_nao_feitas[x][i] == undefined) {
                        continue
                    }
                    doc.text(`${parseInt(i) + 1}. ${obrigatorias_nao_feitas[x][i]}`, (x * 37) + 17, 70 + (i * 3))
                }
            }
        }
        doc.setFontStyle('bold')
        doc.setFontSize(8.5)
        let lastY

        doc.text(`4º semestre (${obrigatorias_feitas[3].length}/1)`, lastX + 37, 60)
        if (obrigatorias_feitas[3].length > 0) {
            doc.setTextColor('#11A020')
            doc.text("Feitas:", lastX + 37, 65)
            doc.setFontStyle('normal')
            doc.setFontSize(7.7)
            doc.setTextColor('#000000')
            for (let i in obrigatorias_feitas) {
                if (obrigatorias_feitas[3][i] == undefined) {
                    continue
                }
                doc.text(`${parseInt(i) + 1}. Metodolodia de\nPesquisa Cientifica`, lastX + 38, 70 + (i * 3))
                lastY = 70 + (i * 3)

            }
        }
        else {
            doc.setTextColor('#ED1010')
            doc.text("Não Feitas:", lastX + 37, 65)
            doc.setFontStyle('normal')
            doc.setFontSize(7.7)
            doc.setTextColor('#000000')
            for (let i in obrigatorias_nao_feitas) {
                if (obrigatorias_nao_feitas[3][i] == undefined) {
                    continue
                }
                doc.text(`${parseInt(i) + 1}. Metodolodia de\nPesquisa Cientifica`, lastX + 38, 70 + (i * 3))
                lastY = 70 + (i * 3)
            }
        }
        lastX += 37
        let y8 = lastY + 10

        doc.setFontStyle('bold')
        doc.setFontSize(8.5)
        doc.text(`6º semestre (${obrigatorias_feitas[4].length}/2)`, lastX, lastY + 10)
        if (obrigatorias_feitas[4].length > 0) {
            doc.setTextColor('#11A020')
            doc.text("Feitas:", lastX, lastY + 15)
            doc.setFontStyle('normal')
            doc.setFontSize(7.7)
            doc.setTextColor('#000000')
            for (let i in obrigatorias_feitas) {
                if (obrigatorias_feitas[4][i] == undefined) {
                    continue
                }
                if (obrigatorias_feitas[4][i] == "Gestão de Projetos Multimídia") {
                    obrigatorias_feitas[4][i] = "Gestão de Projetos\nMultimídia"
                }
                doc.text(`${parseInt(i) + 1}. ${obrigatorias_feitas[4][i]}`, lastX, lastY + 20 + (i * 3))
                if (i == 1) {
                    lastY = lastY + 20 + (i * 3)
                }

            }
            if (obrigatorias_feitas[4].length < 2) {
                doc.setFontStyle('bold')
                doc.setFontSize(8.5)
                doc.setTextColor('#ED1010')
                doc.text("Não Feitas:", lastX, lastY + 28)
                doc.setFontStyle('normal')
                doc.setFontSize(7.7)
                doc.setTextColor('#000000')
                for (let i in obrigatorias_nao_feitas) {
                    if (obrigatorias_nao_feitas[4][i] == undefined) {
                        continue
                    }
                    if (obrigatorias_nao_feitas[4][i] == "Gestão de Projetos Multimídia") {
                        obrigatorias_nao_feitas[4][i] = "Gestão de Projetos\nMultimídia"
                    }
                    doc.text(`${parseInt(i) + 1}. ${obrigatorias_nao_feitas[4][i]}`, lastX, lastY + 33 + (i * 3))

                }

            }


        }
        else {
            doc.setFontStyle('bold')
            doc.setFontSize(8.5)
            doc.setTextColor('#ED1010')
            doc.text("Não Feitas:", lastX, lastY + 15)
            doc.setFontStyle('normal')
            doc.setFontSize(7.7)
            doc.setTextColor('#000000')
            for (let i in obrigatorias_nao_feitas) {
                if (obrigatorias_nao_feitas[4][i] == undefined) {
                    continue
                }
                if (obrigatorias_nao_feitas[4][i] == "Gestão de Projetos Multimídia") {
                    obrigatorias_nao_feitas[4][i] = "Gestão de Projetos\nMultimídia"

                }
                doc.text(`${parseInt(i) + 1}. ${obrigatorias_nao_feitas[4][i]}`, lastX, lastY + 20 + (i * 3))
            }
        }
        lastX += 37

        doc.setFontStyle('bold')
        doc.setFontSize(8.5)
        let qtd7 = (turno_escolhido == "Diurno") ? 2 : 1

        doc.text(`7º semestre (${obrigatorias_feitas[5].length}/${qtd7})`, lastX, 60)

        if (obrigatorias_feitas[5].length > 0) {
            doc.setTextColor('#11A020')
            doc.text("Feitas:", lastX, 65)
            doc.setFontStyle('normal')
            doc.setFontSize(7.7)
            doc.setTextColor('#000000')
            for (let i in obrigatorias_feitas) {
                if (obrigatorias_feitas[5][i] == undefined) {
                    continue
                }
                doc.text(`${parseInt(i) + 1}. ${obrigatorias_feitas[5][i]}`, lastX, 70 + (i * 3))
            }

            if (obrigatorias_feitas[5].length < qtd7) {
                doc.setFontStyle('bold')
                doc.setFontSize(8.5)
                doc.setTextColor('#ED1010')
                doc.text("Não Feitas:", lastX, 75)
                doc.setFontStyle('normal')
                doc.setFontSize(7.7)
                doc.setTextColor('#000000')
                for (let i in obrigatorias_nao_feitas) {
                    if (obrigatorias_nao_feitas[5][i] == undefined) {
                        continue
                    }

                    doc.text(`${parseInt(i) + 1}. ${obrigatorias_nao_feitas[5][i]}`, lastX, 80 + (i * 3))
                    lastY = 80 + (i * 3)

                }

            }

        }
        else {

            doc.setFontStyle('bold')
            doc.setFontSize(8.5)
            doc.setTextColor('#ED1010')
            doc.text("Não Feitas:", lastX, 65)
            doc.setFontStyle('normal')
            doc.setFontSize(7.7)
            doc.setTextColor('#000000')
            for (let i in obrigatorias_nao_feitas) {
                if (obrigatorias_nao_feitas[5][i] == undefined) {
                    continue
                }
                doc.text(`${parseInt(i) + 1}. ${obrigatorias_nao_feitas[5][i]}`, lastX, 70 + (i * 3))
                lastY = 70 + (i * 3)

            }

        }




        doc.setFontStyle('bold')
        doc.setFontSize(8.5)

        let qtd = (turno_escolhido == "Diurno") ? 1 : 2
        let yA 
        console.log(lastY)
        doc.text(`8º semestre (${obrigatorias_feitas[6].length}/${qtd})`, lastX, y8)
        if (obrigatorias_feitas[6].length > 0) {
            doc.setTextColor('#11A020')
            doc.text("Feitas:", lastX, y8 + 5)
            doc.setFontStyle('normal')
            doc.setFontSize(7.7)
            doc.setTextColor('#000000')
            for (let i in obrigatorias_feitas) {
                if (obrigatorias_feitas[6][i] == undefined) {
                    continue
                }
                doc.text(`${parseInt(i) + 1}. ${obrigatorias_feitas[6][i]}`, lastX, y8 + 10 + (i * 3))
                yA = y8 + 10 + (i * 3)
            }
            if (obrigatorias_nao_feitas[6].length > 0) {

                doc.setFontStyle('bold')
                doc.setFontSize(8.5)
                doc.setTextColor('#ED1010')
                doc.text("Não Feitas:", lastX, yA+5)
                doc.setFontStyle('normal')
                doc.setFontSize(7.7)
                doc.setTextColor('#000000')
                for (let i in obrigatorias_nao_feitas) {
                    if (obrigatorias_nao_feitas[6][i] == undefined) {
                        continue
                    }
                    doc.text(`${parseInt(i) + 1}. ${obrigatorias_nao_feitas[6][i]}`, lastX, yA + 12 + (i * 3))

                }


            }
        }
        else {
            doc.setFontStyle('bold')
            doc.setFontSize(8.5)
            doc.setTextColor('#ED1010')
            doc.text("Não Feitas:", lastX, y8 + 5)
            doc.setFontStyle('normal')
            doc.setFontSize(7.7)
            doc.setTextColor('#000000')
            for (let i in obrigatorias_nao_feitas) {
                if (obrigatorias_nao_feitas[6][i] == undefined) {
                    continue
                }
                doc.text(`${parseInt(i) + 1}. ${obrigatorias_nao_feitas[6][i]}`, lastX, y8 + 10 + (i * 3))
            }

        }
    }

    //ELETVAS
    {
        doc.setFontSize(10)
        doc.setFontStyle('bold')

        doc.text(`Feitas: ${eletivas.length}/7`, 19.3, 118)
        let x1



        if (horas_eletivas > 0 && horas_eletivas < 1000) {
            x1 = 50.7
        }
        else {
            x1 = 53
        }

        doc.setFontStyle('normal')
        doc.text(`Horas Obtidas: ${horas_eletivas}/448`, x1, 118)

        let x2 = (creditos(horas_eletivas) > 0) ? 104.8 : 105.7
        doc.text(`Créditos Obtidos: ${creditos(horas_eletivas)}/28`, x2, 118)

        for (let x = 0; x < 2; x++) {

            let margem = (eletivas_nao_feitas[0].length > 0) ? 48 : 45

            doc.setFontStyle('bold')
            doc.setFontSize(8.5)
            let s = (x == 0) ? 4 : 3
            console.log(eletivas_feitas)
            if (eletivas_feitas == 'nenhuma' || eletivas_feitas[x].length <= 0) {
                doc.text(`${x + 4}º semestre (${0}/${s})`, (x * margem) + 16, 124.1)

                doc.setFontStyle('bold')
                doc.setFontSize(8.5)
                doc.setTextColor('#ED1010')
                doc.text(`Ainda deve escolher ${s} destas:`, (x * margem) + 16, 129.1)
                doc.line((x * margem) + 46, 129.5, (x * margem) + 47.7, 129.5)

                doc.setFontStyle('normal')
                doc.setFontSize(7.7)
                doc.setTextColor('#000000')
                for (let i in eletivas_nao_feitas[x]) {
                    if (eletivas_nao_feitas[x][i] == undefined) {
                        continue
                    }
                    console.log("Opa")

                    console.log(eletivas_nao_feitas[x][i])
                    doc.text(`${parseInt(i) + 1}. ${eletivas_nao_feitas[x][i]}`, (x * margem) + 17, 134.1 + (i * 3))
                    if (x == 1 && i == eletivas_nao_feitas[x].length - 1) {
                        doc.setTextColor('#988787')
                        console.log("Opa")
                        doc.text("Nenhuma eletiva para optativa", 158, 125)
                    }
                }


            }


            else {
                doc.text(`${x + 4}º semestre (${eletivas_feitas[x].length}/${s})`, (x * margem) + 16, 124.1)


                lastX = (x * margem) + 16
                if (eletivas_feitas[x].length > 0) {
                    doc.setFontStyle('bold')
                    doc.setFontSize(8.5)
                    doc.setTextColor('#11A020')
                    doc.text("Feitas:", (x * margem) + 16, 129.1)
                    doc.setFontStyle('normal')
                    doc.setFontSize(7.7)
                    doc.setTextColor('#000000')

                    let lastY



                    for (let i in eletivas_feitas[x]) {
                        if (eletivas_feitas[x][i] == undefined) {
                            continue
                        }

                        doc.text(`${parseInt(i) + 1}. ${eletivas_feitas[x][i]}`, (x * margem) + 17, 134.1 + (i * 3))
                        lastY = i * 3
                    }

                    if (eletivas_nao_feitas[x].length > 0) {
                        if (s - eletivas_feitas[x].length <= 0) {
                            continue
                        }
                        doc.setFontStyle('bold')
                        doc.setFontSize(8.5)
                        doc.setTextColor('#ED1010')
                        doc.text(`Ainda deve escolher ${s - eletivas_feitas[x].length} destas:`, (x * margem) + 16, 139.1 + lastY)
                        doc.line((x * margem) + 46, 139.5 + lastY, (x * margem) + 47.7, 139.5 + lastY)
                        doc.setFontStyle('normal')
                        doc.setFontSize(7.7)
                        doc.setTextColor('#000000')
                        for (let i in eletivas_nao_feitas[x]) {

                            if (eletivas_nao_feitas[x][i] == undefined) {
                                continue
                            }

                            doc.text(`${parseInt(i) + 1}. ${eletivas_nao_feitas[x][i]}`, (x * margem) + 17, 144.1 + lastY + (i * 3))
                            if (x == 1 && i == eletivas_nao_feitas[x].length - 1) {
                                doc.setTextColor('#988787')
                                console.log("Opa")
                                doc.text("Nenhuma eletiva para optativa", 158, 125)
                            }
                        }
                    }
                }
            }
        }

        if (eletivas_optativas.length > 0) {
            let ele_op = false
            let disp = false
            let sla = false
            let y
            let y2 = 0
            let y_disponiveis
            let y_disp_cad
            let c = 0
            let margem = 0
           

            for (let i in eletivas_optativas) {
                y = (i * 3) + 128
                y_disponiveis = y + 5




                if (eletivas_optativas[i][4] == 1) {
                    ele_op = true
                    c++
                    if (c == 1) {
                        if (y2 == 1) {
                            margem = 1
                        }
                        else if (y2 == 2) {
                            margem = -2
                        }
                        else {
                            margem = 2
                        }
                    }

                    console.log(margem)
                    doc.text(`${eletivas_optativas[i][0]} `, 159, y + margem)

                }

                if (eletivas_optativas[i][4] == 0) {
                    y2++
                    console.log(y2)
                    if (y2 > 0 && y2 < 3) {
                        disp = true
                        y_disp_cad = y_disponiveis

                        if (y2 == 1) {
                            if (c == 2) {
                                y_disp_cad -= 5
                            }


                        }
                        if (y2 == 2) {
                            if (c == 1) {
                                y_disp_cad -= 3
                            }
                        }

                        doc.text(`${eletivas_optativas[i][0]} `, 159, y_disp_cad + 10)
                    }

                    else {
                        if (y2 > 2) {
                            sla = true
                            doc.text(`${eletivas_optativas[i][0]} `, 159, y + 3.5)
                        }

                    }
                }
            }

            doc.setFontStyle('bold')
            doc.setFontSize(8.5)
            if (ele_op) {
                doc.setTextColor('#11A020')
                doc.text("Feitas:", 158, 127)
            }
            if (disp) {
                doc.setTextColor('#6D6D6D')
                console.log("opaa")
                doc.text("Disponíveis para fazer", 158, y_disponiveis)
            }

            if (sla) {
                doc.setTextColor('#6D6D6D')
                doc.text("Disponíveis para fazer", 158, 127)

            }

        }
        // for (let e in eletivas_nao_feitas) {
        //     for (o in eletivas_optativas) {
        //         if (eletivas_nao_feitas[e] == eletivas_optativas[o][0]) {
        //             console.log(eletivas_nao_feitas[e])
        //             const index = eletivas_nao_feitas.indexOf(eletivas_nao_feitas[e]);
        //             if (index > -1) {
        //                 eletivas_nao_feitas.splice(index, 1);
        //             }
        //         }
        //     }
        // }

    }

    //OPTATIVAS
    {
        doc.setFontSize(10)
        doc.setFontStyle('bold')
        doc.setTextColor('#000000')



        if(horas_optativas>=1000){
            x1=16.8
        }
        else if (horas_optativas > 0) {
            x1 = 18
        }
        else {
            x1 = 20
        }




        doc.text(`Horas Totais Obtidas: ${horas_optativas + horas_optativas_livres}/1408`, x1, 176.5)

        let x2 = (creditos(horas_optativas + horas_optativas_livres) > 0) ? 82 : 82.4
        doc.text(`Créditos Totais Obtidos: ${creditos(horas_optativas + horas_optativas_livres)}/76`, x2, 176.5)

        doc.setFontSize(8.5)

        doc.setFontStyle('bold')
        let x = 0
        for (let i in eletivas_optativas) {
            if (eletivas_optativas[i][4] == 1) {
                x++
            }
        }
        doc.text(`Optativas Feitas (SMD) - ${optativa.length}/12`, 16, 184)

        optativa.sort()
        let cadeiras_optativas = splitList(optativa, 5)
        console.log(cadeiras_optativas)

        for (let x in cadeiras_optativas) {

            doc.setFontStyle('bold')
            doc.setFontSize(8)
            lastX = (x * 37) + 16
            if (cadeiras_optativas[x].length > 0) {
                doc.setFontStyle('normal')

                for (let i in cadeiras_optativas[x]) {
                    if (cadeiras_optativas[x][i] == undefined) {
                        continue
                    }

                    doc.text(cadeiras_optativas[x][i], (x * 35) + 16, 190 + (i * 4))
                    lastY = i * 3
                }
            }

        }






    }


    doc.save('Simulação.pdf')
}

function splitList(list, interval) {
    let result = []
    let index = 0

    while (index < list.length) {
        result.push(list.slice(index, index + interval))
        index += interval
    }

    return result
}




function creditos(horas) {
    return horas / 16
}

function app() {
    temaTurno()
    mudarTurno()
    resultado()

}
app()