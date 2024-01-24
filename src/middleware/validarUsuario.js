import { obterUsuarioPorLogin } from '../models/queries/consultasAutenticacao.js';

export default async function validarUsuario(usuario) {  
  
    try {     
      if(!usuario) return false;
      
      const usuarioValidado = await obterUsuarioPorLogin(usuario.login_sms);  

      if (!usuarioValidado)
        return false;

      return true;
      
    } catch (error) {
      console.log(error);
    }  
}