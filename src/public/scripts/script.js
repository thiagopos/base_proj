// Função para atualizar a mensagem usando Fetch API
async function atualizarMensagem() {
  
  try {
    // Realiza um fetch para a API
    const response = await fetch('/api/mensagens');

    // Verifica se a resposta foi bem-sucedida (código 2xx)
    if (response.ok) {
      // Converte a resposta para JSON
      const resultado = await response.json();

      // Atualiza o elemento div com id #mensagem no DOM
      const mensagemElement = document.querySelector('#mensagem');
      
      // Remove todas as classes existentes para evitar conflitos
      mensagemElement.className = '';

      // Verifica se o código de status é 401 e decide se exibir ou não a mensagem
      if (response.status === 401) {
        mensagemElement.style.display = 'none'; // Oculta o elemento
      } else {
        // Adiciona a classe com base no tipo de mensagem
        mensagemElement.classList.add(resultado.tipo);

        // Atualiza o elemento com o texto da mensagem
        mensagemElement.textContent = resultado.texto;
        mensagemElement.style.display = 'block'; // Exibe o elemento
      }
    } else {
      console.error('Erro ao fazer fetch:', response.statusText);
    }
  } catch (error) {
    console.error('Erro durante a execução da função:', error);
  }
}

