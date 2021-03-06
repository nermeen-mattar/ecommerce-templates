const currentPageURL = window.location.href;
export let token = localStorage.getItem('token');
const tokenName = 'id_token';
const startIndex = currentPageURL.indexOf(tokenName);
if(startIndex !== -1) {
    const endIndex = currentPageURL.indexOf('access_token');
    token = currentPageURL.substring(startIndex + tokenName.length + 1, endIndex - 1);
    localStorage.setItem('token', token);
    const cookieParams = document.cookie.split("=");
    const pathIndex = cookieParams.indexOf('path');
    if(pathIndex !== -1 && path[pathIndex + 1]) window.location.href = path[pathIndex + 1];
}

if(token) {
    $('#user-link').attr('href', '/en/profile.html');
} else {
    const currentPageName = currentPageURL.substr(currentPageURL.lastIndexOf("/") + 1);
    $('#user-link').attr('href', `https://lalbab.auth.eu-west-1.amazoncognito.com/login?client_id=13s5iapgmonglo62isgonl17tt&response_type=token&scope=openid&redirect_uri=https://lalbab.store/`); 
    // ${currentPageName} needs to be supported for cognito                    
}

const baseUrl = "https://ue5v6b1604.execute-api.eu-west-1.amazonaws.com/Production"; // "https://api.lalbab.store";

function httpGet(resource) {
    return $.ajax({
        url: `${baseUrl}/${resource}`,
        method: 'get',
        crossDomain: true,
        headers: {
        'Content-Type': 'application/json',
        "Authorization": token
        }
    })
}

function httpPost(resource, body) {
    return $.ajax({
        url: `${baseUrl}/${resource}`,
        method: 'post',
        crossDomain: true,
        headers: {
        'Content-Type': 'application/json',
        // 'Authorization': token
        },
        data: JSON.stringify(body)
    })
}

function httpPut(resource, body) {
    return $.ajax({
        url: `${baseUrl}/${resource}`,
        method: 'put',
        crossDomain: true,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        },
        data: JSON.stringify(body)
    })
}

function httpDelete(resource, body) {
    return $.ajax({
        url: `${baseUrl}/${resource}`,
        method: 'delete',
        crossDomain: true,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        },
        data: JSON.stringify(body)
    })
}

export {
    httpGet,
    httpPost,
    httpDelete,
    httpPut
}