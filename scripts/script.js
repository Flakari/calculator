function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

let container = document.querySelector('#container');
let button = container.querySelectorAll('button');
button.forEach(calcKey => {
    calcKey.addEventListener('click', function(e) {
        console.log(e.target.getAttribute('data-key'));
    });    
});
