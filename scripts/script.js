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

function operate(num1, operator, num2) {

}

let calc = [0];
let display = document.querySelector('#display');
let displayText = display.querySelector('p');
displayText.textContent = calc.join('');

let container = document.querySelector('#container');
let button = container.querySelectorAll('button');
let numExp = /[\d.]/;
let operateExp = /[-+*\/=]/;
button.forEach(calcKey => {
    calcKey.addEventListener('click', function(e) {
        if(numExp.test(e.target.getAttribute('data-key')) == true) {
            if (calc.length < 14) {
                if (calc.includes('.') == true && e.target.getAttribute('data-key') == '.') {
                    return;
                }

                if (calc[0] == 0) {
                    if(e.target.getAttribute('data-key') == '.' || calc[1] == '.') {
                        calc.push(e.target.getAttribute('data-key'));
                        displayText.innerText = calc.join('');
                    } else {
                    calc.push(e.target.getAttribute('data-key'));
                    calc.shift();
                    displayText.innerText = calc.join('');
                    }
                } else {
                    calc.push(e.target.getAttribute('data-key'));
                    displayText.innerText = calc.join('');
                }
            }
        }

        if (operateExp.test(e.target.getAttribute('data-key')) == true) {
            
        }
    });    
});
