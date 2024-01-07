
const routes = {
	'#home': () => document.getElementById('home').style.display = 'block',
	'#game': () => document.getElementById('game').style.display = 'block',
};

function hideAll() {
	document.getElementById('home').style.display = 'none';
	document.getElementById('game').style.display = 'none';
}

function handleHashChange() {
	hideAll();
	switch (window.location.hash) {
		case '#home':
			document.getElementById('home').style.display = 'block';
			break;
		case '#game':
			document.getElementById('game').style.display = 'block';
			break;
		default:
	}
}

window.addEventListener('hashchange', handleHashChange);

handleHashChange();
