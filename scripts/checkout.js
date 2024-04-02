import { calculateCartQuanity, cart, removeFromCart, updateQuantity } from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';




let cartSummaryHtml = '';  

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach(product => {
        if(product.id === productId){
            matchingProduct = product;
        }
    });
     cartSummaryHtml += `
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div> 
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label">
            ${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quanity-input js-quanity-input-${matchingProduct.id}">
          <span class="save-quantity-link js-save-quantity-link" data-product-id="${matchingProduct.id}">save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span> 
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct)}
      </div>
    </div>
  </div>`;
});



function deliveryOptionsHTML(matchingProduct){
  let html = '';

  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCent === 0 
    ? 'FREE' 
    : `$${formatCurrency(deliveryOption.priceCent)}`

    html += `  <div class="delivery-option">
    <input type="radio"
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString } - Shipping
      </div>
    </div>
  </div>`
  });
   return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

function updateCartQuantity() {
  const cartQuantity = calculateCartQuanity();
  document.querySelector('.js-checkout-quantity').innerHTML = cartQuantity;
} 

updateCartQuantity();

document.querySelectorAll('.js-delete-link').forEach((link) =>
{
  link.addEventListener('click', () => {
    const productId = link.dataset.productId
    console.log(productId);
    removeFromCart(productId);
    updateCartQuantity();
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
}
);


document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
  updateLink.addEventListener('click', () => {
    const productId = updateLink.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add("is-editing-quantity");
  });
});


document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
  saveLink.addEventListener('click', () => {
    const productId = saveLink.dataset.productId;
    const quanityElement = document.querySelector(`.js-quanity-input-${productId}`);
    const newQuantity = Number(quanityElement.value);
    updateQuantity(productId, newQuantity);
    document.querySelector('.js-quantity-label').innerHTML = newQuantity;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove("is-editing-quantity");
    updateCartQuantity();
  });
});

 




