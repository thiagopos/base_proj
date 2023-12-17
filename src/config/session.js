import createRouter from 'express-file-routing';
import session from 'express-session';
import { config } from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({path: path.join(__dirname, '../../.env')});

export default session({
  secret: process.env.SECRET_API, // Chave secreta para assinar a sessão
  resave: false, // Não salvar a sessão a cada requisição
  saveUninitialized: false, // Não salvar sessões não inicializadas
  cookie: { 
    // Configurações do cookie da sessão
    // A sessão expira depois de 10 minutos de inatividade (600000 milissegundos)
    expires: 600000
  }
})