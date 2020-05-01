'use strict';

let startBtn = document.getElementById('start'),

    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName("button")[0],
    optionalExpensesBtn = document.getElementsByTagName("button")[1],
    countBtn = document.getElementsByTagName("button")[2],
    optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');


let money, time; //объявляем глобально

//отключаем кнопки
expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

//при нажатии на startBtn происходит функция
startBtn.addEventListener('click', () => {
	time = prompt('Введите дату в формате YYYY-MM-DD', ''); //спрашивает про время
	money = +prompt('Ваш бюджет на месяц?', ''); //спрашивает бюджет на месяц

	while(isNaN(money) || money == '' || money == null) { //команда isNan возвращает try в том случае, если у нас туда попадают не цифры
		money = prompt('Ваш бюджет на месяц?', '');
	}  //чтобы введеные данные были числом, и чтобы не было пустое поле

	appData.budget = money; //записываем в глобальный объект appData
	appData.timeData = time; //  ----//----
	budgetValue.textContent = money.toFixed(); //и затем данные вписываем в budgetValue
	yearValue.value = new Date(Date.parse(time)).getFullYear(); //превращает то что ввел пользователь YYYY-MM-DD в дату
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1; //+1 для того чтобы корректно отображался (т.к. Январь = 0, отчет начинается с 0, а не с 1)
	dayValue.value = new Date(Date.parse(time)).getDate();

	expensesBtn.disabled = false;
	optionalExpensesBtn.disabled = false;
	countBtn.disabled = false;
});

expensesBtn.addEventListener('click', () => { //при клике на кнопку у нас запускается функция
	let sum = 0; //собирает все ценники которые ввел наш пользователь

	for (let i = 0; i < expensesItem.length; i++) { //expensesItem - переменная где лежит каждый input. length - получим кол-во элементов в этом псевдомассиве
		let a = expensesItem[i].value, //value - для того чтобы получать какие данные вводит пользователь
			b = expensesItem[++i].value;
	
		if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
			&& a != '' && b != '' && a.length < 50) { //проверка, что данные явл-ся строкой, и будет проверять на отмену (Null), т.е. если user нажмет на отмену то действие не выполнится, и чтобы пустой строкой тоже не вводилось
			appData.expenses[a] = b; //записывает новый объект
			sum += +b; //так же собираем сумму всех значений который ввел пользователь
		} else {
			i--;
		}
	}
	expensesValue.textContent = sum; //записывает данные
});

optionalExpensesBtn.addEventListener('click', function() {
	for (let i = 0; i < optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; 
	}
});

//расчет дневного бюджета
countBtn,addEventListener('click', function() {

	if (appData.budget != undefined) {
		appData.moneyPerDay = ( (appData.budget - +expensesValue.textContent) / 30 ).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay;
	
		if(appData.moneyPerDay < 100) { //выводит уровень достатка
			levelValue.textContent = 'минимальный уровень достатка';
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = 'средний уровень достатка';
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = 'высокий уровень достатка';
		} else {
			levelValue.textContent = 'Произошла ошибка';
		}
	} else {
		dayBudgetValue.textContent = 'Произошла ошибка!';
	}
});

incomeItem.addEventListener('input', function() { //если поставить обработчик change вместо input, то при наборе текста он не будет высвечиваться в поле, а высветится только при нажатии
	let items = incomeItem.value;
	appData.income = items.split(', ');
	incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() { //click - событие клика
	if (appData.savings == true) { //мы проверим, если это условие стоит true, то мы его должны выключить
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

sumValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

percentValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false,
};
