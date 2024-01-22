"use strict";

const project = document.getElementById("project").value,
              calculate = document.getElementById('startCalculate'),
              root = document.getElementById('root');

function calcOutflowSalary(tarifvalue, bonusvalue) {
    const hours = parseFloat((document.querySelector('.hours').value).replace(',', '.')),
        conversion = parseFloat((document.querySelector('.conversion').value).replace(',', '.')),
        interval = parseFloat((document.querySelector('.interval').value).replace(',', '.')),
        quality = parseFloat((document.querySelector('.quality').value).replace(',', '.'));            
    let tarif = tarifvalue;
    const bet = tarif * hours;
    let bonus = bonusvalue;
    const conv = parseFloat((document.querySelector('.conversionPlan').value).replace(',', '.'));
    const qual = parseFloat((document.querySelector('.qualityPlan').value).replace(',', '.'));
    const inter = parseFloat((document.querySelector('.intervalPlan').value).replace(',', '.'));
    let marker = 0.0;
    const planPercent = hours/parseFloat((document.querySelector('.hoursPlan').value).replace(',', '.'));
    if(hours && conversion && interval && quality){
        if (conversion / conv < 0.8) {
            marker += 0;
        } else {
            switch (true) {
                case conversion / conv <= 0.89:
                    marker += 0.4;
                    break;
                case conversion / conv <= 0.94:
                    marker += 0.8;
                    break;
                case conversion / conv <= 0.99:
                    marker += 1.2;
                    break;
                case conversion / conv <= 1.24:
                    marker += 1.4;
                    break;
                default:
                    marker += 2.0;
            }
        }

        if (quality / qual < 0.5) {
            marker += 0;
        } else {
            switch (true) {
                case quality / qual <= 0.74:
                    marker += 0.4;
                    break;
                case quality / qual <= 0.79:
                    marker += 0.8;
                    break;
                case quality / qual <= 0.89:
                    marker += 1.2;
                    break;
                case quality / qual < 1:
                    marker += 1.6;
                    break;
                default:
                    marker += 2.0;
            }
        }
        if (interval / inter <= 0.5) {
            marker += 1;
        } else {
            switch(true) {
                case interval / inter <= 0.6:
                    marker += 0.8;
                    break;
                case interval / inter <= 0.7:
                    marker += 0.6;
                    break;
                case interval / inter <= 0.8:
                    marker += 0.4;
                    break;
                case interval / inter <= 1:
                    marker += 0.2;
                    break;
                default:
                    marker += 0;
            }
        }

        bonus = (bonus * planPercent / 5 * marker) > bonus ? bonus : (bonus * planPercent / 5 * marker) ;
        const salary = bet + bonus;
        document.getElementById('root').textContent = ` ${salary.toFixed(2)} р.`
    }
}

function pmpOrRf() {
    const toogler = document.querySelector('.switch-btn');    

    const calcOutflowSalaryHandler = () => {
        const rate = toogler.classList.contains('switch-on') ? 136.9 : 14.88;
        const amount = toogler.classList.contains('switch-on') ? 7000 : 2500;
        calcOutflowSalary(rate, amount);
    };

    calculate.addEventListener('click', calcOutflowSalaryHandler);

    toogler.addEventListener('click', () => {
        toogler.classList.toggle('switch-on');
        calcOutflowSalaryHandler();
    });
}

pmpOrRf();