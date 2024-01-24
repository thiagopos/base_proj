//REFATORAR POR COMPLETO ESSA MERDA

import bcrypt from 'bcrypt';
import { inserirUsuario, usuarioExiste, obterCargosUsuario, obterTiposUsuario } from '../models/queries/consultasAutenticacao.js';
import { usuarioSchema } from '../models/schemas/usuarioSchema.js'

export async function get(req,res) {
    const tiposCargos = await obterCargosUsuario();
    const tiposUsuarios = await obterTiposUsuario();
    
    res.render('cadastro.ejs', {tiposUsuarios: tiposUsuarios, tiposCargos: tiposCargos});
}

export async function post(req,res) {
    const usuario = req.body;

    try {
        // Validar os dados do usuário
        await usuarioSchema.validate(usuario);

        // Verificar se o usuário já existe no banco de dados
        const userExists = await checkUserExists(usuario.login_sms);

        if (userExists) {
            // Usuário já existe, redirecione para uma página de erro ou trate conforme necessário
            res.redirect('/error');
            return;
        }

        // Hash da senha antes de salvar no banco de dados
        const hash = await bcrypt.hash(usuario.senha, 10);
        
        usuario.senha = hash;
        // Insere o usuário no banco de dados
        const userId = await inserirUsuario(usuario);        
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
    const exists = await usuarioExiste(login);
    return exists;
}