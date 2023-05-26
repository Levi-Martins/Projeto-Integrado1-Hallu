const doc = new jsPDF({
    format: 'a4',
    unit: 'mm',
    putOnlyUsedFonts: true,
    lineHeight: 1.5
})

const img = new Image()
img.src = 'timbrado.jpg'




let qtd_cadeiras = sessionStorage.getItem('qtd_cadeiras')
let progresso = parseInt(sessionStorage.getItem('progresso'))

const cadeiras = sessionStorage.getItem('disciplinas').split(",")


const ul = document.getElementById('cadeiras')
const ulHoras = document.getElementById('horas')
const ulCreditos = document.getElementById('creditos')

console.log(cadeiras)
cadeiras.forEach(c => {
    const li = document.createElement('li')
    li.innerText = `${c}`
    ul.appendChild(li)
});

let credito = progresso / 16
let falta_credito = 180 - credito
let falta_hora = 2880 - progresso
let porcentagem_horas = ((progresso * 10) / 288).toFixed(2)
let porcentagem_creditos = ((credito * 10) / 18).toFixed(2)

const num = document.getElementById('qtd_cadeiras')
const liQtd = document.createElement('li')
liQtd.innerText = `Quantidade de cadeiras feitas: ${qtd_cadeiras}`
num.appendChild(liQtd)

const liHoras = document.createElement('li')
const horasFeitas = document.createElement('li')
const saldoHoras = document.createElement('li')
liHoras.innerText=`Horas totais necessárias = 2880`
horasFeitas.innerText=`Horas Feitas = ${progresso} (${porcentagem_horas}%)`
saldoHoras.innerText=`Saldo = ${falta_hora}`
ulHoras.appendChild(liHoras)
ulHoras.appendChild(horasFeitas)
ulHoras.appendChild(saldoHoras)


const liCredito = document.createElement('li')
const creditosFeitos = document.createElement('li')
const saldoCredito = document.createElement('li')
liCredito.innerText=`Créditos totais necessários = 180`
creditosFeitos.innerText=`Créditos adquiridos = ${credito} (${porcentagem_creditos}%)`
saldoCredito.innerText=`Saldo = ${falta_credito}`
ulCreditos.appendChild(liCredito)
ulCreditos.appendChild(creditosFeitos)
ulCreditos.appendChild(saldoCredito)

let x = 0

doc.addImage(img, 'jpg', 0, 0, 210, 297)
doc.setFontSize(20)
doc.setFontStyle('Gothic')
doc.setFontStyle('bold')
doc.text(`Quantidade de cadeiras feitas: ${qtd_cadeiras}`,90,50)
doc.text(`Cadeiras feitas:`, 10, 50)
for (t in cadeiras) {
    doc.setFontSize(15)
    doc.setFontStyle('normal')
    doc.setFontStyle('regular')
    doc.text(`  - ${cadeiras[t]}`, 10, t * 10 + 60)
    x = t
}
doc.setDrawColor(0, 0, 0);
doc.line(0, x * 10 + 70, 210, x * 10 + 70)
doc.setFontSize(20)
doc.setFontStyle('Gothic')
doc.setFontStyle('bold')
doc.text(`Horas Totais:`, 10, x * 10 + 80)
doc.text(`Horas Feitas:`, 80, x * 10 + 80)
doc.text(`Saldo:`, 160, x * 10 + 80)

doc.setFontSize(15)
doc.setFontStyle('normal')
doc.setFontStyle('regular')
doc.text(`  - 2880`, 10, x * 10 + 90)
doc.text(`  - ${progresso}   (${porcentagem_horas}%)`, 80, x * 10 + 90)
doc.text(`  - ${falta_hora}  `, 160, x * 10 + 90)

doc.line(0, x * 10 + 100, 210, x * 10 + 100)

doc.setFontSize(20)
doc.setFontStyle('Gothic')
doc.setFontStyle('bold')
doc.text(`Créditos Totais:`, 10, x * 10 + 110)
doc.text(`Créditos Feitos:`, 80, x * 10 + 110)
doc.text(`Saldo:`, 160, x * 10 + 110)

doc.setFontSize(15)
doc.setFontStyle('normal')
doc.setFontStyle('regular')
doc.text(`  - 180`, 10, x * 10 + 120)
doc.text(`  - ${credito}   (${porcentagem_creditos}%)`, 80, x * 10 + 120)
doc.text(`  - ${falta_credito}`, 160, x * 10 + 120)
doc.output('Cadeiras.pdf')

function pdf(){
    doc.save('Cadeiras.pdf')

}
function enviarPdf() {
    const email = String(document.getElementById('email').value)
    const nome = String(document.getElementById('nome').value)

    const formData = new FormData();
    formData.append("email", email)
    formData.append("nome", nome)
    formData.append("file", new Blob([doc.output('blob')], { type: 'application/pdf' }), "Cadeiras.pdf");
     axios.post('http://127.0.0.1:8000/final', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    alert('Email enviado com sucesso')
    
}
