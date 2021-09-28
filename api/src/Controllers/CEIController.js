const CEIService = require('../Services/CEIService')

exports.login = async (req, res, next) => {
   let usuario = req.body.usuario
   let senha = req.body.senha
   
   resultado = await CEIService.login(usuario, senha)
   if(resultado)
      res.status(200).send({"mensagem": "Conectado com sucesso"})
   else
      res.status(500).send(resultado)
   
}

exports.buscarDividendos = async (req, res, next) => {
   let resultado = await CEIService.buscarDividendos()
   if(resultado != null)
         res.status(200).send(resultado)
    else{
      res.status(500).send({ "erro": "Ocorreu um erro ao buscar os dividendos" })
   }
}

exports.buscarNegociacoes = async (req, res, next) => {
   let resultado = await CEIService.buscarNegociacoes()
   if(resultado != null)
         res.status(200).send(resultado)
    else{
      res.status(500).send({ "erro": "Ocorreu um erro ao buscar as negociações" })
   }
}
