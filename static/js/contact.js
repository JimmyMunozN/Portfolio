import { componentAnimation } from "./animation.js";

export function contactStart() {
    componentAnimation('.contactMethods', '0', '-25rem');
    setupContactForm();
    copyContent();
    setupFlashMessagesTimeout();
}

function copyContent() {
    const copyElement = document.getElementById('emailToCopy');
    const messageElement = document.getElementById('copyMessage');
            
    if (copyElement) {
        copyElement.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy-text') || this.innerText.trim();

            try {
                const tempInput = document.createElement('textarea');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);

                messageElement.textContent = '¡Copiado!';
                messageElement.classList.add('show');
                            
                setTimeout(() => {
                    messageElement.classList.remove('show');
                    messageElement.textContent = '';
                }, 2000);

            } catch (err) {
                console.error('Error al copiar el texto: ', err);
                messageElement.textContent = 'Fallo al copiar.';
                messageElement.classList.add('show');
                setTimeout(() => {
                    messageElement.classList.remove('show');
                    messageElement.textContent = '';
                }, 2000);
            }
        });
    }
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const buttonContent = document.getElementById('buttonContent');

    if (!form) {
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        
        submitButton.disabled = true;
        const originalText = buttonContent.textContent;
        buttonContent.textContent = 'Enviando...';

        const formData = new FormData(form);

        try {
            const response = await fetch('/contacto', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.status}`);
            }

            const newHtmlContent = await response.text();
            
            const contentDiv = document.getElementById('content');
            const newContentDiv = contentDiv.querySelector('.newContent');

            newContentDiv.innerHTML = newHtmlContent;

            const contactSection = document.getElementById('contactPage');
            const contactMethods = document.getElementById('contactContent');

            contactSection.style.transform = 'scale(1)';
            contactMethods.style.transform = 'scale(1)';

            setupFlashMessagesTimeout();

            setupContactForm(); 

        } catch (error) {
            console.error("Fallo al enviar el formulario:", error);
            alert("Error de conexión. Por favor, revisa la consola para más detalles.");
            
        } finally {
            buttonContent.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

function setupFlashMessagesTimeout() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.classList.add('hidden');
            
            setTimeout(() => {
                if (message.parentElement) {
                    message.remove();
                }
            }, 500);
        }, 5000);
    });
}