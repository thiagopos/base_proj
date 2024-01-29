import express from 'express';
import path from "path";
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurando o body-parser para lidar com requisições POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define o EJS como o motor de visualização com delimitadores personalizados
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Configura o sistema para não manter nenhum cache
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Expires', '0');
  next();
});


// TESTAR ISSO AMANHA CARA LINDA

/* // Middleware para manipulação de cache após o logout
app.use((req, res, next) => {
  // Verificar se o usuário está autenticado
  const isAuthenticated = req.session && req.session.userId;

  // Configurar cabeçalhos de cache com base no estado de autenticação
  if (isAuthenticated) {
    res.header('Cache-Control', 'private, no-store, no-cache, must-revalidate');
    res.header('Expires', '-1');
  } else {
    res.header('Cache-Control', 'public, max-age=0');
    res.header('Expires', '0');
  }

  next();
}); */
export default app;