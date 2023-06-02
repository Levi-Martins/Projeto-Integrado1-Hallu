let obrigatorias;
let eletivas;

async function request() {
    if (!localStorage.getItem('arquivosArmazenados')) {
        console.log("Carregando dados")
        await axios.all([
            axios.get("http://127.0.0.1:8000/obrigatorias"),
            axios.get("http://127.0.0.1:8000/eletivas")
        ]).then(axios.spread((ob, ele) => {
            localStorage.setItem("obrigatorias",JSON.stringify(ob.data))
            localStorage.setItem("eletivas",JSON.stringify(ele.data))

        }))
        localStorage.setItem('arquivosArmazenados', true)
        console.log("Dados Carregados")
    } else {
        console.log("Arquivos já em localStorage")
    }
}
request()