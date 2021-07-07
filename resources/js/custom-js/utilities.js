function getFormValues(formSelector) {
    const formElements = document.querySelector(formSelector).elements;
    const formValues = [{}]; // may add validation before return that formValues[0] is not an empty object
    let j = 0;
    for (var i = 0; i < formElements.length; i++) {
        var item = formElements.item(i);
        if (item.name && item.value) {
            if (formValues[j][item.name]) {
                formValues.push({});
                j++;
            }
            formValues[j][item.name] = item.value;
        }
    }
    return formValues;
}

function setFormValues(formSelector, value) {
    var formElements = document.querySelector(formSelector).elements;
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].value = `{{${formElements[i].name}}}`;
        const newValue =  value !== undefined ? value : `{{${formElements[i].name}}}`;
        formElements[i].setAttribute('value', newValue)
    }
}

function isPageName(pageName) {
        return window.location.href.includes(pageName);
}


export {
    isPageName,
    getFormValues,
    setFormValues
}