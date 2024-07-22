let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [ 
    {
        id: 1,
        name: 'NIKE-Air Gold Max',
        image: 'shoes1.png',
        price: 18990
    },
    {
        id: 2,
        name: 'NIKE-Black Rac',
        image: 'shoes2.png',
        price: 20000
    },
    {
        id: 3,
        name: 'NIKE-Blue Glow',
        image: 'shoes3.png',
        price: 22000
    },
    {
        id: 4,
        name: 'NIKE-Track',
        image: 'shoes4.png',
        price: 12300
    },
    {
        id: 5,
        name: 'NIKE-Brown SPX',
        image: 'shoes5.png',
        price: 32000
    },
    {
        id: 6,
        name: 'NIKE-Organ',
        image: 'shoes6.png',
        price: 16000
    },
    {
        id: 7,
        name: 'NIKE-RWB',
        image: 'shoes7.png',
        price: 12000
    },
    {
        id: 8,
        name: 'NIKE-M Pro',
        image: 'shoes8.png',
        price: 10000
    },
    {
        id: 9,
        name: 'NIKE-Max Pro',
        image: 'shoes8.png',
        price: 18000
    }

 ];
let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price"><span class="price-color">Price: ₹${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
           <a href="new.html"> <button>Purchase</button></a>`;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    // Prompt the user for the size
    const size = prompt('Please enter the size:');
    if (size) {
        if (listCards[key] == null) {
            listCards[key] = JSON.parse(JSON.stringify(products[key]));
            listCards[key].quantity = 1;
            listCards[key].size = size;
        } else {
            listCards[key].quantity += 1;
        }
        reloadCard();
    } else {
        alert('Please enter a valid size.');
    }
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice += value.price;
        count += value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}" /></div>
                <div>${value.name}</div>
                <div>Size:${value.size}</div>
                <div>Price:₹${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerHTML = `BUY<span class="price-color"> ₹${totalPrice.toLocaleString()}</span>`;
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function displayCart() {
    const cartPage = window.open('', '_blank');
    cartPage.document.write(`
        <html>
            <head>
                <title>Cart</title>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background:linear-gradient(#e3b8d3, #a290b7);
                }
                h1 {
                    margin: 35px 0;
                    font-size: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-transform: uppercase;
                    background: linear-gradient(to right, #c72092,#6c14d0);
                }
                .cart-item {
                    display: flex;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 10px;
                }
                .cart-item img {
                    max-width: 100px;
                    margin-right: 10px;
                }
                .cart-item div {
                    flex: 1;
                    color:red;
                }
                .cart-item div:nth-child(2) {
                    font-weight: bold;
                }
                .cart-item .button-container {
                    display: flex;
                    flex-direction: column; /* Stack buttons vertically */
                    align-items: center; /* Center buttons horizontally */
                }
                .cart-item .button-container .above-button,
                .cart-item .button-container .add-details-button {
                    background: linear-gradient(to right, #c72092, #6c14d0);
                    color: white;
                    padding: 10px 10px;
                    border: solid 2px;
                    cursor: pointer;
                    margin-left: 12cm;
                }
                .cart-item .button-container .add-details-button {
                    margin-top: 10px; /* Space between buttons */
                }
                </style>
            </head>
            <body>
                <h1>Shop Now</h1>
    `);

    let totalPrice = 0;

    listCards.forEach((value) => {
        // Calculate the total price for each item (price * quantity)
        const itemTotalPrice = value.price;
        totalPrice += itemTotalPrice;

        cartPage.document.write(`
            <div class="cart-item" id="contactForm">
                <img src="image/${value.image}" />
                <div>
                    ${value.name}<br />
                   Size: ${value.size}<br  />
                    Price: ₹${value.price.toLocaleString()}<br />
                    Quantity: ${value.quantity}
                </div>
                <div class="button-container">
                
                <a href="hi.html"><button class="add-details-button">Add Details</button></a>
           </div>
                </div>
        `);
    });

    cartPage.document.write(`
                <div>Total Price: ₹${totalPrice.toLocaleString()}</div>
            </body>
        </html>
    `);
}




function handleBuyClick() {
    displayCart();
}

// Add an event listener to the "BUY" button
total.addEventListener('click', handleBuyClick);


function purchase(key) {
    const selectedItem = products[key];
    
    const size = prompt('Please enter the size:');
    let quantity = prompt('Please enter the quantity:');

    quantity = parseInt(quantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    if (size) {
        if (listCards[key] == null) {
            listCards[key] = JSON.parse(JSON.stringify(products[key]));
            listCards[key].quantity = quantity;
            listCards[key].size = size;
        } else {
            listCards[key].quantity += quantity;
        }
        listCards[key].price = listCards[key].quantity * products[key].price; // Update the price
        displayCart();
    } else {
        alert('Please enter a valid size.');
    }
}


