// Carrega a animação Lottie
const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/95c5c3ce-e09a-4890-ac83-97434fb5e57f/9SXiI7T2C1.json'
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const mainButton = document.querySelector('.download-button');
    const buttonText = document.getElementById('buttonText');
    const languageOptions = document.getElementById('languageOptions');
  
    // Quando o botão principal é clicado e os idiomas não estão visíveis, exibe o menu e altera o texto.
    mainButton.addEventListener('click', function () {
      // Se o container de idiomas ainda não estiver visível:
      if (!languageOptions.classList.contains('show')) {
        languageOptions.classList.add('show');
        buttonText.textContent = 'não clique para não voltar';
      }
      // Se já estiver visível, o clique não fará nada (lembre: "não clique para não voltar")
    });
  
    // Ao passar o mouse sobre o botão principal (quando os idiomas estão visíveis), muda o texto para ":(".
    mainButton.addEventListener('mouseenter', function () {
      if (languageOptions.classList.contains('show')) {
        buttonText.textContent = '☹️';
      }
    });
  
    mainButton.addEventListener('mouseleave', function () {
      if (languageOptions.classList.contains('show')) {
        buttonText.textContent = 'não clique para não voltar';
      }
    });
  
    const optionButtons = document.querySelectorAll('.language-option');
  
    optionButtons.forEach(button => {
      button.dataset.originalText = button.textContent;
  
      button.addEventListener('mouseenter', function () {
        button.textContent = '🥳';
      });
      button.addEventListener('mouseleave', function () {
        button.textContent = button.dataset.originalText;
      });
  
      // Clique no idioma: inicia o download do currículo correspondente
      button.addEventListener('click', function () {
        const lang = button.getAttribute('data-lang');
        // Indica que o download está em andamento
        buttonText.textContent = 'Baixando...';
  
        languageOptions.classList.remove('show');
  

        let filePath = '';
        switch (lang) {
          case 'pt':
            filePath = 'documents/CV.pdf';
            break;
          case 'en':
            filePath = 'documents/CV-en.pdf';
            break;
          case 'es':
            filePath = 'documents/CV-es.pdf';
            break;
          case 'it':
            filePath = 'documents/CV-it.pdf';
            break;
          default:
            filePath = 'documents/CV.pdf';
        }
  
        window.open(filePath, '_blank');
  
        setTimeout(() => {
          buttonText.textContent = 'Clique para selecionar idioma';
        }, 3000);
      });
    });
  });
  