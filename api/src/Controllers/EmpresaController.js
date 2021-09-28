const EmpresaService = require('../Services/EmpresaService')

exports.buscarPeloTicker = async (req, res, next) => {
   let ticker = req.params.id;

   resultado = await EmpresaService.buscarInformacoes(ticker)
   
   if (resultado != null) {

      res.status(200).send({
         "ticker": String(ticker).toUpperCase(),
         "empresa": resultado.nome,
         "cnpj": resultado.cnpj
      })
   } else {
      res.status(404).send({
         "mensagem": "Sem informações da ação " + String(ticker).toUpperCase()
      })
   }
}