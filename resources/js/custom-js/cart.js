
import { getProductById, selectedProduct, getVariationById } from "./product.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];

$(document).ready(function() {
    $('.add_to_cart').on('click', addToCart);
    $('#products_count').html(cart.length);
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
        cart.push({id: product.id, quantity, recurring, name: product.name, price: product.price, image: product.images[0]?.src});
    }
    else if(product.type === "variable") {
        const quantity = $('.single_variation_wrap:not(.d-none) input.quantity:not([value=0])').val() || 1;
        const variationId = $('.single_variation_wrap:not(.d-none)').first().attr('id');
        const variation = getVariationById(variationId) || product.variations[0];
        cart.push({id: product.id, quantity, recurring, name: product.name, price: variation.price, image: variation.image?.src});
    } else if (product.type === "grouped") {
        const quantities = $('.product_single_details input.quantity:not([value=0])');
        if(quantities.length) {
            quantities.each(function() {
                const quantity = $(this).val();
                const groupedProduct = getProductById($(this).attr('data-product-id'));
                cart.push({id: groupedProduct.id, groupId: product.id, quantity, recurring, name: groupedProduct.name, price: groupedProduct.price, image: groupedProduct.images[0].src})
              });
        } else {
            product.grouped_products.forEach(groupedProduct => {
                cart.push({id: groupedProduct.id, groupId: product.id, quantity: 1, recurring, name: groupedProduct.name, price: groupedProduct.price, image: groupedProduct.images[0].src})
            });
        }

    }
    if(cart && cart.length) {
        $('#products_count').html(cart.length);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayAddToCartSuccess();
    }
    
}

function displayAddToCartSuccess() {
    $('.alert').show().fadeTo(2000, 500).slideUp(500, function(){
        $(".alert-success").slideUp(500);
    });
}