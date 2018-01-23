const divShow = (d = -1) => {
	let e = document.querySelectorAll("div.element"), 
	    l = [document.querySelector("nav").querySelectorAll("li.navnav")], 
	    i = 0, 
	    j = 0;
	for (i = 0; i < e.length; i++)
		if (i == (d - 1)) {
			e[i].classList.add("dispt");
			e[i].classList.remove("dispf");
		} else {
			e[i].classList.add("dispf");
			e[i].classList.remove("dispt");
		}
	for (j = 0; j < l.length; j++) for (i = 0; i < l[j].length; i++) if (i == (d - 1)) l[j][i].classList.add("current"); else l[j][i].classList.remove("current");
	document.querySelector("div#about").classList.add("dispf");
	document.querySelector("div#about").classList.remove("dispt");
	$("html, body" || window).animate({scrollTop: 0}, 500); // Allow page to scroll back to top on-pannel-change
	closeNav(); // Allow side navigation bar to hide on mobile
	for (let i = 0; i < document.querySelectorAll("a#about").length; i++) document.querySelectorAll("a#about")[i].classList.remove("current");
};
const aboutShow = () => {
	divShow(-1);
	document.querySelector("div#about").classList.add("dispt");
	document.querySelector("div#about").classList.remove("dispf");
	for (let i = 0; i < document.querySelectorAll("a#about").length; i++) document.querySelectorAll("a#about")[i].classList.add("current");
};
const openNav = () => {
	document.querySelector("div.sidenav").style.width = "250px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.1)";
};
const closeNav = () => {
	document.querySelector("div.sidenav").style.width = "0";
	document.body.style.backgroundColor = "white";
};
