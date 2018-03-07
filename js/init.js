(function(a) {
	const xhr = new XMLHttpRequest(), 
		url = (function() {
			xhr.open('GET', 'https://api.github.com/repositories/114405908/contents/ressources', false);
			xhr.send(null);
			return JSON.parse(xhr.responseText).filter(e => e.name == 'img')[0]._links.git.toString();
		})() + '?recursive=1', 
		error = "Error while fetching data from '" + url + "'", 
		mainRoot = "https://julesnadeau.github.io/", 
		base = "./ressources/img/";
	let json, 
		files = [], 
		txt = [], 
		thumbnail = [], 
		photos = [], 
		dir = [], 
		retour = [], 
		txtRequest;
	
	xhr.onreadystatechange = function(event) {
		if (this.readyState != XMLHttpRequest.DONE)
			return;
		if (this.status != 200)
			return console.error(error);
	
		// Parse JSON data
		json = JSON.parse(xhr.responseText);
	
		if (json.truncated != false)
			return console.error(error);
	
		// Separate files from directories
		files = json.tree.filter(e => e.type == "blob");
		dir = json.tree.filter(e => e.type == "tree").filter(e => !(/thumbnail/g.test(e.path)));
	
		// Separate text files from photos
		txt = files.filter(e => /(description\.txt$)/g.test(e.path));
		photos = files.filter(e => /(\.jpg$)|(\.jpeg$)|(\.png$)/g.test(e.path)).filter(e => !(/\/thumbnail\//g.test(e.path)));
		thumbnail = files.filter(e => /(\.jpg$)|(\.jpeg$)|(\.png$)/g.test(e.path)).filter(e => /\/thumbnail\//g.test(e.path));
	
		// Add full prefix to names
		thumbnail.forEach(function(e) { e.name = base + e.path; });
		dir.forEach(function(e) { e.name = base + e.path; });
	
		// Get description for each rolls
		txtRequest = new Array(dir.length).fill(new XMLHttpRequest()).map(function(e, n) {
			e.open('GET', mainRoot + base + txt[n].path, false);
			e.send(null);
			return e.responseText;
		});
	
		// Render items
		dir.forEach((e, n) => retour.push({
			name: '/' + e.name.split('/').reverse()[0], 
			images: thumbnail.filter(f => new RegExp('^' + e.name.replace(/[\.\+\*\?\{\}\,\$\^\=\!]/g, function(g) { return '\\' + g; }), 'g').test(f.name)).map(h => mainRoot + h.name), 
			description: txtRequest[n] || ''
		}));
	
		console.log(retour);
		//return retour;

		//a(retour);
	}
	
	xhr.open('GET', url, true);
	xhr.send(null);
})();
