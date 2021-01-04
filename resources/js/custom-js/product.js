import allProducts from '../../data/products.js';

let selectedProduct;
const attributesToVariations = {}, selectedAttributes = [];

$(document).ready(function () {
    selectedProduct = getProductBySlug($('[data-slug]').attr('data-slug'));
    if(selectedProduct) {
        mapAttributesToVariations();
        subscribeToAttributesChange();
        subscribeToQuantityChange();
    }
});

function subscribeToQuantityChange() {
    isQuantityMoreThanZero() ? enableAddToCart() : disableAddToCart();
    $('.product_single_details input.quantity').change(function() {
        isQuantityMoreThanZero() ? enableAddToCart() : disableAddToCart();
    });
    $('.product_single_details .quantity_plus,.product_single_details .quantity_minus').click(function() {
        isQuantityMoreThanZero() ? enableAddToCart() : disableAddToCart();
    });
}

function isQuantityMoreThanZero() {
    const quantityInputs = $('.product_single_details input.quantity');
    let hasQuantity = false;
    if (quantityInputs.length) {
        quantityInputs.each(function () {
            const value = Number(this.value);
        if (value && value > 0)  {
            hasQuantity = true;
            }
        });
    }
    return hasQuantity;
}

function enableAddToCart() {
    $('#add_to_cart').addClass('clv_btn');
    $('#add_to_cart').removeClass('disabled_clv_btn');
}
function disableAddToCart() {
    $('#add_to_cart').removeClass('clv_btn');
    $('#add_to_cart').addClass('disabled_clv_btn');
}

function getProductBySlug(slug){
    return slug && allProducts.filter(product => product.slug === slug)[0];
}

function mapAttributesToVariations() {
    selectedProduct.variations.forEach(variation => {
        let attributesValue = '';
        variation.attributes.forEach(attribute => {
            attributesValue+= attribute.option;
        });
        attributesToVariations[attributesValue] = variation;
    });
}

function subscribeToAttributesChange() {
    $('.attributes').on('click', '.option', function () {
        const selectPosition = $(this).closest('.attribute-select').find('select').attr('data-position');
        selectedAttributes[Number(selectPosition)]= $(this).attr('data-value'); // update selected attribute
        displaySelectedVariation();
    });
}


function displaySelectedVariation() {
    const selectedVariation = attributesToVariations[selectedAttributes.join('')];
    if(selectedVariation) {
        $('.single_variation_wrap').addClass('d-none');
        $(`.single_variation_wrap#${selectedVariation.id}`).removeClass('d-none');
        if(selectedVariation.image?.src) {
            const imageIndex = getImageIndex(selectedVariation.image.src);
            document.querySelector('.swiper-container').swiper.slideTo(imageIndex);
        }
    }
}

function getImageIndex(imageSrc) {
    return selectedProduct.images.findIndex(image => image.src === imageSrc);
}

