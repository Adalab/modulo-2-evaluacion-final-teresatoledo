function handleRemove(event) {
	//Vuelve la sección de favoritos a vacío, busca el id del padre de la papelera clicada, busca el index en el array de favoritos, con el splice lo elimina y vuelve a renderizar los favoritos.
	favouriteSection.innerHTML = '';
	const idFavouriteClicked = parseInt(event.currentTarget.parentNode.id);
	const indexFav = favouriteSeries.findIndex(
		(serie) => serie.mal_id === idFavouriteClicked
	);
	favouriteSeries.splice(indexFav, 1);
	localStorage.removeItem('favourites');
	renderFavourites(favouriteSeries);
	renderSerie(seriesList);
	if (favouriteSeries.length === 0) {
		favouriteSection.classList.add('hidden');
		btnDeleteAll.classList.add('hidden');
	}
}

function removeFavourite() {
	const bin = document.querySelectorAll('.js-remove');
	for (const eachBin of bin) {
		eachBin.addEventListener('click', handleRemove);
	}
}

function handleRemoveAll() {
	favouriteSection.innerHTML = '';
	localStorage.removeItem('favourites');
	favouriteSeries = [];
	renderSerie(seriesList);
}
btnDeleteAll.addEventListener('click', handleRemoveAll);
