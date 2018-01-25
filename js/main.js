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
