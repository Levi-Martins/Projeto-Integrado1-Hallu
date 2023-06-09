


function escolhaTurno() {
    const chk = document.getElementById('check')
    const i = document.getElementsByTagName('i')
    if (!sessionStorage.getItem("bool_turno")) {
        sessionStorage.setItem("turno", "Diurno")
        sessionStorage.setItem("bool_turno", true)
    }

    const btn_prosseguir = document.getElementById("btn-turnos")
    let turno_escolhido = sessionStorage.getItem("turno");

    if (turno_escolhido === "Noturno") {
        chk.checked = true;
        document.body.classList.add('dark')

        i[0].classList.replace('fa-sun', 'fa-moon');
    } else {
        chk.checked = false;
        document.body.classList.remove('dark')

        i[0].classList.replace('fa-moon', 'fa-sun');
    }

    chk.addEventListener('click', () => {

        const check = document.getElementById('check')
        console.log(check)
        if (check.checked) {
            turno_escolhido = "Noturno"
            console.log(turno_escolhido)
            document.body.classList.add('dark')


            i[0].classList.replace('fa-sun', 'fa-moon');
        } else {
            turno_escolhido = "Diurno"
            console.log(turno_escolhido)
            document.body.classList.remove('dark')


            i[0].classList.replace('fa-moon', 'fa-sun');
        }
    })


    btn_prosseguir.addEventListener("click", () => {
        sessionStorage.setItem("turno", turno_escolhido)
    })





}


function app() {
    console.log("Simulação Iniciado")
    request()
    escolhaTurno()

}

app() 