/*handleRemove:
1. Vuelve la sección de favoritos a vacío
2. Busca el id del padre de la papelera clicada
3. Busca el index en el array de favoritos, con el splice lo elimina y vuelve a renderizar los favoritos.
4. Si el array de favoritos está vacío, le añade la clase hidden a la sección y al botón de eliminar todos los favoritos*/

function handleRemove(event) {
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
/*removeFavourite:
1. Creo el arrau de todas las papeleras
2. Lo recorro y creo un evento por cada uno de ellas*/
function removeFavourite() {
	const bin = document.querySelectorAll('.js-remove');
	for (const eachBin of bin) {
		eachBin.addEventListener('click', handleRemove);
	}
}
/*handleRemoveAll
1. Vacío la sección
2. Elimino los datos del localStorage
3. Vacío el array
4. Renderizo los resultados para que se le aplique el cambio de clases (eliminar el selected al que lo tuviese)*/
function handleRemoveAll() {
	favouriteSection.innerHTML = '';
	localStorage.removeItem('favourites');
	favouriteSeries = [];
	renderSerie(seriesList);
}
btnDeleteAll.addEventListener('click', handleRemoveAll);
