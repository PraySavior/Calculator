import React, { useEffect } from 'react';

const Calculator = () => {

    useEffect(() => {
        document.title = 'Calculator';
      }, []);


    useEffect(() => {
        const numberButtons = document.querySelectorAll('.number');
        const display = document.querySelector('.empt');
        const operations = document.querySelectorAll('.operations');
        const equal = document.querySelector('.equal');
        const procs = document.querySelectorAll('.procs');
        
        let r1 = null;
        let r2 = null;
        let currentOperation = null;

        const handleLenght = () => {
            if (display.innerHTML !== '') {
                const computedStyle = window.getComputedStyle(display);
                let fontSize = computedStyle.getPropertyValue('font-size');
                fontSize = fontSize.split("px")[0];
                fontSize = fontSize - 7;
                display.style.fontSize = `${fontSize}px`;
            }
        };

        const resetFont = () =>{
            display.style.fontSize = '150px'
        }

        const maxInput = () =>{
            if(display.innerHTML.length === 9){
                numberButtons.forEach(button => {
                    button.removeEventListener('click', handleNumberClick);
                });
            }else{
                numberButtons.forEach(button => {
                    button.addEventListener('click', handleNumberClick);
                });
            }
           
        }


        const handleNumberClick = (event) => {
            const value = event.target.innerHTML;
            if(event.target.innerHTML === "." && display.innerHTML.includes('.')){
                if (display.innerHTML === '' && value === '.') {
                    display.innerHTML = '0.';
                } else if (!(display.innerHTML.includes('.') && value === '.')) {
                    display.innerHTML += value;
                    maxInput()
                    if (currentOperation === null) {
                        r1 = parseFloat(display.innerHTML);
                    } else {
                        r2 = parseFloat(display.innerHTML);
                    }
                }
            }else{

                handleLenght()
                if (display.innerHTML === '' && value === '.') {
                    display.innerHTML = '0.';
                } else if (!(display.innerHTML.includes('.') && value === '.')) {
                    display.innerHTML += value;
                    maxInput()
                    if (currentOperation === null) {
                        r1 = parseFloat(display.innerHTML);
                    } else {
                        r2 = parseFloat(display.innerHTML);
                    }
                }
            }
        };

        const handleOperationClick = (event) => {
            currentOperation = event.target.innerHTML;
            display.innerHTML = '';
            maxInput()
            display.style.fontSize = '150px'
        };

        const handleEqualClick = () => {
            let result;
            if (currentOperation === '+') {
                result = r1 + r2;
            } else if (currentOperation === '-') {
                result = r1 - r2;
            } else if (currentOperation === '×') {
                result = r1 * r2;
            } else if (currentOperation === '÷') {
                result = r1 / r2;
            }else if(currentOperation == null){
                result = r1
            }
            let finds = 150 -(String(result).split('').length*7);
            display.innerHTML = result;
            display.style.fontSize = `${finds}px`
            r1 = result;
            r2 = null;
            currentOperation = null;
            maxInput()
        };

        const handleProc = (event) => {
            if (event.target.innerHTML === 'AC') {
                resetFont()
                r1 = null;
                r2 = null;
                currentOperation = null;
                display.innerHTML = '';
            } else if (event.target.innerHTML === '+/-') {
                if (currentOperation === null) {
                    r1 = -r1;
                    display.innerHTML = r1;
                } else {
                    r2 = -r2;
                    display.innerHTML = r2;
                }
            } else if (event.target.innerHTML === '%') {
                if (currentOperation === null) {
                    r1 = r1 / 100;
                    display.innerHTML = r1;
                } else {
                    r2 = r2 / 100;
                    display.innerHTML = r2;
                }
            }
        };

        procs.forEach(proc => {
            proc.addEventListener('click', handleProc);
        });

        numberButtons.forEach(button => {
            button.addEventListener('click', handleNumberClick);
        });

        operations.forEach(button => {
            button.addEventListener('click', handleOperationClick);
        });

        equal.addEventListener('click', handleEqualClick);

        return () => {
            numberButtons.forEach(button => {
                button.removeEventListener('click', handleNumberClick);
            });
            operations.forEach(button => {
                button.removeEventListener('click', handleOperationClick);
            });
            equal.removeEventListener('click', handleEqualClick);
            procs.forEach(proc => {
                proc.removeEventListener('click', handleProc);
            });
        };
    }, []);

    return (
        <div className="calc">
            <div className="empt"></div>
            <div className="nums">
                <div className="proc">
                    <button className="procs">AC</button>
                    <button className="procs">+/-</button>
                    <button className="procs">%</button>
                </div>
                <button className="number">1</button>
                <button className="number">2</button>
                <button className="number">3</button>
                <button className="number">4</button>
                <button className="number">5</button>
                <button className="number">6</button>
                <button className="number">7</button>
                <button className="number">8</button>
                <button className="number">9</button>
                <button className="number">0</button>
                <button className="number">.</button>
            </div>
            <div className="oper">
                <button className="operations">÷</button>
                <button className="operations">×</button>
                <button className="operations">-</button>
                <button className="operations">+</button>
                <button className="equal">=</button>
            </div>
        </div>
    );
};

export default Calculator;
