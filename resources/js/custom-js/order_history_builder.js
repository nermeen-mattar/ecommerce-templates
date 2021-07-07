import {
  httpGet
} from "./httpClient.js";
import { isPageName } from "./utilities.js";

let purchaseData;
if (isPageName('purchase_history')) {
  httpGet('order').then(respnse => {
    purchaseData = respnse;
    createHistoryPagePurchases(purchaseData);
    $('.order-details-btn').on('click', function () {
      const order = $(this).closest('[data-order-id]');
      const orderId = order.attr('data-order-id');
      window.location.href = `https://lalbab.store/en/order.html?order-id=${orderId}`;
      //`https://lalbab.store/en/order.html?order-id=${orderId}`
    })
  });
}

const purchases = document.querySelector('.history-page__purchases');
const searchInputBox = document.querySelector('.search__input-box');

function createPurchaseInfo(name, created_time, order_id) {
  const purchaseInfo = document.createElement('div');
  purchaseInfo.setAttribute('data-order-id', order_id);

  const purchaseTitle = document.createElement('h4');
  // purchaseTitle.className = 'purchase__title';
  purchaseTitle.innerHTML = name;

  const purchaseDate = document.createElement('p');
  // purchaseDate.className = 'purchase__date';
  purchaseDate.innerHTML = getFormattedDate(created_time);

  const purchaseDetailsBtn = document.createElement('button');
  purchaseDetailsBtn.className = 'btn mb-2 order-details-btn';
  purchaseDetailsBtn.innerHTML = 'Details';

  purchaseInfo.appendChild(purchaseTitle);
  purchaseInfo.appendChild(purchaseDate);
  purchaseInfo.appendChild(purchaseDetailsBtn);
  return purchaseInfo;
}

function createPurchasePrice(price) {
  const purchasePrice = document.createElement('h4');
  purchasePrice.className = 'purchase__price';
  purchasePrice.innerHTML = price;
  return purchasePrice;
}

function hasPurchasesListChanged(purchasesArr) {
  const purchaseNameList = purchasesArr
    .map((purchase) => purchase.name)
    .join('');
  const currentPurchaseTitleDivs = document.querySelectorAll(
    '.purchase__title',
  );
  const currentPurchaseTitles = [];
  for (let i = 0; i < currentPurchaseTitleDivs.length; i++) {
    currentPurchaseTitles.push(currentPurchaseTitleDivs[i].innerText);
  }
  return currentPurchaseTitles.join('') !== purchaseNameList;
}

function createHistoryPagePurchases(purchasesArr) {
  purchases.innerHTML = '';
  for (let i = 0; i < purchasesArr.length; i++) {
    const {
      created_time,
      total_price,
      order_id
    } = purchasesArr[i];
    const purchase = document.createElement('div');
    purchase.className = 'purchase';


    const purchaseInfo = createPurchaseInfo(`Order#${i}`, created_time, order_id); //name

    const purchasePrice = createPurchasePrice(total_price);

    purchase.appendChild(purchaseInfo);
    purchase.appendChild(purchasePrice);

    purchases.appendChild(purchase);

    const hr = document.createElement('hr');
    hr.className = 'mb-4';
    purchases.appendChild(hr);

  }
}

function createSearchResults(e) {
  const searchInput = e.target.value.toLowerCase().replace(/\s/g, '');
  // switch to a filter
  const searchResults = purchaseData.filter((purchase) => {
    const purchaseName = purchase.name
      .toLowerCase()
      .replace(/\s/g, '')
      .slice(0, searchInput.length);
    return searchInput === purchaseName;
  });
  if (searchInput === '') {
    createHistoryPagePurchases(purchaseData);
  } else if (hasPurchasesListChanged(searchResults)) {
    createHistoryPagePurchases(searchResults);
  }
}

function getFormattedDate(date) {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat('en', {
    year: 'numeric'
  }).format(d);
  const mo = new Intl.DateTimeFormat('en', {
    month: 'short'
  }).format(d);
  const da = new Intl.DateTimeFormat('en', {
    day: '2-digit'
  }).format(d);
  return (`${da}-${mo}-${ye}`);
}


searchInputBox && searchInputBox.addEventListener('keyup', createSearchResults);