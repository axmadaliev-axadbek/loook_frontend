const clientId = document.querySelector('#clientId')
const userForm = document.querySelector('#userForm')
const foodsForm = document.querySelector('#foodsForm')
const foodsCount = document.querySelector('#foodsCount')
const userHeader = document.querySelector('#userHeader')
const ordersList = document.querySelector('.orders-list')
const foodsSelect = document.querySelector('#foodsSelect')
const usernameInput = document.querySelector('#usernameInput')
const customersList = document.querySelector('.customers-list')
const telephoneInput = document.querySelector('#telephoneInput')


let API = 'https://loookbackend.herokuapp.com'

async function renderOrders (userId) {

	ordersList.innerHTML = null
	
	let res = await fetch(API + "/orders?userId=" + userId)
	res =  await res.json()
	let orders = res
	for(let order of orders) {
		const [ li, img, div, count, name ] = createElements('li', 'img', 'div', 'span', 'span')
		const food = order.foods
		
		count.textContent = order.count
		name.textContent = food.foodName

		li.classList.add('order-item')
		name.classList.add('order-name')
		count.classList.add('order-count')

		img.src = food.foodImg
		
		div.append(name, count)
		li.append(img, div)
		ordersList.append(li)
	}
}

async function renderUsers () {
	
	customersList.innerHTML = null
	let res  = await fetch(API + '/users')
	let users =  await res.json() ;

	for(let user of users) {
		const [ li, span, a ] = createElements('li', 'span', 'a')

		span.textContent = user.username
		a.textContent = '+' + user.contact

		span.classList.add('customer-name')
		li.classList.add('customer-item')
		a.classList.add('customer-phone')

		a.setAttribute('href', 'tel:+' + user.contact)

		li.append(span, a)
		customersList.append(li)

		li.onclick = async () => {
			const filteredOrders = orders.filter(el => el.userId == user.userId)
			
			clientId.textContent = user.userId
			userHeader.textContent = user.username
			renderOrders(clientId.textContent )
		
		}
	}
}

async function renderFoods () {
	let foods = await fetch(API + "/foods")
	foods =  await foods.json() ;
	for(let food of foods) {
		const [ option ] = createElements('option')
		option.textContent = food.foodName
		option.value = food.foodId

		foodsSelect.append(option)
	}
}



 userForm.onsubmit = async (event) => {
	event.preventDefault()
	const username = usernameInput.value.trim()
	const contact = telephoneInput.value.trim()

	if(!(username.length < 30 && username.length)) {
		return alert('Wrong username')
	}
	if(!(/^998[389][012345789][0-9]{7}$/).test(contact)) {
		return alert('Invalid contact!')
	}
	console.log('users');
	let res = await fetch(API + '/users', {
		method: "POST",    
		body: JSON.stringify({username: username, contact: contact}),
		headers:{ 
			'Content-type': 'application/json'
		}
	})
	console.log(await res.json());
	usernameInput.value = null
	telephoneInput.value = null

	renderUsers()
}

foodsForm.onsubmit = async (event) => {
	event.preventDefault()
	if(!foodsSelect.value) return
	if(!clientId.textContent) return
	if(!foodsCount.value || foodsCount.value > 10) return	
	console.log('ordeeeee');
	let res = await fetch(API + '/orders', {
		method: "POST",
		headers:{ 
			'Content-type': 'application/json'
		},
		body: JSON.stringify({userId: clientId.textContent, foodId: foodsSelect.value,  count: foodsCount.value})
	})
	let data = await res.json();
	console.log(data);

	foodsSelect.value = 1
	foodsCount.value = null

	renderOrders(data.userId)
}

renderFoods()
renderUsers()
renderOrders()

