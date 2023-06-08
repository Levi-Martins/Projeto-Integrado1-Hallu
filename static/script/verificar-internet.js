if (navigator.connection) {
    let conexao = navigator.connection.effectiveType
    let larguraBanda = navigator.connection.downlink
    console.log(`Conexão: ${conexao}`)
    console.log(`Largura de banda: ${larguraBanda}mbps`)
    if (conexao === "slow" || larguraBanda < 1.5) {
        console.log("Sua conexão de internet é fraca.")
    } else {
        console.log("Sua conexão é boa.")
    }
} else {
    console.log("Não foi possível verificar a conexão de internet.")
}