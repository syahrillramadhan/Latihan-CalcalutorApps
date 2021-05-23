class Calculator {
  constructor(firstdisplayTextElement, currentdisplayTextElement) {
    this.previousdisplayTextElement = firstdisplayTextElement;
    this.currentdisplayTextElement = currentdisplayTextElement;
    this.clear();
  }

  clear() {
    this.currentDisplay = '';
    this.previousDisplay = '';
    this.operator = undefined;
  }

  delete() {
    this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === '.' && this.currentDisplay.includes('.')) return;
    this.currentDisplay = this.currentDisplay.toString() + number.toString();
  }
  chooseOperator(operator) {
    if (this.currentDisplay === '') return;
    if (this.previousDisplay !== '') {
      this.compute();
    }
    this.operator = operator;
    this.previousDisplay = this.currentDisplay;
    this.currentDisplay = '';
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousDisplay);
    const current = parseFloat(this.currentDisplay);
    if (isNaN(prev) || isNaN(current)) return;
    if (this.operator === '+') {
      computation = prev + current;
    } else if (this.operator === '-') {
      computation = prev - current;
    } else if (this.operator === '*') {
      computation = prev * current;
    } else if (this.operator === '÷') {
      computation = prev / current;
    } else {
      return;
    }
    this.currentDisplay = computation;
    this.operator = undefined;
    this.previousDisplay = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentdisplayTextElement.innerText = this.getDisplayNumber(
      this.currentDisplay,
    );
    if (this.operator != null) {
      this.previousdisplayTextElement.innerText = `${this.getDisplayNumber(
        this.previousDisplay,
      )} ${this.operator}`;
    } else {
      this.previousdisplayTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const allclearButton = document.querySelector('.btn-all-clear');
const deleteButton = document.querySelector('.btn-delete');
const equalsButton = document.querySelector('.btn-equals');
const previousdisplayTextElement = document.querySelector('.previous-display');
const currentdisplayTextElement = document.querySelector('.current-display');

const calculator = new Calculator(
  previousdisplayTextElement,
  currentdisplayTextElement,
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allclearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
