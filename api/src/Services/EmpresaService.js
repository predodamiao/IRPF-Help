const rp = require('request-promise')
const cheerio = require('cheerio')

exports.buscarInformacoes = async (ticker) => {

    ticker = ticker.length > 5 ? ticker.substring(0, 5) : ticker

    const options = {
        uri: `https://statusinvest.com.br/acoes/${ticker}/`,
        transform: function (body) {
            return cheerio.load(body)
        }
    }

    var resultado = null
    
    await rp(options).then(($) => {
        $('.company-description>h4').each((i, item) => {
            
            resultado = {
                "nome": $(item).find('span').text(),
                "cnpj": $(item).find('small').text()
            }
        })
        
    }).catch((erro) => {
        return null
    })

    return resultado

}


