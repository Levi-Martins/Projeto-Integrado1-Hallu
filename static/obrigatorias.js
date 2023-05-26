

let disciplinas_feitas = []
const total = 2880
let horas = 0
let qtd_cadeiras = 0

let progresso = 0
fetch('http://127.0.0.1:8000/eletivas')
.then(res => res.json()).then(data => {
    sessionStorage.setItem('eletivas',JSON.stringify(data))
})


async function cadeiras() {
    cadeira = JSON.parse(sessionStorage.getItem('obrigatorias'))

    const semestre1 = document.getElementById('semestre1')
    const semestre2 = document.getElementById('semestre2')
    const semestre3 = document.getElementById('semestre3')
    const semestre4 = document.getElementById('semestre4')
    const semestre6 = document.getElementById('semestre6')
    const semestre7 = document.getElementById('semestre7')
    const semestre8 = document.getElementById('semestre8')
    const semestres = [semestre1, semestre2, semestre3, semestre4, semestre6, semestre7, semestre8]


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
            info.innerText='!'
            const msg = document.createElement('p')


            item.innerText = `${cadeira[i][j][0]}`
            item.appendChild(info)
            semestres[i].appendChild(item).appendChild(bt)
            semestres[i].appendChild(item).appendChild(bt2)
            info.addEventListener('click', () => {
                msg.innerText = cadeira[i][j][2]
                info.classList.toggle('info_ativo')
                if (info.classList.contains('info_ativo')) {
                    info.innerText=''
                    info.appendChild(msg)
                }
                else {
                    info.innerText= '!'
                }

            })
            info.classList.add('info')
            item.classList.add('cadeiras')
            bt.classList.add('plus')
            bt2.classList.add('minus')
            bt2.classList.add('activePlus')
            const barra = document.getElementById('progresso')

            bt.addEventListener('click', (function (horas, cad) {
                return function (event) {
                    event.stopPropagation()
                    progresso += parseInt(horas) 
                    qtd_cadeiras++
                    console.log(horas)
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
    const continuar = document.getElementById('continuar')
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
