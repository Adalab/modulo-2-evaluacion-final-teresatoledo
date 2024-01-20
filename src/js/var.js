const inputText = document.querySelector('.js-searchInput');
const btnSearch = document.querySelector('.js-btnSearch');
const btnReset = document.querySelector('.js-btnReset');
const main = document.querySelector('.js-main');
const resultSection = document.querySelector('.js-result');
const favouriteSection = document.querySelector('.js-favourites');
const resultList = document.querySelector('.js-result-list');
const favouritesList = document.querySelector('.js-favourites-list');

const noImg =
	'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const defaultImg =
	'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdicesabajio.com.mx%2Fproducto%2Facs-h-cp-ext%2F&psig=AOvVaw3VrQMv7il9E_7zucN_dyHi&ust=1705693883154000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPi7hYXb54MDFQAAAAAdAAAAABAI';
