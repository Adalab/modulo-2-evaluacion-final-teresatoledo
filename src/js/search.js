let seriesList = [];
let favouriteSeries = [];

function handleFavourite(event) {
	const idSerieClicked = parseInt(event.currentTarget.id);
	const findSerieId = seriesList.find(
		(serie) => idSerieClicked === serie.mal_id
	);
	const indexSerieFav = favouriteSeries.findIndex(
		(serie) => serie.mal_id === idSerieClicked
	);

	if (indexSerieFav === -1) {
		favouriteSeries.push(findSerieId);
	}
	console.log(indexSerieFav);
	console.log(favouriteSeries);
	renderSerie(favouriteSeries, favouriteSection);
}

function listenerSerie() {
	const allSeries = document.querySelectorAll('.js-newSerie');
	for (const eachSerie of allSeries) {
		eachSerie.addEventListener('click', handleFavourite);
	}
}

function renderSerie(result, container) {
	for (const eachResult of result) {
		let newSerie = document.createElement('div');
		newSerie.setAttribute('class', 'newSerie js-newSerie');
		newSerie.setAttribute('id', eachResult.mal_id);
		container.appendChild(newSerie);
		let serieImg = eachResult.images.jpg.image_url;
		newSerie.innerHTML = `<img src='${serieImg}' alt='Serie cover' > <p>${eachResult.title}</p>`;
		if (serieImg === noImg) {
			serieImg = defaultImg;
		}
	}
	listenerSerie();
}

function getDataApi() {
	let inputValue = inputText.value.toLowerCase();
	fetch(`https://api.jikan.moe/v4/anime?
  q=${inputValue}`)
		.then((response) => response.json())
		.then((result) => {
			seriesList = result.data;
			inputText.value = '';
			renderSerie(seriesList, resultSection);
		});
}

function handleSearch(event) {
	event.preventDefault();
	resultSection.innerHTML = '';
	getDataApi();
}

btnSearch.addEventListener('click', handleSearch);
