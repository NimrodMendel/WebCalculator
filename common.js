let result = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector('.calculator-screen');

function init() {
    document.querySelector('.calculator-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });
}

function buttonClick(val) {

    if (isNaN(val)) {
        handleSymbol(val);
    } else
        handleNumber(val);

    screen.innerText = buffer;
}

function handleNumber(val) {
    if (buffer === "0") {
        buffer = val;
    } else {
        buffer += val;
    }
}

function handleSymbol(symbol) {

    switch (symbol) {
        case 'C':
            buffer = '0';
            result = 0;
            break;
        case '+':
        case '÷':
        case '−':
        case '×':
            handleMath(symbol);
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = result;
            result = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substr(0, buffer.length - 1);
            }
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intNum = parseInt(buffer);

    if (result === 0) {
        result = intNum;
    } else {
        flushOperation(intNum);
    }

    previousOperator = symbol;

    buffer = '0';

}

function flushOperation(intNum) {
    if (previousOperator === '+') {
        result += intNum;
    } else if (previousOperator === '−') {
        result -= intNum;
    } else if (previousOperator === '÷') {
        result /= intNum;
    } else {
        result *= intNum;
    }
}

init();