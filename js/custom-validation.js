var form = document.querySelector('.contactForm');
var inputs = document.querySelectorAll('.contactForm input:not([type=submit]), .contactForm textArea');
var button = document.querySelector('.contactForm button');

// Make the form sending with Ajax
button.addEventListener('click', function(event) {

    removeSubmitErrors();

    var inputsProcessed = 0;
    var isValid = true;

    inputs.forEach(function(element) {
        if(!element.validity.valid) {
            removeInputErrors(element);
            element.parentNode.insertBefore(getMessageElement(element.validationMessage, 'error'), element);
            isValid = false;
        }

        inputsProcessed++;
        if(inputsProcessed === inputs.length) {
            if(isValid) {
                aja()
                .method('POST')
                .url('https://formspree.io/contato@aquacoding.com.br')
                .data(getFormJson())
                .type('json')
                .on('200', function(response){
                    form.insertBefore(getMessageElement('Obrigado por entrar em contato! Iremos responder o mais rápido possível.', 'success'), button);
                })
                .on('40x', function(response){
                    form.insertBefore(getMessageElement('Ocorreu um erro, por favor tente novamente.', 'error'), button);
                })
                .on('500', function(response){
                    form.insertBefore(getMessageElement('Ocorreu um erro, por favor tente novamente.', 'error'), button);
                })
                .go();
            }
        }
    });
}, false);

// Prevent the default form submit
var form = document.querySelector('.contactForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
}, false);

// Remove a error message from a element
function removeInputErrors(element) {
    if(element.parentNode.querySelector('.error') != null)
        element.parentNode.removeChild(element.parentNode.querySelector('.error'));
}

// Remove a submite error
function removeSubmitErrors() {
    var messages = form.querySelectorAll('.success, .error')
    if(messages != null) {
        messages.forEach(function(element) {
            element.parentNode.removeChild(element);
        });
    }
}

// Return a default message DOMElement with a custom message and class
function getMessageElement(message, className) {
    var errorMessage = document.createElement('span');
        errorMessage.classList.add(className);
        errorMessage.appendChild(document.createTextNode(message));

    return errorMessage;
}

// Build the form json
function getFormJson() {
    var json = {};
    inputs.forEach(function(element) {
        json[element.name] = element.value;
    })
    return json;
}