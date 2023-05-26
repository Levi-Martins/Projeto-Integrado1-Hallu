

cadeira = JSON.parse(sessionStorage.getItem('optativas'))

let disciplinas_feitas = sessionStorage.getItem('disciplinas').split(",")
let progresso = parseInt(sessionStorage.getItem('progresso'))
let qtd_cadeiras = sessionStorage.getItem('qtd_cadeiras')


const total = 2880
let horas = 0


const barra = document.getElementById('progresso')
barra.style.width = (progresso / total) * 100 + '%'


const lista = document.getElementById('lista')

for (let i in cadeira) {
    let li = document.createElement('li')
    const bt = document.createElement('BUTTON')
    const bt2 = document.createElement('BUTTON')
    var lbl = document.createTextNode('+')
    var lbl2 = document.createTextNode('-')
    bt.appendChild(lbl)
    bt2.appendChild(lbl2)
    bt.classList.add('plus')
    bt2.classList.add('minus')
    bt2.classList.add('activePlus')
    horas = parseInt(cadeira[i][1])



    li.classList.add('c')
    li.innerText = cadeira[i][0].charAt(0).toUpperCase() + cadeira[i][0].substr(1).toLowerCase();
    lista.appendChild(li).appendChild(bt)
    lista.appendChild(li).appendChild(bt2)

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

    })(horas, cadeira[i][0]))

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
    })(horas, cadeira[i][0]))
}
const continuar = document.getElementById('final')
continuar.addEventListener('click', () => {
    sessionStorage.setItem('progresso', progresso)
    sessionStorage.setItem('disciplinas', disciplinas_feitas)
    sessionStorage.setItem('qtd_cadeiras', qtd_cadeiras)


})








function pesquisar() {
    let input = document.getElementById('cadeira').value
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