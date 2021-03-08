import {
    httpGet
} from "./httpClient.js";

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');
if(myParam) {
  httpGet(`order/${myParam}`).then(respnse => response);
}
