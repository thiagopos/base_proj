import * as yup from 'yup';

export const usuarioSchema = yup.object({
  login_sms: yup.string().nullable().max(7),
  nome_completo: yup.string().nullable().max(100),
  doc_cpf: yup.string().nullable().max(14),
  senha: yup.string().nullable().max(100),
  senha_resete: yup.string().nullable().max(100),
  email: yup.string().nullable().email().max(100),
  contato: yup.string().nullable().max(15),
  doc_profissional: yup.string().nullable().max(15),
  dt_cadastro: yup.date().nullable(),
  dt_atualizacao: yup.date().nullable(),
  id_tipo_usuario: yup.number().nullable(),
  id_tipo_cargo: yup.number().nullable(),
});
