// Get all inputs and textarea
var inputs = document.querySelectorAll('.contactForm input:not([type=submit]), .contactForm textArea');

// Remove error messages on user new input
inputs.forEach(function(element) {
    element.addEventListener('input', function(event) {
        cleanErrors(element);
    });
}, false);

// Verify validation on form submit
var form = document.querySelector('.contactForm');
form.addEventListener('submit', function(event) {
    inputs.forEach(function(element) {
        if(!element.validity.valid) {
            element.parentNode.insertBefore(getErrorElement(element.validationMessage), element);
            event.preventDefault();
        }
    });
}, false);

// Clean a error message from a element
function cleanErrors(element) {
    if(element.parentNode.querySelector('.error') != null)
        element.parentNode.removeChild(element.parentNode.querySelector('.error'));
}

// Return a default error DOMElement with a custom message
function getErrorElement(message) {
    var errorMessage = document.createElement('span');
        errorMessage.classList.add('error');
        errorMessage.appendChild(document.createTextNode(message));

    return errorMessage;
}