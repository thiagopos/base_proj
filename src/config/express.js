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

export default app;