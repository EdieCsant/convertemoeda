async function converter() {
    // Pegando o valor inserido em reais
    const moedaReal = document.getElementById('moedaReal').value;

    // Pegando a moeda selecionada
    const moedaSelecionada = document.getElementById('moeda').value;

    // URLs das APIs
    const urlMoedas = `https://api.exchangerate-api.com/v4/latest/BRL`;
    const urlCripto = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,dogecoin&vs_currencies=brl`;

    let taxaDeCambio;

    try {
        if (['euro', 'dolar', 'libra', 'yen'].includes(moedaSelecionada)) {
            // Fazendo a requisição para a API de moedas
            const responseMoedas = await fetch(urlMoedas);
            const dataMoedas = await responseMoedas.json();

            // Definindo a taxa de câmbio correta
            if (moedaSelecionada === 'euro') {
                taxaDeCambio = dataMoedas.rates.EUR;
            } else if (moedaSelecionada === 'dolar') {
                taxaDeCambio = dataMoedas.rates.USD;
            } else if (moedaSelecionada === 'libra') {
                taxaDeCambio = dataMoedas.rates.GBP;
            } else if (moedaSelecionada === 'yen') {
                taxaDeCambio = dataMoedas.rates.JPY;
            }
        } else if (['bitcoin', 'ethereum', 'binance', 'dogecoin'].includes(moedaSelecionada)) {
            // Fazendo a requisição para a API de criptomoedas
            const responseCripto = await fetch(urlCripto);
            const dataCripto = await responseCripto.json();

            // Definindo a taxa de câmbio correta
            if (moedaSelecionada === 'bitcoin') {
                taxaDeCambio = dataCripto.bitcoin.brl;
            } else if (moedaSelecionada === 'ethereum') {
                taxaDeCambio = dataCripto.ethereum.brl;
            } else if (moedaSelecionada === 'binance') {
                taxaDeCambio = dataCripto.binancecoin.brl;
            } else if (moedaSelecionada === 'dogecoin') {
                taxaDeCambio = dataCripto.dogecoin.brl;
            }
        }

        // Calculando a conversão
        const total = moedaReal / taxaDeCambio;

        // Exibindo o resultado
        const resultado = document.getElementById('resultado');
        if (moedaReal && moedaSelecionada) {
            resultado.innerHTML = `<h2>💰${parseFloat(moedaReal).toFixed(2)}</h2><h4>valor convertido para Real:</h4><h1>💰R$ ${total.toFixed(2)}</h1>`;
        } else {
            resultado.innerHTML = 'Por favor, insira um valor válido.';
        }
    } catch (error) {
        console.error('Erro ao buscar a taxa de câmbio:', error);
        resultado.innerHTML = 'Erro ao buscar a taxa de câmbio. Tente novamente mais tarde.';
    }
}
