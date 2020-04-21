'use strict';

let money, time; //объявляем глобально

function start() {
	money = +prompt('Ваш бюджет на месяц?', '');
	time = prompt('Введите дату в формате YYYY-MM-DD', '');

	while(isNaN(money) || money == '' || money == null) { //команда isNan возвращает try в том случае, если у нас туда попадают не цифры
		money = +prompt('Ваш бюджет на месяц?', '');
	}

} 
start();


let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: true,
	chooseExpenses: function() {
		for (let i = 0; i < 2; i++) {
			let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
				b = prompt('Во сколько обойдется?', '');
		
			if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
				&& a != '' && b != '' && a.length < 50) { //проверка, что данные явл-ся строкой, и будет проверять на отмену (Null), т.е. если user нажмет на отмену то действие не выполнится, и чтобы пустой строкой тоже не вводилось
				appData.expenses[a] = b;
			} else {
				i--;
			}
		}
	},
	detectDayBudget: function() {
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		alert('Ваш бюджет на день составляет: ' + appData.moneyPerDay + 'руб.');
	},
	detectLevel: function() {
		if(appData.moneyPerDay < 100) { //выводит уровень достатка
			console.log('минимальный уровень достатка');
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log('средний уровень достатка');
		} else if (appData.moneyPerDay > 2000) {
			console.log('высокий уровень достатка');
		} else {
			console.log('Произошла ошибка');
		}
	},
	checkSavings: function() {
		if (appData.savings == true) {
			let save = +prompt('Какова сумма накоплений?'),
				percent = +prompt('Под какой процент?');
	
				appData.monthIncome = save/100/12*percent;
				alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
		}
	},
	chooseOptExpenses: function() {
		for (let i = 0; i < 3; i++) {
			let questionOptExpenses = prompt('Статья необязательных расходов?');
			appData.optionalExpenses[i] = questionOptExpenses;
			console.log(appData.optionalExpenses);
		}
	},
	chooseIncome: function() {
		let items = prompt('Что принесет дополнительный доход? (Перечислети через запятую)', '');

		if ( typeof(items) != "string" || typeof(items) == null || items == '' ) {
			console.log("Вы ввели некорректные данные или не ввели их вовсе");
		} else {
			appData.income = items.split(', ');
			appData.income.push(prompt('Может что-то еще?'));
			appData.income.sort();
		}
		appData.income.forEach (function (itemmassive, i) {
			alert( "Способы доп заработка: " + (i+1) + ' - ' + itemmassive);
		});
	}
};

for (let key in appData) {
	console.log("Наша программа включает в себя в себя данные: " + key + " - " + appData[key]);
}
