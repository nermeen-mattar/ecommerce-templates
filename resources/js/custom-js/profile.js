import { getFormValues, setFormValues, isPageName } from "./utilities.js";
import {
    httpDelete,
    httpGet,
    httpPost,
    httpPut
} from "./httpClient.js";
import { displaySuccess } from "./success_message.js";

let addresses = [];
let deletedAddresses = [];
let userData;

$(document).ready(function () {
    if(isPageName('profile')) {
        getUserData().then(userResponse => {
            setUserData(userResponse);
        });
        httpGet('address').then((response) => {
            setAddresses(response);
            subscribeToUserActions();
        });
    }
});


function subscribeToUserActions() {
    subscribeToDeleteFromAddress()
    /* currently hidden subscribeToDeleteFromAddress(); */
    // subscribeToAddAddress();
    subscribeToUserType();
    subscribeToSave();
}

function subscribeToUserType() {

    // $('[data-value="Business"]')
    // $('#user-type').parent().find('.nice-select li')
    // $('#user-type').parent().find('.nice-select');

    $('#user-type').change(function (e) {
        displayBusinessOrHouseholdFields(e.target.value);
    });
}

function displayBusinessOrHouseholdFields(typeValue) {
    $('.Business-field, .Household-field').addClass('d-none');

    if (typeValue) {
        $(`.${typeValue}-field`).removeClass('d-none');
    }
}

function subscribeToSave() {
    $('.save_btn').on('click', () => {
        // setUserData(getFormValues('#user_form')[0], true);
        const userFormData = getFormValues('#user_form')[0];

        httpPut('user', userFormData).then(response => {
            setUserData(response);
        });
        handleDeletedAddresses();
        const addressValues = getFormValues('#address_form');
        addressValues.map(addressValue => {
            // validate address else error
            if (Object.keys(addressValue).length) {
                return updateOrCreateAddress(addressValue);
            }
        });
    });
    setTimeout(()=> {
        httpGet('address').then((response) => {
            setAddresses(response);
            subscribeToUserActions();
            displaySuccess();
            console.log('timeout done');
    
        });
    }, 2000)

}

function handleDeletedAddresses() {
    deletedAddresses.forEach(deletedAddressId => {
        httpDelete(`address/${deletedAddressId}`).then(response => response);
        deletedAddresses = [];
    });
}

function updateOrCreateAddress(address) {
    const addressId = address.address_id;
    if (addressId) {
        return httpPut(`address/${addressId}`, address);
    }
    return httpPost('address', address);
}

function renderAddresses() {
    $.get('/template_address_formgroup.html', (template) => {
        $('#address_form').html(Mustache.render(template, {
            addresses
        }));
    });
}

function setAddresses(updatedAddresses) {
    addresses = updatedAddresses;
    renderAddresses();
}


function setUserData(updatedUserData) {
    userData = updatedUserData;
    renderUserData();
}

function getUserData() {
    return httpGet('user');
}

function renderUserData() {
    // $.get('/template_profile_form.html', (template) => {
    // });
    setFormValues('#user_form', '');
    const profileForm = $('#profile_form'); // template_profile_form.html
    profileForm.html(Mustache.render(profileForm.html(), userData));
    displayBusinessOrHouseholdFields(userData.type);
    $(`[data-value=${userData.type}]`).trigger('click').trigger('click');
}

/* currently hidden */
function subscribeToDeleteFromAddress() {
    $('#address_form').on('click', '.delete_address', function () {
        // addresses.splice($('.delete_address').index(this), 1); // wrong index
        // setAddresses(addresses);
        const addressFormGroup = $(this).closest('.form-group');
        const addressId = addressFormGroup.attr('id');
        addressId && deletedAddresses.push(addressFormGroup.attr('id'));
        addressFormGroup.remove();
    });
}

// https://ue5v6b1604.execute-api.eu-west-1.amazonaws.com/Production/user