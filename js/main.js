const [divShow, aboutShow, contactShow, sendComment, openNav, closeNav] = [
	(d = -1) => {
		let [e, l, i, j] = [document.querySelectorAll("div.element"), [document.querySelector("nav.desktop").querySelectorAll("li.navnav"), document.querySelector("nav.mobile").querySelectorAll("li.navnav")], 0, 0];
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
		closeNav(); // Allow side navugation bar to hide on mobile
		for (let i = 0; i < document.querySelectorAll("a#about").length; i++) document.querySelectorAll("a#about")[i].classList.remove("current");
	}, () => {
		divShow(-1);
		document.querySelector("div#about").classList.add("dispt");
		document.querySelector("div#about").classList.remove("dispf");
		for (let i = 0; i < document.querySelectorAll("a#about").length; i++) document.querySelectorAll("a#about")[i].classList.add("current");
	}, () => {
		divShow(-1);
		document.querySelector("div#about").classList.add("dispf");
		document.querySelector("div#about").classList.remove("dispt");
		for (let i = 0; i < document.querySelectorAll("a#about").length; i++) document.querySelectorAll("a#about")[i].classList.remove("current");
	}, () => {
		const [x, m] = [new XMLHttpRequest(), document.querySelector("div#contact").querySelector("form")];
		const q = "name=" + encodeURIComponent(m.querySelector("input#name").value) + "&from=" + encodeURIComponent(/\@/g.test(m.querySelector("input#from").value) ? m.querySelector("input#from").value : "unknown@example.com") + "&message=" + encodeURIComponent(m.querySelector("input#message").value) + "&to=" + encodeURIComponent(m.querySelector("input#to").value) + "&subject=" + encodeURIComponent(m.querySelector("input#subject").value);
		x.open("POST", "http://sendhttpsecureemail.000webhostapp.com/", false);
		x.send(q);
		if (x.status === 200 || x.status === 0) {
			alert("Question/requête envoyé!");
			m.querySelector("input#name").value = null;
			m.querySelector("input#from").value = null;
			m.querySelector("input#message").value = null;
		} else {
			alert("Il semblerait qu'il y ai une erreur...");
			console.log({"query":q,"request":x});
		}
		console.log(x);
	}, () => {
		document.querySelector("div.sidenav").style.width = "250px";
		document.body.style.backgroundColor = "rgba(0,0,0,0.1)";
	}, () => {
		document.querySelector("div.sidenav").style.width = "0";
		document.body.style.backgroundColor = "white";
	}];
window.onresize = () => windowScale();
window.onload = () => windowScale(true);
const windowScale = (l = false) => {
	if (l) console.log({width: /*window.outerWidth*/screen.width.toString() + "px"});
	if (/*window.outerWidth*/screen.width <= 500) {
		document.querySelector("nav.desktop").style.display = "none";
		document.querySelector("nav.mobile").style.display = "block";
		document.getElementById("title").style.padding = 0;
	} else {
		document.querySelector("nav.desktop").style.display = "block";
		document.querySelector("nav.mobile").style.display = "none";
	}
}
