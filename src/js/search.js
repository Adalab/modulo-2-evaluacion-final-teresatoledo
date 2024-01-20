let seriesList = [];
let favouriteSeries = [];

function renderFavourites(array) {
	for (const eachResult of array) {
		let newSerie = document.createElement('div'); //TIENE MAS SENTIDO UN LI
		newSerie.setAttribute('class', 'newSerie js-newSerie');
		newSerie.setAttribute('id', eachResult.mal_id);
		favouriteSection.appendChild(newSerie);
		let serieImg = eachResult.images.jpg.image_url;
		newSerie.innerHTML = `<img src='${serieImg}' alt='Serie cover' > <p>${eachResult.title}</p>`;
		if (serieImg === noImg) {
			serieImg = defaultImg;
		}
		renderSerie(seriesList);

		//FAVORITESERIES(array) solo guarda el último valor que se añade, siempre tiene un único elemento
		console.log(favouriteSeries);
		//Guarda solo el último elemento al que le pincho y lo va pisando
		localStorage.setItem('favourites', JSON.stringify(favouriteSeries));
	}
}

function handleFavourite(event) {
	const idSerieClicked = parseInt(event.currentTarget.id);
	const findSerieId = seriesList.find(
		(serie) => idSerieClicked === serie.mal_id
	);
	const indexSerieFav = favouriteSeries.findIndex(
		(serie) => serie.mal_id === idSerieClicked
	);

	if (indexSerieFav === -1) {
		favouriteSeries = [];
		favouriteSeries.push(findSerieId);
	} else {
		//favouriteSeries.splice(indexSerieFav, 1);
	}
	renderFavourites(favouriteSeries);
}

function listenerSerie() {
	const allSeries = document.querySelectorAll('.js-newSerie');
	for (const eachSerie of allSeries) {
		eachSerie.addEventListener('click', handleFavourite);
	}
}

function renderSerie(result) {
	for (const eachResult of result) {
		let newSerie = document.createElement('div'); //TIENE MAS SENTIDO UN LI
		newSerie.setAttribute('class', 'newSerie js-newSerie');
		newSerie.setAttribute('id', eachResult.mal_id);
		resultSection.appendChild(newSerie);
		let serieImg = eachResult.images.jpg.image_url;
		newSerie.innerHTML = `<img src='${serieImg}' alt='Serie cover'> <p>${eachResult.title}</p>`;
		if (serieImg === noImg) {
			serieImg = defaultImg;
		}
		//Meto este if dentro de renderserie para indicarle directamente quién es el padre de newserie y vuelvo a llamar a esta función dentro de renderfavourites para que la vuelva a ejecutar y evalúe esta condición, pero no entra aquí una vez la llamo desde renderfavourites.
		// if (
		// 	seriesList.includes(eachResult.mal_id) &&
		// 	favouritesList.includes(eachResult.mal_id)
		// ) {
		// 	newSerie.innerHTML = `<img class="alreadyFavourite" src='${serieImg}' alt='Serie cover'> <p class="alreadyFavouriteText">${eachResult.title}</p>`;
		// }
		listenerSerie();
	}
}
function getDataApi() {
	let inputValue = inputText.value.toLowerCase();
	fetch(`https://api.jikan.moe/v4/anime?
  q=${inputValue}`)
		.then((response) => response.json())
		.then((result) => {
			seriesList = result.data;
			inputText.value = '';
			renderSerie(seriesList);
		});
}

function handleSearch(event) {
	event.preventDefault();
	resultSection.innerHTML = '';
	//JSON.parse(localStorage.getItem('favourites'));
	getDataApi();
}

btnSearch.addEventListener('click', handleSearch);
