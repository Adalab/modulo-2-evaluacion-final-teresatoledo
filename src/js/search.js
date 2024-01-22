let seriesList = [];
let favouriteSeries = [];

function renderFavourites(favouriteSeries) {
	favouriteSection.innerHTML = '';
	for (const eachResult of favouriteSeries) {
		let newSerie = document.createElement('li');
		newSerie.setAttribute('class', 'newSerie favSerie');
		newSerie.setAttribute('id', eachResult.mal_id);
		favouriteSection.appendChild(newSerie);
		let serieImg = eachResult.images.jpg.image_url;
		newSerie.innerHTML = `<img class='imgFav' src='${serieImg}' alt='Serie cover' > <p class='textFav'>${eachResult.title}</p> <i class="fa-solid fa-trash js-remove bin"></i> `;
		if (serieImg === noImg) {
			serieImg = defaultImg;
		}
		localStorage.setItem('favourites', JSON.stringify(favouriteSeries));
		removeFavourite();
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
		favouriteSeries.push(findSerieId);
	} else {
		favouriteSeries.splice(indexSerieFav, 1);
	}
	console.log(favouriteSeries);
	renderFavourites(favouriteSeries);
	renderSerie(seriesList);
}

function listenerSerie() {
	const allSeries = document.querySelectorAll('.js-newSerie');
	for (const eachSerie of allSeries) {
		eachSerie.addEventListener('click', handleFavourite);
	}
}

function renderSerie(result) {
	resultSection.innerHTML = '';
	for (const eachResult of result) {
		let newSerie = document.createElement('li');
		newSerie.setAttribute('class', 'newSerie js-newSerie');
		newSerie.setAttribute('id', eachResult.mal_id);
		resultSection.appendChild(newSerie);
		let serieImg = eachResult.images.jpg.image_url;

		if (serieImg === noImg) {
			serieImg = defaultImg;
		}

		const indexSerieFav = favouriteSeries.findIndex(
			(serie) => serie.mal_id === eachResult.mal_id
		);
		if (indexSerieFav !== -1) {
			newSerie.innerHTML = `<img class="selected" src='${serieImg}' alt='Serie cover'> <p class="selectedText">${eachResult.title}</p>`;
		} else {
			newSerie.innerHTML = `<img class='img' src='${serieImg}' alt='Serie cover'> <p class='text'>${eachResult.title}</p>`;
		}
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

function getLocalData() {
	//EJECUTAR CUANDO CARGA LA PAG (FUERA) CUIDADO PORQUE SI NO HAY NADA, NO PINTA
	const localFavourites = JSON.parse(localStorage.getItem('favourites'));
	if (localFavourites) {
		favouriteSection.classList.remove('hidden');
		favouriteSeries = localFavourites;
		renderFavourites(favouriteSeries);
	}
}

function handleSearch(event) {
	event.preventDefault();

	resultSection.classList.remove('hidden');
	favouriteSection.classList.remove('hidden');

	getDataApi();
}

btnSearch.addEventListener('click', handleSearch);
getLocalData();
