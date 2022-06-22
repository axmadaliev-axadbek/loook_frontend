let users = window.localStorage.getItem('users')
let foods = window.localStorage.getItem('foods')
let orders = window.localStorage.getItem('orders')

users = JSON.parse(users) || [
	{ userId: 1, username: 'sobir', contact: '998941049914' },
	{ userId: 2, username: 'rahim', contact: '998941049914' },
	{ userId: 3, username: 'ilhom', contact: '998941049914' },
]

foods = JSON.parse(foods) || [
	{ foodId: 1, foodName: 'Cola', foodImg: './img/cola.jpeg' },
	{ foodId: 2, foodName: 'Spinner', foodImg: './img/spinner.jpeg' },
	{ foodId: 3, foodName: 'Chiken Wings', foodImg: './img/chicken_wings.jpeg' },
	{ foodId: 4, foodName: 'Burger Cheese', foodImg: './img/burger_cheese.jpeg' },
	{ foodId: 5, foodName: 'Chicken Togora', foodImg: './img/chicken_togora.jpeg' },
	{ foodId: 6, foodName: 'Combo', foodImg: './img/combo.jpeg' },
	{ foodId: 7, foodName: 'Fanta', foodImg: './img/fanta.jpeg' },
]

orders = JSON.parse(orders) || [
	{ userId: 1, foodId: 2, count: 1 },
	{ userId: 1, foodId: 1, count: 1 },
	{ userId: 1, foodId: 6, count: 2 },
	{ userId: 3, foodId: 5, count: 1 },
]
