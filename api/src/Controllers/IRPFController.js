const IRPFService = require('../Services/IRPFService')
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

exports.BDProventos = async (req, res, next) => {

   resultado = await IRPFService.buscarProventos()
   if(resultado)
      res.status(200).send(resultado)
   else
      res.status(500).send(resultado)
   
}

exports.BDAcoes = async (req, res, next) => {

   resultado = await IRPFService.buscarAcoes()
   if(resultado)
      res.status(200).send(resultado)
   else
      res.status(500).send(resultado)
   
}

exports.LucrosPrejuizos = async (req, res, next) => {

   resultado = await IRPFService.lucroPrejuizo()
   if(resultado)
      res.status(200).send(resultado)
   else
      res.status(500).send(resultado)
   
}
  
   

