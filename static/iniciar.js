fetch('https://deployprojeto.herokuapp.com/obrigatorias')
    .then(res => res.json()).then(data => {
        sessionStorage.setItem('obrigatorias', JSON.stringify(data))
    })


