
let text = document.createTextNode('Мы продаем только подлинную технику Apple'),
    menu = document.getElementsByClassName('menu')[0],
    menuItem = document.getElementsByClassName('menu-item'),
    adv = document.getElementsByClassName('adv')[0],
    relation = document.querySelector('#prompt'),
    menuItemLi = document.createElement('li');


menu.insertBefore(menuItem[2], menuItem[1]);

menuItemLi.classList.add('menu-item');
menuItemLi.textContent = 'Пятый элемент';
menu.appendChild(menuItemLi);


document.body.style.background = 'url(img/apple_true.jpg)';

document.getElementById("title").innerHTML = 'Мы продаем только подлинную технику Apple';

adv.remove();

let relationShip = prompt('Ваше отношение к технике Apple?');
relation.textContent = relationShip;