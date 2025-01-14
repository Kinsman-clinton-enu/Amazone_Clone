
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
cart =  [
  {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2, 
      deliveryOptionId: 1
  },
  {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: 2
  
  }];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

saveToStorage();

export function calculateCartQuanity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) =>{
    cartQuantity += cartItem.quantity
  });
  return cartQuantity;
}

export function addToCart(productId){
    let matchingItem;
    const cartQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
    cart.forEach((cartItem) => {
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity += cartQuantity;
    } 
    else{
      cart.push({
        productId: productId,
        quantity: cartQuantity,
        deliveryOptionId: '1'
      });
    } 

    saveToStorage();
  }

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    } 
  });

  cart = newCart;
 saveToStorage();
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}