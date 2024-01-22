let seriesList = [];
let favouriteSeries = [];

/*Renderfavourites:
1. Le elimina la clase hidden a la sección (para que solo aparezca el recuadro cuando se añada algo a favoritos y no aparezca el recuadro vacío) y al botón de eliminar todos los favoritos.
2. Vuelve a vacío la sección para que al llamarlo varias veces no se vayan duplicando los resultados
3. Recorre el array de favoritos y crea un div con el id, el título y la imagen de cada uno de los elementos del array
4. Si no tiene imagen, le pone una por defecto
5. Guarda los favoritos en el localStorage */
function renderFavourites(favouriteSeries) {
	favouriteSection.classList.remove('hidden');
	btnDeleteAll.classList.remove('hidden');
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

/*Handlefavourite:
1. Guarda en idSerieClicked el id de la serie sobre la que hemos hecho clic
2. Busca si ese id está en el array de resultados
3. Busca la posición en el array de favoritos del elemento clicado
4. Si la posición es -1 (no está en el array de favoritos), lo añade mediante el push
5. Si está en favoritos, lo quita, tomando como referencia la posición que hemos sacado con el findIndex (punto 3) 
6. Vuelve a pintar los favoritos (para mostrar el resultado de haber añadido o quitado) y además vuelve a renderizar los resultados para que se le apliquen o quiten la clase selected */
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
/*ListenerSerie: 
1. Todas las series que se pintan en la parte de resultados tienen la clase newSerie, hacemos un evento sobre todas y lo recorremos (porque devuelve un array)*/
function listenerSerie() {
	const allSeries = document.querySelectorAll('.js-newSerie');
	for (const eachSerie of allSeries) {
		eachSerie.addEventListener('click', handleFavourite);
	}
}
/*RenderSerie:
1. Vuelve la sección a vacío para que no se dupliquen los resultados
2. Si la longitud del array de favoritos es 0, oculta tanto la sección de favoritos como la del botón de borrar todo. Esto no se puede poner en renderFavourites porque no funciona
3. Recorremos el array de resultados: buscamos la posición del id en el array de favoritos y si NO devuelve -1 (SÍ está) lo añade al array de resultados con la clase de selected. Si NO está en el array (else) lo añade a resultados pero sin clase selected
4. Llamamos a listenerSerie una vez creado el li
*/
function renderSerie(result) {
	resultSection.innerHTML = '';
	if (favouriteSeries.length === 0) {
		favouriteSection.classList.add('hidden');
		btnDeleteAll.classList.add('hidden');
	}
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
/*GetDataApi: 
1. Hace la petición a la api añadiéndole el value del input, que es el nombre del anime que estoy buscando
2. Guardo el resultado en el array de resultados y se lo paso como parámetro a la función render. */
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
/*getLocalData:
1. Vuelve a array lo que había convertido en string
2. Si tiene información, le quita hidden a la sección de favoritos y renderiza los favoritos (la info del localStorage)*/
function getLocalData() {
	//EJECUTAR CUANDO CARGA LA PAG (FUERA) CUIDADO PORQUE SI NO HAY NADA, NO PINTA
	const localFavourites = JSON.parse(localStorage.getItem('favourites'));
	if (localFavourites) {
		favouriteSection.classList.remove('hidden');
		favouriteSeries = localFavourites;
		renderFavourites(favouriteSeries);
	}
}
/*handleSearch:
1. Le elimina la clase hidden a la sección de resultados cuando se ejecuta y llama a la función getDataApi para recibir los resultados de la búsqueda*/
function handleSearch(event) {
	event.preventDefault();
	resultSection.classList.remove('hidden');
	// favouriteSection.classList.remove('hidden');
	//btnDeleteAll.classList.remove('hidden');
	getDataApi();
}

btnSearch.addEventListener('click', handleSearch);

/*Se llama fuera para que busque en el localStorage nada más cargar la página*/
getLocalData();
