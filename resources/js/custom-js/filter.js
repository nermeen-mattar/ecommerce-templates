import allProducts from '../../data/products.js';

let searchValue = '';
let selectedCategory = '';
let selectedPriceRange;

$(document).ready(function () {
    subscribeToSearchChange();
    subscribeToCategoryFilterChange();
    subscribeToPriceFilterChange();
});

function subscribeToSearchChange() {
    $('.sidebar_search input').on('input', function () {
        searchValue = this.value;
        renderUpdatedProducts(filterProducts());
    });
}

function subscribeToCategoryFilterChange() {
    $('#product_category input[type=radio]').change(function () {
        selectedCategory = this.value;
        let updatedProducts = selectedCategory === '' ? allProducts : filterProducts();
        renderUpdatedProducts(updatedProducts);
    });
}

function subscribeToPriceFilterChange() {
    selectedPriceRange = getMinAndMaxPrice();
    if ($('.Range_slider').length > 0) {
        $(function () {
            $("#slider-range").slider({
                range: true,
                min: selectedPriceRange.min,
                max: selectedPriceRange.max,
                values: [Math.floor(selectedPriceRange.min), Math.ceil(selectedPriceRange.max)],
                slide: function (event, ui) {
                    $("#amount").text("$" + ui.values[0] + " - $" + ui.values[1]);
                    selectedPriceRange = {
                        min: ui.values[0],
                        max: ui.values[1]
                    };
                    renderUpdatedProducts(filterProducts());
                }
            });
            $("#amount").text("$" + $("#slider-range").slider("values", 0) +
                " - $" + $("#slider-range").slider("values", 1));
        });
    }
}

function getMinAndMaxPrice() {
    let max = Number(allProducts[0].price),
        min = Number(allProducts[0].price);
    for (let i = 1; i < allProducts.length; i++) {
        if (allProducts[i].price >= max) {
            max = Number(allProducts[i].price);
        }
        if (Number(allProducts[i].price) <= min) {
            min = Number(allProducts[i].price);
        }
    }
    return {
        min,
        max
    };
}

function filterProducts() {
    return allProducts.filter(product => (
        applyPriceFilter(product) &&
        applyCategoryFilter(product) &&
        applySearchFilter(product)
    ));

}

function applySearchFilter(product) {
    return JSON.stringify(product).toLowerCase().includes(searchValue);
}

function applyPriceFilter(product) {
    return product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
}

function applyCategoryFilter(product) {
    return JSON.stringify(product.categories).includes(selectedCategory);
}

function renderUpdatedProducts(products) {
    $.get('/template_products_cards.html', (template) => {
        $('.product_items_section ul').html(Mustache.render(template, {products, language: 'en'}));
    });
}

