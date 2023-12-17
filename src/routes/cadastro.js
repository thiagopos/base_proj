import bcrypt from 'bcrypt';
import { insertUsuario, userExists } from '../models/queries/authenticationQueries.js'; // Substitua pelo caminho correto
import { object, string, boolean } from 'yup';

// Esquema de validação usando Yup
const usuarioSchema = object({
    login: string().required(),
    senha: string().required(),
    admin: boolean(),
});

export const get = (req,res) => {
    res.render('cadastro.ejs');
}

export const post = async (req, res) => {
    const { login, senha, admin } = req.body;

    try {
        // Objeto do usuário para ser inserido no banco de dados
        const usuario = {
            login,
            senha: senha,
            admin: admin === 'on', // Se o checkbox estiver marcado, consideramos como admin
        };

        // Validar os dados do usuário
        await usuarioSchema.validate(usuario);

        // Verificar se o usuário já existe no banco de dados
        const userExists = await checkUserExists(login);

        if (userExists) {
            // Usuário já existe, redirecione para uma página de erro ou trate conforme necessário
            res.redirect('/error');
            return;
        }

        // Hash da senha antes de salvar no banco de dados
        const hash = await bcrypt.hash(senha, 10);
        
        usuario.senha = hash;
        // Insere o usuário no banco de dados
        const userId = await insertUsuario(usuario);        
        // Se a inserção for bem-sucedida, redirecione para a página de dashboard
        res.redirect('/login');
    } catch (error) {
        // Trate os erros conforme necessário
        console.error(error);
        res.redirect('/error');
    }
};

// Função para verificar se o usuário já existe no banco de dados
async function checkUserExists(login) {
    const exists = await userExists(login);
    return exists;
}