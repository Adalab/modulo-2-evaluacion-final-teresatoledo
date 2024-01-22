let seriesList = [];
let favouriteSeries = [];

function renderFavourites(favouriteSeries) {
	favouriteSection.innerHTML = '';
	for (const eachResult of favouriteSeries) {
		let serieImg = eachResult.images.jpg.image_url;
		favouriteSection.innerHTML += `<div class='newSerie favSerie' id='${eachResult.mal_id}'><img class='imgFav' src='${serieImg}' alt='Serie cover' > <p class='textFav'>${eachResult.title}</p> <i class="fa-solid fa-trash js-remove bin"></i></div> `;
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
		let serieImg = eachResult.images.jpg.image_url;
		if (serieImg === noImg) {
			serieImg = defaultImg;
		}
		const indexSerieFav = favouriteSeries.findIndex(
			(serie) => serie.mal_id === eachResult.mal_id
		);
		if (indexSerieFav !== -1) {
			resultSection.innerHTML += `<div class='newSerie js-newSerie' id='${eachResult.mal_id}'><img class="selected" src='${serieImg}' alt='Serie cover'> <p class="selectedText">${eachResult.title}</p></div>`;
		} else {
			resultSection.innerHTML += `<div class='newSerie js-newSerie' id='${eachResult.mal_id}'><img class='img' src='${serieImg}' alt='Serie cover'> <p class='text'>${eachResult.title}</p></div>`;
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
	btnDeleteAll.classList.remove('hidden');
	getDataApi();
}

btnSearch.addEventListener('click', handleSearch);
getLocalData();
