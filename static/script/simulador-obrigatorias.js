
function obrigatorias(){
    let cadeira = JSON.parse(localStorage.getItem("obrigatorias"))
    // console.log(cadeiras)
    const semestres = document.getElementsByClassName("cadeiras-semestre")

    for (let i in cadeira) {
        console.log(`Semestre ${parseInt(i)+1}`)    
        for (let j in cadeira[i]) {
            console.log(cadeira[i][j][0])
            // console.log(j)
    
            // console.log(cadeira[i][j][0])
            if(cadeira[i][j][0] == "-"){
                console.log(semestres[j])
            }
        }
        console.log(" ")
    }




}




function simulador(){
    console.log("Seleção de obrigatórias")
    obrigatorias()
}

simulador()