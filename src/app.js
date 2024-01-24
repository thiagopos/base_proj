import createRouter from 'express-file-routing';
import { config } from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import app from './config/express.js';
import session from './config/session.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura o caminho do arquivo .env
config({path: path.join(__dirname, '../.env')});

const PORT = process.env.PORT || 3000;

// Configurando o middleware de sessão
app.use(session);

// Configura o express-file-routing
await createRouter(app);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`
  Link de cadastro: http://localhost:${PORT}/cadastro
  Link para login:  http://localhost:${PORT}/login
  Link para API:    http://localhost:${PORT}/api/data
   `);
});