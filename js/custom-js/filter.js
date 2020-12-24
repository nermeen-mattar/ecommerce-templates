$(document).ready(function () {
    const {
        min,
        max
    } = getMinAndMaxPrice();
    if ($('.Range_slider').length > 0) {
        $(function () {
            $("#slider-range").slider({
                range: true,
                min: min,
                max: max,
                values: [Math.floor(max / 4), Math.floor(3 * max / 4)],
                slide: function (event, ui) {
                    $("#amount").text("$" + ui.values[0] + " - $" + ui.values[1]);
                    // debounce(() => 
                    filterProductsByPrice(...ui.values);
                    // , 500);
                }
            });
            $("#amount").text("$" + $("#slider-range").slider("values", 0) +
                " - $" + $("#slider-range").slider("values", 1));
        });
    }
});

function getMinAndMaxPrice() {
    let max = Number(allProducts[0].price),
        min = Number(allProducts[0].price);
    for (let i = 1; i < allProducts.length; i++) {
        if (allProducts[i].price > max) {
            max = Number(allProducts[i].price);
        }
        if (Number(allProducts[i].price) < min) {
            min = Number(allProducts[i].price);
        }
    }
    return {
        min,
        max
    };
}

function filterProductsByPrice(from, to) {
    return allProducts.filter(product => product.price >= from && product.price <= to);
}

