/*El botón reset: 
1. Vuelve el array de favoritos a vacío
2. Borra la info de la sección de favoritos y de resultados
3. Vacía el input
4. Le añade la clase hidden a todos los elementos
5. Vacía el localStorage*/
function handleReset(event) {
	event.preventDefault();
	favouriteSeries = [];
	favouriteSection.innerHTML = '';
	resultSection.innerHTML = '';
	inputText.value = '';
	resultSection.classList.add('hidden');
	favouriteSection.classList.add('hidden');
	btnDeleteAll.classList.add('hidden');
	localStorage.removeItem('favourites');
}
btnReset.addEventListener('click', handleReset);
