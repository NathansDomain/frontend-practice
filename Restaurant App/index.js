import { menuArray } from './data.js'

const menu = document.querySelector('.menu')
const cart = document.querySelector('.cart')
const total = document.querySelector('.total')
const backdrop = document.querySelector('.backdrop')
const checkoutMsg = document.querySelector('.checkout-msg')
const payForm = document.getElementById('pay-form')

let order = JSON.parse(localStorage.getItem("order")) || []
main()


//Event listeners, uses event delegation and event bubbling
document.addEventListener('submit', function(e) {
    // 1. Overwrite the default action
    e.preventDefault();
    if(e.target === payForm)
    {
        console.log("Form submission intercepted!");
        const formData = new FormData(e.target);
        payForm.reset()
        order = []
        renderCartUI()
        
        backdrop.classList.add('hidden')
        renderCheckoutMsgUI(formData)
    }
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    
    let wasChanged = false
    const action = btn.dataset.action;

    if(action === 'clear')
    {
        order = []
        wasChanged = true
    }
    else if(action === 'checkout')
    {
        payModal()
    }
    else if(action === 'close-modal')
    {
        backdrop.classList.add('hidden')
    }
    else if(action === 'add' || action === 'rmv')
    {
        menuBtns(btn)
        wasChanged = true
    }
    if(wasChanged)
    {
        renderCartUI()
    }
})

function main() {
    updateUI()
}

// Rendering logic
function updateUI() {
    renderMenuUI()
    renderCartUI()
}

function renderCheckoutMsgUI(data)
{
    const msg = document.createElement('h1')
    msg.classList.add('checkout-text')
    msg.classList.add('forest-green-text')
    msg.textContent = `Thanks, ${data.get('name')}! Your order is on its way!`
    checkoutMsg.append(msg)
    checkoutMsg.classList.remove('hidden')
    
    setTimeout( () => {
        checkoutMsg.classList.add('hidden')
        checkoutMsg.innerHTML=""
        }, 5000)
    
}

function renderMenuUI()
{
    menu.innerHTML = renderMenu()
}

function renderCartUI() {
    saveOrder()

    const html = cart.querySelector(".cart-items")
    if(order.length > 0)
    {
        cart.classList.remove('hidden')
        html.innerHTML = renderCart();
        total.textContent = `Total: $${order.reduce((total, {price, quantity}) =>total + price*quantity, 0)}`
    }
    else
    {
        cart.classList.add('hidden')
        html.innerHTML = ''
        total.textContent = ''
    }
}


// Helper functions, called by other functions driving logic
function saveOrder() {
    localStorage.setItem("order", JSON.stringify(order))
}

function payModal() {
    backdrop.classList.remove('hidden')
}

//Logic for handling button interaction with food items in the menu
function menuBtns(btn) {
    const foodItem = menuArray.find(item => item.id === Number(btn.dataset.id))
    const existingItem = order.find(item => item.id === foodItem.id)
    
    if(btn.dataset.action === 'add')
    {
        if(existingItem)
        {
            existingItem.quantity++
        }
        else
        {
            order.push({...foodItem, quantity:1})
        }        
    }
    else if(btn.dataset.action === 'rmv')
    {
        if(existingItem)
        {
            existingItem.quantity--;
            if(existingItem.quantity <= 0)
            {
                order = order.filter(item => item.id !== existingItem.id)
            }   
        }
    }
}

//Generate formated html for rerendering one state has changed
function renderMenu() {
    return menuArray.map(({name, ingredients, id, price, emoji}) => 
    `
        <article class="food-card underline">
            <p class="emoji large-text">${emoji}</p>
            <div class="food-text">
                <h3 class="medium-text dark-text">${name}</h3>
                <p class="small-text lightgray-text">${ingredients.join(', ')}</p>
                <p class="medium-text dark-text">$${price}</p>
            </div>
            <button class="add-btn round-style small-text small-container" data-id="${id}" data-action="add" aria-label="Add ${name} to order">+</button>
            <button class="rmv-btn round-style small-text small-container" data-id="${id}" data-action="rmv"  aria-label="Remove ${name} from order">-</button>
        </article>
    `).join('')
}

function renderCart() {

    return order.map(({id, name, quantity}) => `<li class="cart-itm small-text lightgray-text" data-id="${id}">${quantity}${name}</li>`).join('')
}
