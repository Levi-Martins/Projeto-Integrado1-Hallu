obrigatorias = JSON.parse(sessionStorage.getItem("obrigatorias_selecionadas"))
horas_obrigatorias = parseInt(sessionStorage.getItem("horas_obrigatorias"))
eletivas = JSON.parse(sessionStorage.getItem("eletivas_selecionadas"))
horas_eletivas = parseInt(sessionStorage.getItem("horas_eletivas"))
optativas = JSON.parse(sessionStorage.getItem("optativas_selecionadas"))
horas_optativas = parseInt(sessionStorage.getItem("horas_optativas"))
eletivas_optativas = JSON.parse(sessionStorage.getItem("eletivas_optativas"))

function resultado() {
    const qtd_obrigatoria = document.getElementById("qtd_obrigatoria")
    const qtd_eletiva = document.getElementById("qtd_eletiva")
    const qtd_optativa = document.getElementById("qtd_optativa")

    qtd_obrigatoria.innerHTML = `${obrigatorias.length}/22`
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
    for(let e in eletivas_optativas){
        optativas.push(eletivas_optativas[e][0])
    }

    qtd_eletiva.innerHTML = `${eletivas.length}/7`
    qtd_optativa.innerHTML = `${optativas.length}/12`


}

function app() {
    resultado()
}
app()