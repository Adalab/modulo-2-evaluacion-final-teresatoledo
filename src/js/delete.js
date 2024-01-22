function handleRemove(event) {
	favouriteSection.innerHTML = '';
	const idFavouriteClicked = parseInt(event.currentTarget.parentNode.id);

	const indexFav = favouriteSeries.indexOf(idFavouriteClicked);
	//INDEX FAV SIEMPRE DEVUELVE -1
	favouriteSeries.splice(indexFav, 1);

	renderFavourites(favouriteSeries);
}

function removeFavourite() {
	const bin = document.querySelectorAll('.js-remove');
	for (const eachBin of bin) {
		eachBin.addEventListener('click', handleRemove);
	}
}
