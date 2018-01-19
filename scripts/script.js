function add(num1, num2) {
    return +num1 + +num2;
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
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == '-') {
        return subtract(num1, num2);
    } else if (operator == '*') {
        return multiply(num1, num2);
    } else if (operator == '/') {
        return divide(num1, num2);
    }
}

let calc = [0];
let operation = [];
let inOperation = false;
let equals = false;
let display = document.querySelector('#display');
let displayText = display.querySelector('#main');
let operateText = display.querySelector('#operator');
displayText.textContent = calc.join('');

let container = document.querySelector('#container');
let button = container.querySelectorAll('button');
let numExp = /[\d.]/;
let operateExp = /[-+*\/=]/;

function calculate(button) {
    if(numExp.test(button) == true) {
        if (equals == true) {
            calc = [0];
            equals = false;
        }
        
        if (calc.length < 14) {
            if (calc.includes('.') == true && button == '.') {
                return;
            }

            if (calc[0] == 0) {
                if(button == '.' || calc[1] == '.') {
                    calc.push(button);
                    displayText.innerText = calc.join('');
                } else {
                calc.push(button);
                calc.shift();
                displayText.innerText = calc.join('');
                }
            } else {
                calc.push(button);
                displayText.innerText = calc.join('');
            }
        }
    }

    if (operateExp.test(button) == true) {
        if (button == '=') {
            if (typeof calc === 'object') {
                calc = calc.join('');
            }
            operation.push(calc);
            let num = operate(operation[0], operation[1], operation[2]);
            operation = [];
            if (num == undefined) {
                return;
            }
            num = num.toString();
            if (num.length >= 14) {
                num = Number(num) .toPrecision(7);
            } 
            calc = num.split('');
            displayText.innerText = num;
            operateText.innerText = '0';
            inOperation = false;
            equals = true;
            return;
        }
        
        if (inOperation == false) {
            calc = calc.join('');
            operation.push(calc);
            operation.push(button);
            operateText.innerText = operation.join(' ');
            calc = [];
            inOperation = true;
        } else if (inOperation = true) {
            calc = calc.join('');
            operation.push(calc);
            let num = operate(operation[0], operation[1], operation[2]);
            operation = [];
            operation.push(num);
            operation.push(button);
            operateText.innerText = operation.join(' ');
            calc = [];
        }
    }

    if (button == 'clear') {
        operation = [];
        operateText.textContent = '0';
        calc = [0];
        displayText.textContent = calc.join('');
        if (inOperation == true) {
            inOperation = false;
        }
    }

    if (button == 'back') {
        calc.pop();
        if (calc.length < 1) {
            calc = [0];
        }

        if (equals == true) {
            calc = [0];
            equals = false;
        }
        displayText.textContent = calc.join('');
    }
}

button.forEach(calcKey => {
    calcKey.addEventListener('click', function(e) {
        calculate(e.target.getAttribute('data-button'));
        console.log(e.target.getAttribute('data-button'));
    });    
});

window.addEventListener('keydown', function(e) {
    let keyPress = String(e.keyCode);
   
    if (e.shiftKey && keyPress == '56') {
        calculate('*');
        return;
    }

    if (e.shiftKey && keyPress == '187') {
        calculate('+');
        return;
    }

    button.forEach(calcKey => {
        let key = calcKey.getAttribute('data-key');

        if (key && key.split(' ').includes(keyPress)) {
            calculate(calcKey.getAttribute('data-button'));
        }
    });
});
