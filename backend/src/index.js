const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
/**
 * MÉTODOS HTTP:
 * GET: BUSCAR INFORMAÇÕES DO BACK-END
 * POST: CRIAR UMA INFORMAÇÃO NO BACK-END
 * PUT: ALTERAR UMA INFORMAÇÃO NO BACK-END
 * DELETE: DELETAR UMA INFORMAÇÃO NO BACK-END
 */

/**
 * TIPOS DE PARÂMETROS:
 * QUERY PARAMS => PARAMETROS NOMEADOS ENVIADOS NA ROTA APÓS "?" (Filtros, paginação etc..)
 * ROUTE PARAMS => PARAMETROS ULTILIZADOS PARA IDENTIFICAR RECURSOS
 * REQUEST PARAMS => CORPO DA REQUISIÇÃO, ULTILIZADO PARA CRIAR OU ALTERAR RECURSOS
 */

app.listen(3333);
