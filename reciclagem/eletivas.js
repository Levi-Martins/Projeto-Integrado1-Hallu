



let disciplinas_feitas = sessionStorage.getItem('disciplinas').split(",")
let progresso = parseInt(sessionStorage.getItem('progresso'))
let qtd_cadeiras = sessionStorage.getItem('qtd_cadeiras')

const total = 2880
let horas = 0


const barra = document.getElementById('progresso')
barra.style.width = (progresso / total) * 100 + '%'




function cadeiras() {
    const cadeira = JSON.parse(sessionStorage.getItem('eletivas'))

    const semestre4 = document.getElementById('semestre4')
    const semestre5 = document.getElementById('semestre5')
    const semestres = [semestre4, semestre5]

    console.log(cadeira)
    for (let i in cadeira) {
        console.log(`Semestre ${parseInt(i) + 1}`)
        for (let j in cadeira[i]) {
            console.log(cadeira[i][j][0])
            horas = parseInt(cadeira[i][j][1])
            const item = document.createElement('li')
            const bt = document.createElement('BUTTON')
            const bt2 = document.createElement('BUTTON')
            const info = document.createElement('div')
            var lbl = document.createTextNode('+')
            var lbl2 = document.createTextNode('-')
            bt.appendChild(lbl)
            bt2.appendChild(lbl2)
            info.innerText = '!'
            const msg = document.createElement('p')

            item.innerText = `${cadeira[i][j][0]}`
            item.appendChild(info)
            semestres[i].appendChild(item).appendChild(bt)
            semestres[i].appendChild(item).appendChild(bt2)
            item.classList.add('cadeiras')
            bt.classList.add('plus')
            bt2.classList.add('minus')
            bt2.classList.add('activePlus')
            info.addEventListener('click', () => {
                msg.innerText = cadeira[i][j][2]
                info.classList.toggle('info_ativo')
                if (info.classList.contains('info_ativo')) {
                    info.innerText = ''
                    info.appendChild(msg)
                }
                else {
                    info.innerText = '!'
                }

            })
            info.classList.add('info')
            item.classList.add('cadeiras')

            bt.addEventListener('click', (function (horas, cad) {
                return function (event) {
                    event.stopPropagation()
                    progresso += parseInt(horas)
                    qtd_cadeiras++
                    console.log(`Adicionado ${horas}`)
                    console.log(progresso)
                    bt.setAttribute('disabled', true)
                    bt.nextElementSibling.removeAttribute('disabled')
                    bt.classList.add('activeMinus')
                    bt2.classList.remove('activePlus')
                    barra.style.width = (progresso / total) * 100 + '%'
                    disciplinas_feitas.push(cad)
                    console.log(disciplinas_feitas)

                }

            })(horas, cadeira[i][j][0]))

            bt2.addEventListener('click', (function (horas, cad) {
                return function (event) {
                    event.stopPropagation()
                    progresso -= parseInt(horas)
                    qtd_cadeiras--
                    if (progresso < 0) progresso = 0
                    console.log(`Subtraido ${horas}`)
                    console.log(progresso)
                    bt2.setAttribute('disabled', true)
                    bt2.previousElementSibling.removeAttribute('disabled')
                    bt2.classList.add('activePlus')
                    bt.classList.remove('activeMinus')
                    barra.style.width = (progresso / total) * 100 + '%'
                    disciplinas_feitas = disciplinas_feitas.filter(disciplina => disciplina !== cad);
                    console.log(disciplinas_feitas)
                }
            })(horas, cadeira[i][j][0]))
        }
    }


    const obrigatorias = document.getElementById('obrigatorias')
    const semestresObrigatorias = document.querySelectorAll('.semestres')


    obrigatorias.addEventListener('click', () => {
        obrigatorias.classList.toggle('active')
    })
    semestres.forEach(e => {
        e.addEventListener('click', event => {
            event.stopPropagation()
        })
    })
    semestresObrigatorias.forEach(e => {
        e.addEventListener('click', (event) => {
            event.stopPropagation()
            e.classList.toggle('activeObrigatorias')
        })
    })
    const continuar = document.getElementById('final')
    continuar.addEventListener('click', () => {
        sessionStorage.setItem('progresso', progresso)
        sessionStorage.setItem('disciplinas', disciplinas_feitas)
        sessionStorage.setItem('qtd_cadeiras',qtd_cadeiras)


    })

}



function app() {
    console.log('App iniciado!')
    cadeiras()

}
app()
