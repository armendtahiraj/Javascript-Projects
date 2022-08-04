class Calculator{
    constructor(previousTextElement, currentTextElement){
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operationButton = undefined;
    };

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    compute(){
        let result;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)){
            return
        }
        switch (this.operation) {
            case '+':
                result = prev + current
                break;
            case '-':
                result = prev - current
                break;
            case '*':
                result = prev * current
                break;
            case '/':
                result = prev / current
                break;
            default:
                return;
        }

        this.currentOperand = result
        this.operationButton = undefined
        this.previousOperand = ''; 

    }
    choseOperation(operation){
        if(this.currentOperand === '')
            { 
                return 
            }else if (this.currentOperand !== '')
            {
                this.compute()
            }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay(){
        this.currentTextElement.innerText = this.currentOperand;
        this.previousTextElement.innerText = this.previousOperand;
    }
    
}

const numbersButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const resultButton = document.querySelector('[data-result]')
const previousTextElement = document.querySelector('[data-previous-operand]')
const currentTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousTextElement, currentTextElement)

numbersButton.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButton.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.choseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

resultButton.addEventListener('click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete()
    calculator.updateDisplay()
})