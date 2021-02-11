import { setCart } from "./cart.js";
import {
    httpGet,
    httpPost,
    token
} from "./httpClient.js";

const cart = JSON.parse(localStorage.getItem('cart')) || {
    products: []
};


function submitOrder() {
    httpPost('order', {
        products: cart.products,
        address_id: $('[name="addresses"]').val()
    }).then(res => {
        setCart({products: []});
    }).catch(err => {
        // display error
        // alert(JSON.stringify(err));
    });
}
window.addEventListener('checkout', submitOrder);

$(document).ready(function () {
    if (window.location.href.includes('checkout')) {
        if (!token) $('#user-link')[0].click();
        httpGet('address').done((response) => {
            renderUpdatedProducts(response);
            if (cart.products.length) {
                calculatePrice();
                httpPost('order/validate', cart).then(res => {
                    cart.total = res.cart_total_price;
                    res.products.map((product, index) => {
                        cart.products[index].price = product.price;
                        cart.products[index].calculatedPrice = product.calculatedPrice;
                    });
                    renderUpdatedProducts(response);
                })
            }
        });
    }
});

function renderUpdatedProducts(addresses) {
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

    $.get('/template_cart_item_readonly.html', (template) => {
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
}