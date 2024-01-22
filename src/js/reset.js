function handleReset(event) {
	event.preventDefault();
	favouriteSeries = [];
	favouriteSection.innerHTML = '';
	resultSection.innerHTML = '';
	inputText.value = '';
	resultSection.classList.add('hidden');
	favouriteSection.classList.add('hidden');
	localStorage.removeItem('favourites');
}
btnReset.addEventListener('click', handleReset);
