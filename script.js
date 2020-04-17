'use strict';

let money = prompt('Ваш бюджет на месяц?', '');
let time = +prompt('Введите дату в формате YYYY-MM-DD', '');

	let askOne = prompt('Введите обязательную статью расходов в этом месяце', ''),
		askSecond = prompt('Во сколько обойдется?', ''),
		askThree = prompt('Введите обязательную статью расходов в этом месяце', ''),
		askFourth = prompt('Во сколько обойдется?', '');


	let appData = {
		budget: money,
		timeData: time,
		expenses: {askOne, askSecond, askThree, askFourth},
		optionalExpenses: {},
		income: [],
		savings: false
	}

alert(appData.budget / 30);
console.log(appData);