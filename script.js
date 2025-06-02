let display = document.getElementById('result');
let currentInput = '';
let previousInput = '';
let operation = null;

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === '' && previousInput === '') return;
    
    if (currentInput === '') {
        operation = operator;
        updateDisplay();
        return;
    }
    if (previousInput !== '') {
        calculate();
    }
    
    operation = operator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    if (currentInput === '' || previousInput === '' || !operation) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Tidak bisa membagi dengan nol!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    if (previousInput && operation) {
        display.value = previousInput + ' ' + operation + ' ' + (currentInput || '');
    } else {
        display.value = currentInput || '0';
    }
}

function backspace() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
    } else if (operation !== null) {
        operation = null;
        currentInput = previousInput;
        previousInput = '';
    }
    updateDisplay();
}
