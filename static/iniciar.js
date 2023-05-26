fetch('http://127.0.0.1:8000/obrigatorias')
    .then(res => res.json()).then(data => {
        sessionStorage.setItem('obrigatorias', JSON.stringify(data))
    })
