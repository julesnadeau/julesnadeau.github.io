const app = {
	build: (a, b = d => void(d), c = undefined) => {
		let nav = [], container = [], oc = 0;

		if (a.elements) a
			.elements
			.forEach(e => {
				if (typeof e == 'object') {
					nav = nav.concat('<li class="navnav' + (oc == 0 ? ' current' : '') + '" id="' + (e.name || '') + '"><a onclick="divShow(\'' + (e.name || '') + '\')">' + (e.name || '') + '</a></li>');
					container = container.concat('<div id="' + (e.name || '') + '" class="element' + (oc == 0 ? '' : ' dispf') + '">' + (r => r.map(d => '<img data-src="' + d.replace(/(\/thumbnail\/)/g, '/') + '" src="' + d + '" class="lazyload" />').join('\n'))(e.images || []) + '<p><span class="center info">' + (e.description || '') + '</span></p></div>');
					oc++;
				} else nav = nav.concat(e);
			});

		document.body.innerHTML = '<div class="nav"><a href="" id="title" style="outline: 0; text-decoration: none; font-size: smaller; padding-bottom: 5px; padding-left: 5px;">JULES NADEAU</a><nav><a id="openNav" onclick="Nav.open()" style="border-radius: 15%; border: 1px solid #777777;">&#9776;</a><div class="sidenav"><ul class="no-bullet" style="font-size: smaller;"><a id="closeNav" onclick="Nav.close()">&times;</a>\n' + nav.join('\n') + '\n</ul></div></nav></div>\n' + '<div class="container">\n' + container.join('\n') + '\n</div>\n';

		b(c);
	}
};

const divShow = d => {
	$("html, body" || window)
		.animate({ scrollTop: 0 }, 500);

	document
		.querySelectorAll('div.element')
		.forEach(e => e.classList[e.id != d ? 'add' : 'remove']('dispf'));
	document
		.querySelector('div.sidenav')
		.querySelectorAll('li.navnav')
		.forEach(e => e.classList[e.id == d ? 'add' : 'remove']('current'));
	
	Nav.close();
};

const Nav = {
	open: () => {
		document.querySelector("div.sidenav").style.width = "250px";
		document.body.style.backgroundColor = "rgba(0,0,0,0.1)";
	}, 
	close: () => {
		document.querySelector("div.sidenav").style.width = "0";
		document.body.style.backgroundColor = "white";
	}
};
