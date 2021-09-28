const CEIService = require('../Services/CEIService')
const EmpresaService = require('../Services/EmpresaService')

exports.buscarProventos = async () => {

   let resultado = await CEIService.buscarDividendos()

   let pagamentos = []

   resultado.forEach(corretora => {
      corretora.futureEvents.forEach(dividendo => pagamentos.push(dividendo))
      corretora.pastEvents.forEach(dividendo => pagamentos.push(dividendo))
   })

   let tickers = pagamentos.map(item => item.code).filter((value, index, self) => self.indexOf(value) === index)

   let resumo = []

   tickers.forEach(async ticker => {

      pagamentosEmpresa = pagamentos.filter(pagamento => pagamento.code == ticker)
      dividendosRecebidos = []
      dividendosRecebidos = pagamentosEmpresa.filter(pagamento => pagamento.type == 'DIVIDENDO')
      jcpsRecebidos = []
      jcpsRecebidos = pagamentosEmpresa.filter(pagamento => pagamento.type == 'JUROS SOBRE CAPITAL PRÓPRIO')

      let totalDividendos = dividendosRecebidos.map(pagamento => pagamento.quantity * pagamento.netValue).reduce((total, atual) => total + atual, 0)
      let totalJcps = jcpsRecebidos.map(pagamento => pagamento.quantity * pagamento.netValue).reduce((total, atual) => total + atual, 0)

      if (totalDividendos > 0) {
         resumo.push({
            "operacao": '99',
            "ticker": ticker,
            "tipo": 'DIVIDENDOS',
            "total": totalDividendos.toFixed(2)
         })
      }

      if (totalJcps > 0) {
         resumo.push({
            "operacao": '99',
            "ticker": ticker,
            "tipo": 'JUROS SOBRE CAPITAL PRÓPRIO',
            "total": totalJcps.toFixed(2)
         })
      }

   })

   return resumo

}

exports.buscarAcoes = async () => {
   let resultado = await CEIService.buscarNegociacoesAnoPassado()

   let negociacoes = []

   resultado.forEach(corretora => {
      corretora.stockHistory.forEach(operacao => negociacoes.push(operacao))
   })

   let tickers = negociacoes.map(item => item.code).filter((value, index, self) => self.indexOf(value) === index)

   let resumos = []

   tickers.forEach(async ticker => {

      negociacoesEmpresa = negociacoes.filter(negociacao => negociacao.code == ticker)
      compras = negociacoesEmpresa.filter(compra => compra.operation == 'C')
      vendas = negociacoesEmpresa.filter(compra => compra.operation == 'V')

      let totalComprado = compras.map(compra => compra.quantity * compra.price).reduce((total, atual) => total + atual, 0)
      let quantidadeComprada = compras.map(compra => compra.quantity).reduce((total, atual) => total + atual, 0)
      let precoMedioCompra = totalComprado / quantidadeComprada

      let totalVendido = vendas.map(venda => venda.quantity * venda.price).reduce((total, atual) => total + atual, 0)
      let quantidadeVendida = vendas.map(venda => venda.quantity).reduce((total, atual) => total + atual, 0)
      let precoMedioVenda = totalVendido / quantidadeVendida

      let final = quantidadeComprada - quantidadeVendida

      let resultadoValor = final * precoMedioCompra

      if (final > 0) {
         resumo = {
            "operacao": '31',
            "ticker": ticker,
            "resultado": final,
            "valorTotal": resultadoValor.toFixed(2)

         }
         resumos.push(resumo)
      }
   })

   return resumos
}

exports.lucroPrejuizo = async () => {
   let resultado = await CEIService.buscarNegociacoesAnoPassado()

   const NOME_MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

   let negociacoes = []
   
   resultado.forEach(corretora => {
       corretora.stockHistory.forEach(operacao => {
           operacao.date = new Date(operacao.date)
           negociacoes.push(operacao)
       })
   })
   
   OperacoesCompra = negociacoes.filter(negociacao => negociacao.operation == 'C')
   OperacoesVendas = negociacoes.filter(negociacao => negociacao.operation == 'V')
   
   meses = []
   
   for (let mes = 0; mes <= 11; mes++) {
       let vendasMes = OperacoesVendas.filter(venda => venda.date.getMonth() == mes)
   
       vendasMes.forEach(venda => {
           operacoesAnterioresCompra = OperacoesCompra.filter(compra => compra.date < venda.date && compra.code == venda.code)
           let valorTotalCompra = operacoesAnterioresCompra.map(compra => compra.quantity * compra.price).reduce((total, atual) => total + atual, 0)
           let quantidadeComprada = operacoesAnterioresCompra.map(compra => compra.quantity).reduce((total, atual) => total + atual, 0)
           let precoMedio = valorTotalCompra / quantidadeComprada
           venda.quantidadeComprada = quantidadeComprada
           venda.precoMedio = precoMedio
           venda.precoMedioCompra = precoMedio
       })
   
       let totalRecebidoDeVendas = vendasMes.map(venda => venda.quantity * venda.price).reduce((total, atual) => total + atual, 0)
       let totalGasto = vendasMes.map(venda => venda.quantity * venda.precoMedioCompra).reduce((total, atual) => total + atual, 0)
       let resultado = totalRecebidoDeVendas - totalGasto
       if (resultado != 0) {
           meses.push({
               "mes": NOME_MESES[mes],
               "resultado": parseFloat(resultado.toFixed(2))
           })
       }
   
   }
   return meses
}
