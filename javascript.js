const results = document.querySelector('#results');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const prevCalcs = document.querySelector('#prevCalcs');
const equal = document.querySelector('.equal');
const del = document.querySelector('#delete');
const ac = document.querySelector('#ac');
const dot = document.querySelector('.dot');
const keys = document.querySelectorAll('.key');

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function operate(operator, a, b) {
    return operator==='+' ? add(Number(a), Number(b)) : operator==='-' ? substract(a, b) : operator==='/' ? divide(a, b) : operator==='*' ? multiply(a, b) : 'Please enter + | - | / | * |';
}

function calculate(string) {
    let store;
    let answer;
    if (string.includes('+')) {
        store = string.split('+');
        answer = operate('+', store[0], store[1]);
    }

    if (string.includes('-')) {
        store = string.split('-');
        answer = operate('-', store[0], store[1]);
    }

    if (string.includes('x')) {
        store = string.split('x');
        answer = operate('*', store[0], store[1]);
    }

    if (string.includes('/')) {
        store = string.split('/');
        answer = operate('/', store[0], store[1]);
    }
    return answer;
}

function keyPress(e) {
    const button = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (button) {button.click();}
}
window.addEventListener('keydown', keyPress);

results.textContent = '';
numberButtons.forEach(numberButton => numberButton.addEventListener('click', () => {
    results.textContent+=numberButton.textContent
}));

operators.forEach(operator => operator.addEventListener('click', () => {
    if (prevCalcs.textContent === '') {
        prevCalcs.textContent = results.textContent + operator.textContent;
        results.textContent = '';
    }
    else if (prevCalcs.textContent != '' && results.textContent != '') {
        results.textContent = Math.round(calculate(prevCalcs.textContent + results.textContent) * 100) / 100;
        if (results.textContent==='Infinity') {alert('You cannot divide by 0.'); results.textContent='';}
        else {prevCalcs.textContent = results.textContent + operator.textContent; results.textContent = '';}
    }
}));

equal.addEventListener('click', () => {
    if (prevCalcs.textContent !== '' && results.textContent !== '') {
        results.textContent = Math.round(calculate(prevCalcs.textContent + results.textContent) * 100) / 100;
        if (results.textContent==='Infinity') {alert('You cannot divide by 0.'); results.textContent=''}
        prevCalcs.textContent = '';
    }
});

del.addEventListener('click', () => results.textContent = results.textContent.slice(0, -1));
ac.addEventListener('click', () => {results.textContent = ''; prevCalcs.textContent = '';});
dot.addEventListener('click', () => !results.textContent.includes('.') ? results.textContent+= '.' : 0);