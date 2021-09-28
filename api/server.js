const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3333

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require('./src/Routes/index')(app)

app.use(express.json())
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})