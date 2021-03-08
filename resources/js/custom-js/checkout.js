import {
    setCart
} from "./cart.js";
import {
    httpDelete,
    httpGet,
    httpPost,
    token
} from "./httpClient.js";
import { isPageName } from "./utilities.js";




let cart = JSON.parse(localStorage.getItem('cart')) || {
    products: []
};

let addresses = [];


window.addEventListener('checkout', submitOrder);

const isCheckout = isPageName('checkout');

function submitOrder() {
    if (orderId) {
        httpDelete(`order/${orderId}`).then(res => {}).catch(err => {
       // display error
            // alert(JSON.stringify(err));
        });
    }
    removeInvalidProducts();
    httpPost('order', { 
        products: cart.products,
        address_id: $('[name="addresses"]').val()
    }).then(res => {
        setCart({
            products: []
        });
    });
}

function removeInvalidProducts () {
    cart.products.forEach((product, index) => {
        if(product.msg) {
            delete cart.products[index]; 
        }
    })
}

$(document).ready(function () {
    if (isCheckout) {
        if (!token) {
            document.cookie = `path=${window.location.href}`;
            $('#user-link')[0].click();
        }
        httpGet('address').done((addressesResponse) => {
            addresses = addressesResponse;
            validateCart();
        });
    }
});

function validateCart() {
    if (cart.products.length) {
        calculatePrice();
        httpPost('order/validate', cart).then(res => {
            cart.total = res.cart_total_price;
            res.products.map((product, index) => {
                if(product.msg) {
                    cart.products[index].price = product.price;
                    cart.products[index].calculatedPrice = product.calculatedPrice;
                } else {
                    cart.products[index].msg = product.msg; /* may change the way to not include it in cart variable */
                }
            });
            renderUpdatedProducts();
        })
    }
}

function renderUpdatedProducts() {
    $.get('/template_cart_item.html', (template) => {
        $('.cart_summery_block.editable_items').html(Mustache.render(template, {
            cart,
            language: 'en'
        }));
    });

    $.get('/template_addresses.html', (template) => {
        $('.addresses_block').html(Mustache.render(template, {
            addresses
        }));
    });

    $.get('/template_cart_item.html', (template) => {
        $('.cart_summery_block.final_items').html(Mustache.render(template, {
            cart,
            language: 'en'
        }));
    });

    setTimeout(() => {
        updateRecurringValues();
        subscribeToDeleteFromCart();
        subscribeToQuantityChange();
    }, 100);
}

function calculatePrice() {
    cart.total = 0;
    cart.products.map(product => {
        product.calculatedPrice = product.price * product.quantity;
        cart.total += product.calculatedPrice;
    });
}

function updateRecurringValues() {
    cart.products.forEach(product => {
        $(`[data-index=${product.index}]`).find(`[data-value=${product.recurring}]`).trigger('click').trigger('click');
        $(`[data-index=${product.index}]`).find(`[value=${product.recurring}]`).attr('selected', true);
    });
}

function subscribeToDeleteFromCart() {
    $('.delete_from_cart').on('click', function () {
        // const productIndex = $(this).closest('[data-index]').attr('data-index');
        cart.products.splice($('.delete_from_cart').index(this), 1); // wrong index
        setCart(cart);
        calculatePrice(); // ** to recalculate the price
        renderUpdatedProducts();
    });
}


function subscribeToQuantityChange() {
    $('input.quantity').change(function () {
        const productIndex = $('input.quantity').index(this);
        cart.products[productIndex].quantity = this.value;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderUpdatedProducts();
    });
    // $('.quantity_plus, .quantity_minus').click(function() {
    //     const productIndex = $('.quantity_plus, .quantity_minus').index(this);
    //     
    //     setTimeout(()=> {
    //         cart.products[productIndex].quantity = $('input.quantity').eq(productIndex).val();  
    //         localStorage.setItem('cart', JSON.stringify(cart));
    //         renderUpdatedProducts();
    //     }, 10);
    // });
}