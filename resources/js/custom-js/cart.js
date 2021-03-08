
import { getProductById, selectedProduct, getVariationById } from "./product.js";
import { displaySuccess } from "./success_message.js";

let cart;
$(document).ready(function() {
    $('.add_to_cart').on('click', addToCart);
    setCart(JSON.parse(localStorage.getItem('cart')) || {products: []});
});

function addToCart(e = {}) {
    e.preventDefault()
    e.stopPropagation();

    let product = selectedProduct;
    const recurring = $('[name="recurring"]').val() || "once";
    const productBlock = $(this).closest('.org_product_block').first(); 
    if(productBlock.length) {
        product = getProductById(productBlock.attr('id'));
    }
    if(product.type === "simple") {
        const quantity = $('.product_single_details input.quantity:not([value=0])').val() || 1;
        cart.products.push({id: product.id, quantity, recurring, name: product.name, price: product.price, image: product.images[0]?.src, index: carts.products.length});
    }
    else if(product.type === "variable") {
        const quantity = $('.single_variation_wrap:not(.d-none) input.quantity:not([value=0])').val() || 1;
        const variationId = $('.single_variation_wrap:not(.d-none)').first().attr('id');
        const variation = getVariationById(variationId) || product.variations[0];
        cart.products.push({id: product.id, quantity, recurring, name: product.name, price: variation.price, image: variation.image?.src, index: carts.products.length});
    } else if (product.type === "grouped") {
        const quantities = $('.product_single_details input.quantity:not([value=0])');
        if(quantities.length) {
            quantities.each(function() {
                const quantity = $(this).val();
                const groupedProduct = getProductById($(this).attr('data-product-id'));
                cart.products.push({id: groupedProduct.id, groupId: product.id, quantity, recurring, name: groupedProduct.name, price: groupedProduct.price, image: groupedProduct.images[0].src, index: carts.products.length})
              });
        } else {
            product.grouped_products.forEach(groupedProduct => {
                cart.products.push({id: groupedProduct.id, groupId: product.id, quantity: 1, recurring, name: groupedProduct.name, price: groupedProduct.price, image: groupedProduct.images[0].src, index: carts.products.length})
            });
        }

    }
    if(cart.products && cart.products.length) {
        setCart(cart);
        displaySuccess();
    }
    
}

function setProductsCountInCartIcon() {
    $('#products_count').html(cart.products.length);
}

export function setCart(updatedCard) {
    cart = updatedCard;
    localStorage.setItem('cart', JSON.stringify(updatedCard));
    setProductsCountInCartIcon();
}

