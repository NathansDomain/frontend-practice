import { menuArray } from './data.js'

const menu = document.querySelector('.menu')
const cart = document.querySelector('.cart')
const total = document.querySelector('.total')
const backdrop = document.querySelector('.backdrop')
const checkoutMsg = document.querySelector('.checkout-msg')
const payForm = document.getElementById('pay-form')

let order = []

document.addEventListener('submit', function(e) {
    // 1. Overwrite the default action
    e.preventDefault();
    if(e.target.id === payForm.id)
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
    
    const action = btn.dataset.action;
    if(action === 'clear')
    {
        order = []
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
    }
    
    if(order.length === 0)
    {
        cart.classList.add('hidden')
    }
})

function menuBtns(btn) {
    const foodItem = menuArray.find(item => item.id === Number(btn.dataset.id))
    const exisitingItem = order.find(item => item.id === foodItem.id)
    
    if(btn.dataset.action === 'add')
    {
        if(exisitingItem)
        {
            exisitingItem.quantity++
        }
        else
        {
            order.push({...foodItem, quantity:1})
            cart.classList.remove('hidden')
        }
        renderCartUI()
        
    }
    else if(btn.dataset.action === 'rmv')
    {
        const foodIndex = order.findIndex(foodItem => foodItem.id === Number(btn.dataset.id))
        if(foodIndex !== -1)
        {
            exisitingItem.quantity--;
            if(exisitingItem.quantity === 0)
            {
                order.splice(foodIndex, 1)
            }
            renderCartUI()
            
        }
    }
}

function payModal() {
    backdrop.classList.remove('hidden')
}

function main() {
    
    renderMenuUI()
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

function renderCartUI() {
    cart.querySelector(".cart-items").innerHTML = renderCart()
    total.textContent = `Total: $${order.reduce((total, {price, quantity}) =>total + price*quantity, 0)}`
}
main()