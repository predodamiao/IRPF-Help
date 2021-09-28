const EmpresaController = require('../Controllers/EmpresaController')
const CEIController = require('../Controllers/CEIController')
const IRPFController = require('../Controllers/IRPFController')

module.exports = (app) => {
    app.get('/empresa/:id', EmpresaController.buscarPeloTicker)
    
    app.post('/cei/login', CEIController.login)
    app.get('/cei/dividendos', CEIController.buscarDividendos)
    app.get('/cei/negociacoes', CEIController.buscarNegociacoes)

    app.get('/irpf/bensdireitos/proventos', IRPFController.BDProventos)
    app.get('/irpf/bensdireitos/acoes', IRPFController.BDAcoes)
    app.get('/irpf/lucrosPrejuizos', IRPFController.LucrosPrejuizos)

}