const debounce = (func, delay) => {
    let inDebounce
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

/* Following is temp and will be replaced with an import or require statement 
 * const allProducts = require('data/products.json');
 */
const allProducts = [{
        "id": 55,
        "name": "test variable",
        "slug": "test-variable",
        "permalink": "https://manage.lalbab.store/product/test-variable/",
        "date_created": "2020-12-14T11:12:37",
        "date_created_gmt": "2020-12-14T11:12:37",
        "date_modified": "2020-12-16T21:52:39",
        "date_modified_gmt": "2020-12-16T21:52:39",
        "type": "variable",
        "status": "publish",
        "featured": false,
        "catalog_visibility": "visible",
        "description": "<p>Dtest variable description</p>\n<p>test variable description</p>\n<p>test variable description</p>\n<p>test variable description</p>\n",
        "short_description": "<p>Consectetur adipisicing elit sed do eiusmod tempor incididunt utte labore et dolore magna aliqua Ut enim ad minim veniam quis strud exercitation ullamco laboris nisi ut aliquip ex ea commodo wis aute irure dolor in reprehenderit in voluptate</p>\n",
        "sku": "2",
        "price": "2",
        "regular_price": "",
        "sale_price": "",
        "date_on_sale_from": null,
        "date_on_sale_from_gmt": null,
        "date_on_sale_to": null,
        "date_on_sale_to_gmt": null,
        "price_html": "<span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#36;</span>2.00</bdi></span> &ndash; <span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#36;</span>18.00</bdi></span>",
        "on_sale": true,
        "purchasable": true,
        "total_sales": 0,
        "virtual": false,
        "downloadable": false,
        "downloads": [],
        "download_limit": -1,
        "download_expiry": -1,
        "external_url": "",
        "button_text": "",
        "tax_status": "taxable",
        "tax_class": "",
        "manage_stock": true,
        "stock_quantity": 19,
        "stock_status": "instock",
        "backorders": "no",
        "backorders_allowed": false,
        "backordered": false,
        "sold_individually": false,
        "weight": "50",
        "dimensions": {
            "length": "20",
            "width": "20",
            "height": "20"
        },
        "shipping_required": true,
        "shipping_taxable": true,
        "shipping_class": "",
        "shipping_class_id": 0,
        "reviews_allowed": true,
        "average_rating": "5.00",
        "rating_count": 1,
        "related_ids": [],
        "upsell_ids": [],
        "cross_sell_ids": [
            48
        ],
        "parent_id": 0,
        "purchase_note": "",
        "categories": [{
            "id": 29,
            "name": "Products category",
            "slug": "products-category"
        }],
        "tags": [{
                "id": 31,
                "name": "test",
                "slug": "test"
            },
            {
                "id": 32,
                "name": "water",
                "slug": "water"
            }
        ],
        "images": [{
                "id": 64,
                "date_created": "2020-12-16T18:51:16",
                "date_created_gmt": "2020-12-16T18:51:16",
                "date_modified": "2020-12-16T18:51:16",
                "date_modified_gmt": "2020-12-16T18:51:16",
                "src": "https://manage.lalbab.store/wp-content/uploads/2020/12/40102373_10214622145821826_4353243306352705536_n.jpg",
                "name": "40102373_10214622145821826_4353243306352705536_n",
                "alt": ""
            },
            {
                "id": 52,
                "date_created": "2020-12-14T11:02:42",
                "date_created_gmt": "2020-12-14T11:02:42",
                "date_modified": "2020-12-14T11:02:42",
                "date_modified_gmt": "2020-12-14T11:02:42",
                "src": "https://manage.lalbab.store/wp-content/uploads/2020/12/download-2-1.jpeg",
                "name": "download (2)",
                "alt": ""
            },
            {
                "id": 64,
                "date_created": "2020-12-16T18:51:16",
                "date_created_gmt": "2020-12-16T18:51:16",
                "date_modified": "2020-12-16T18:51:16",
                "date_modified_gmt": "2020-12-16T18:51:16",
                "src": "https://manage.lalbab.store/wp-content/uploads/2020/12/40102373_10214622145821826_4353243306352705536_n.jpg",
                "name": "40102373_10214622145821826_4353243306352705536_n",
                "alt": ""
            }
        ],
        "attributes": [{
                "id": 0,
                "name": "color",
                "position": 0,
                "visible": true,
                "variation": true,
                "options": [
                    "red",
                    "green",
                    "blue"
                ]
            },
            {
                "id": 0,
                "name": "Count",
                "position": 1,
                "visible": true,
                "variation": false,
                "options": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6"
                ]
            },
            {
                "id": 0,
                "name": "Shape",
                "position": 2,
                "visible": true,
                "variation": false,
                "options": [
                    "Circle",
                    "Rect"
                ]
            },
            {
                "id": 0,
                "name": "Dimensions",
                "position": 3,
                "visible": true,
                "variation": false,
                "options": [
                    "20x40",
                    "40",
                    "20"
                ]
            }
        ],
        "default_attributes": [],
        "variations": [
            63,
            62
        ],
        "grouped_products": [],
        "menu_order": 0,
        "meta_data": [{
                "id": 223,
                "key": "slide_template",
                "value": ""
            },
            {
                "id": 224,
                "key": "rs_page_bg_color",
                "value": ""
            },
            {
                "id": 308,
                "key": "brizy_attachment_focal_point",
                "value": {
                    "x": 50,
                    "y": 50
                }
            }
        ],
        "brizy_attachment_focal_point": {
            "x": 50,
            "y": 50
        },
        "_links": {
            "self": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products/55"
            }],
            "collection": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products"
            }]
        }
    },
    {
        "id": 54,
        "name": "Group of products",
        "slug": "group-of-products",
        "permalink": "https://manage.lalbab.store/product/group-of-products/",
        "date_created": "2020-12-14T11:06:04",
        "date_created_gmt": "2020-12-14T11:06:04",
        "date_modified": "2020-12-17T02:02:06",
        "date_modified_gmt": "2020-12-17T02:02:06",
        "type": "grouped",
        "status": "publish",
        "featured": false,
        "catalog_visibility": "visible",
        "description": "<p>Group of products description</p>\n",
        "short_description": "",
        "sku": "",
        "price": "2",
        "regular_price": "",
        "sale_price": "",
        "date_on_sale_from": null,
        "date_on_sale_from_gmt": null,
        "date_on_sale_to": null,
        "date_on_sale_to_gmt": null,
        "price_html": "<span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#36;</span>2.00</bdi></span> &ndash; <span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#36;</span>7.00</bdi></span>",
        "on_sale": true,
        "purchasable": false,
        "total_sales": 0,
        "virtual": false,
        "downloadable": false,
        "downloads": [],
        "download_limit": -1,
        "download_expiry": -1,
        "external_url": "",
        "button_text": "",
        "tax_status": "taxable",
        "tax_class": "",
        "manage_stock": false,
        "stock_quantity": null,
        "stock_status": "instock",
        "backorders": "no",
        "backorders_allowed": false,
        "backordered": false,
        "sold_individually": false,
        "weight": "",
        "dimensions": {
            "length": "",
            "width": "",
            "height": ""
        },
        "shipping_required": true,
        "shipping_taxable": true,
        "shipping_class": "",
        "shipping_class_id": 0,
        "reviews_allowed": true,
        "average_rating": "0.00",
        "rating_count": 0,
        "related_ids": [
            48
        ],
        "upsell_ids": [
            62
        ],
        "cross_sell_ids": [],
        "parent_id": 0,
        "purchase_note": "",
        "categories": [{
            "id": 15,
            "name": "Uncategorized",
            "slug": "uncategorized"
        }],
        "tags": [],
        "images": [],
        "attributes": [],
        "default_attributes": [],
        "variations": [],
        "grouped_products": [
            48,
            55
        ],
        "menu_order": 0,
        "meta_data": [{
                "id": 202,
                "key": "slide_template",
                "value": ""
            },
            {
                "id": 203,
                "key": "rs_page_bg_color",
                "value": ""
            }
        ],
        "brizy_attachment_focal_point": "",
        "_links": {
            "self": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products/54"
            }],
            "collection": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products"
            }]
        }
    },
    {
        "id": 48,
        "name": "Water box",
        "slug": "water-box",
        "permalink": "https://manage.lalbab.store/product/water-box/",
        "date_created": "2020-12-14T11:02:56",
        "date_created_gmt": "2020-12-14T11:02:56",
        "date_modified": "2020-12-16T21:37:09",
        "date_modified_gmt": "2020-12-16T21:37:09",
        "type": "simple",
        "status": "publish",
        "featured": false,
        "catalog_visibility": "visible",
        "description": "<p>This is the description for Water box</p>\n",
        "short_description": "<p>Short description</p>\n",
        "sku": "344",
        "price": "7",
        "regular_price": "9",
        "sale_price": "7",
        "date_on_sale_from": null,
        "date_on_sale_from_gmt": null,
        "date_on_sale_to": null,
        "date_on_sale_to_gmt": null,
        "price_html": "<del><span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#36;</span>9.00</bdi></span></del> <ins><span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#36;</span>7.00</bdi></span></ins>",
        "on_sale": true,
        "purchasable": true,
        "total_sales": 0,
        "virtual": false,
        "downloadable": false,
        "downloads": [],
        "download_limit": -1,
        "download_expiry": -1,
        "external_url": "",
        "button_text": "",
        "tax_status": "taxable",
        "tax_class": "",
        "manage_stock": false,
        "stock_quantity": null,
        "stock_status": "instock",
        "backorders": "no",
        "backorders_allowed": false,
        "backordered": false,
        "sold_individually": false,
        "weight": "1",
        "dimensions": {
            "length": "10",
            "width": "10",
            "height": "10"
        },
        "shipping_required": true,
        "shipping_taxable": true,
        "shipping_class": "",
        "shipping_class_id": 0,
        "reviews_allowed": true,
        "average_rating": "4.00",
        "rating_count": 1,
        "related_ids": [
            54
        ],
        "upsell_ids": [],
        "cross_sell_ids": [],
        "parent_id": 0,
        "purchase_note": "",
        "categories": [{
            "id": 15,
            "name": "Uncategorized",
            "slug": "uncategorized"
        }],
        "tags": [],
        "images": [],
        "attributes": [],
        "default_attributes": [],
        "variations": [],
        "grouped_products": [],
        "menu_order": 0,
        "meta_data": [{
                "id": 148,
                "key": "_oembed_e335f6af3345d7edc16c15ecee2f613a",
                "value": "{{unknown}}"
            },
            {
                "id": 172,
                "key": "slide_template",
                "value": ""
            },
            {
                "id": 173,
                "key": "rs_page_bg_color",
                "value": ""
            }
        ],
        "brizy_attachment_focal_point": "",
        "_links": {
            "self": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products/48"
            }],
            "collection": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products"
            }]
        }
    },
    {
        "id": 44,
        "name": "تجربي",
        "slug": "",
        "permalink": "https://manage.lalbab.store/ar/?post_type=product&p=44",
        "date_created": null,
        "date_created_gmt": null,
        "date_modified": "2020-12-11T19:28:13",
        "date_modified_gmt": "2020-12-11T19:28:13",
        "type": "simple",
        "status": "draft",
        "featured": false,
        "catalog_visibility": "visible",
        "description": "<p>تجربي شرح</p>\n",
        "short_description": "",
        "sku": "",
        "price": "90",
        "regular_price": "100",
        "sale_price": "90",
        "date_on_sale_from": null,
        "date_on_sale_from_gmt": null,
        "date_on_sale_to": null,
        "date_on_sale_to_gmt": null,
        "price_html": "",
        "on_sale": false,
        "purchasable": false,
        "total_sales": 0,
        "virtual": false,
        "downloadable": false,
        "downloads": [],
        "download_limit": -1,
        "download_expiry": -1,
        "external_url": "",
        "button_text": "",
        "tax_status": "taxable",
        "tax_class": "",
        "manage_stock": false,
        "stock_quantity": null,
        "stock_status": "instock",
        "backorders": "no",
        "backorders_allowed": false,
        "backordered": false,
        "sold_individually": false,
        "weight": "",
        "dimensions": {
            "length": "",
            "width": "",
            "height": ""
        },
        "shipping_required": true,
        "shipping_taxable": true,
        "shipping_class": "",
        "shipping_class_id": 0,
        "reviews_allowed": true,
        "average_rating": "0.00",
        "rating_count": 0,
        "related_ids": [],
        "upsell_ids": [],
        "cross_sell_ids": [],
        "parent_id": 0,
        "purchase_note": "",
        "categories": [{
            "id": 27,
            "name": "Uncategorized",
            "slug": "uncategorized-ar"
        }],
        "tags": [],
        "images": [],
        "attributes": [],
        "default_attributes": [],
        "variations": [],
        "grouped_products": [],
        "menu_order": 0,
        "meta_data": [{
                "id": 140,
                "key": "slide_template",
                "value": ""
            },
            {
                "id": 141,
                "key": "rs_page_bg_color",
                "value": ""
            }
        ],
        "brizy_attachment_focal_point": "",
        "_links": {
            "self": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products/44"
            }],
            "collection": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products"
            }]
        }
    },
    {
        "id": 43,
        "name": "test",
        "slug": "",
        "permalink": "https://manage.lalbab.store/?post_type=product&p=43",
        "date_created": null,
        "date_created_gmt": null,
        "date_modified": "2020-12-11T19:23:13",
        "date_modified_gmt": "2020-12-11T19:23:13",
        "type": "simple",
        "status": "draft",
        "featured": false,
        "catalog_visibility": "visible",
        "description": "<p>test product</p>\n",
        "short_description": "",
        "sku": "",
        "price": "15",
        "regular_price": "20",
        "sale_price": "15",
        "date_on_sale_from": null,
        "date_on_sale_from_gmt": null,
        "date_on_sale_to": null,
        "date_on_sale_to_gmt": null,
        "price_html": "",
        "on_sale": false,
        "purchasable": false,
        "total_sales": 0,
        "virtual": false,
        "downloadable": false,
        "downloads": [],
        "download_limit": -1,
        "download_expiry": -1,
        "external_url": "",
        "button_text": "",
        "tax_status": "taxable",
        "tax_class": "",
        "manage_stock": false,
        "stock_quantity": null,
        "stock_status": "instock",
        "backorders": "no",
        "backorders_allowed": false,
        "backordered": false,
        "sold_individually": false,
        "weight": "",
        "dimensions": {
            "length": "",
            "width": "",
            "height": ""
        },
        "shipping_required": true,
        "shipping_taxable": true,
        "shipping_class": "",
        "shipping_class_id": 0,
        "reviews_allowed": true,
        "average_rating": "0.00",
        "rating_count": 0,
        "related_ids": [],
        "upsell_ids": [],
        "cross_sell_ids": [],
        "parent_id": 0,
        "purchase_note": "",
        "categories": [],
        "tags": [],
        "images": [],
        "attributes": [{
            "id": 0,
            "name": "color",
            "position": 0,
            "visible": true,
            "variation": false,
            "options": [
                "red"
            ]
        }],
        "default_attributes": [],
        "variations": [],
        "grouped_products": [],
        "menu_order": 0,
        "meta_data": [{
                "id": 176,
                "key": "slide_template",
                "value": ""
            },
            {
                "id": 177,
                "key": "rs_page_bg_color",
                "value": ""
            }
        ],
        "brizy_attachment_focal_point": "",
        "_links": {
            "self": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products/43"
            }],
            "collection": [{
                "href": "https://manage.lalbab.store/wp-json/wc/v3/products"
            }]
        }
    }
];