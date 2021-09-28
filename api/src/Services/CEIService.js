const CeiCrawler = require('cei-crawler')

var cei = null

exports.login = async (usuario, senha) => {

   try {
      cei = new CeiCrawler(usuario, senha)
      cei.login()
      return true
   } catch (error) {
      console.log(error)
      return { "error": error.type }
   }

}

exports.buscarDividendos = async () => {
   try {
      retorno = await cei.getDividends()
      return retorno
   } catch (erro) {
      console.log(erro)
      return null
   }
}

exports.buscarNegociacoes = async () => {
   try {
      retorno = await cei.getStockHistory()
      return retorno
   } catch (erro) {
      console.log(erro)
      return null
   }
}

exports.buscarNegociacoesAnoPassado = async () => {
   try {
      retorno = await cei.getStockHistory(new Date(2020, 01, 01), new Date(2020, 11, 31))
      return retorno
   } catch (erro) {
      console.log(erro)
      return null
   }
}


