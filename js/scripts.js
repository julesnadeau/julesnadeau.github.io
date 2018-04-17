class App {
	// Code of main page processing
	static Init() {
		navbar_items.forEach(e => App.AddItemToNavbar(e));
		App.TriggerClickableNavBar();
		App.LoadTab(App.URLGetParameterByName("roll") || images[images.length - 1].split("/")[0] || "001"/*"000"*/);
	}
	
	// Code to add items to navbar
	static AddItemToNavbar(item) {
		const navbar = document.querySelector("ul#parent");
		const dir = (function(a) {
			a = (Math.floor(new Number(a.toString().replace(/[^0-9]/g, '')) / 10) * 10).toString();
			while (a.length < 3) a = "0" + a;
			return a.toString();
		})(item);
		
		if (item.substr(0, 3) != "<li") {
			if (navbar.innerHTML.indexOf(`<li class="par">` + dir + "</li>") == -1)
				navbar.innerHTML += `<li class="par">` + dir + `</li><li class="sub sub-` + dir + `"><ul><li class="item">` + item + "</li></ul></li>";
			else
				navbar.querySelector("li.sub-" + dir + " > ul").innerHTML += `<li class="item">` + item + "</li>";
		} else
			navbar.innerHTML += item;
	}
	
	// Code to add click effect to items in navbar
	static TriggerClickableNavBar() {
		// Code to allow navigation through navbar
		document.querySelectorAll("ul#parent > li.par").forEach(function(e) {
			e.addEventListener("click", function() {
				let el = document.querySelector("ul#parent > li.sub-" + this.innerHTML);
				if (el.style.display == "list-item")
					document.querySelectorAll("ul#parent > li.sub").forEach(function(f) {
						f.style.display = "none";
						e.classList.remove("selec");
					});
				else {
					document.querySelectorAll("ul#parent > li.sub").forEach(function(f) {
						f.style.display = "none";
						e.classList.remove("selec");
					});
					el.style.display = "list-item";
					document.querySelectorAll("ul#parent > li.par").forEach(function(f) {
						f.classList.remove("selec");
					});
					e.classList.add("selec");
				}
			});
		});
		
		// Code to allow navbar extension on mobile
		document.querySelector("div.nav > a").addEventListener("click", function() {
			document.querySelector("div.nav > nav").style.display = "inline-grid";
			this.style.display = "none";
		});
		
		// Code to allow navbar retraction on mobile
		document.querySelector("div.nav > nav > a").addEventListener("click", function() {
			document.querySelector("div.nav > nav").style.display = "";
			document.querySelector("div.nav > a").style.display = "";
		});
		
		// Code to allow navigation between tabs throught navbar
		document.querySelectorAll("ul#parent > li.sub > ul > li").forEach(function(e) {
			e.addEventListener("click", function() {
				App.LoadTab(this.innerHTML);
			});
		});
		
		// Code to allow special tabs to work properly
		document.querySelectorAll("ul#parent > li.spe").forEach(function(e) {
			e.addEventListener("click", function() {
				App.LoadSpecialTab(this.getAttribute("data-target"), this.innerHTML);
				App.UpdateNavbar(this);
			});
		});
	}
				
	// Code to get a parameter in the URL
	static URLGetParameterByName(key, url) {
		return (
			a => !a || !a[2] ? null : decodeURIComponent(a[2].replace(/\+/g, " "))
		)(new RegExp("[?&]" + key.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)").exec(url || window.location.href));
	}
	
	// Code to load data into the main container
	static LoadTab(name) {
		if (folder_repository.indexOf(name) == -1)
			App.Error(`The roll you requested ("` + name + `") doesn't exist.`);
		const container = document.querySelector("div.container");
		
		container.innerHTML = "";
		images.filter(e => new RegExp("^" + name, "g").test(e)).forEach(e => container.innerHTML += `<img class="lazyload" data-src="` + base_url + e + `" src="` + base_url + e.replace(name, name + "/thumbnail") + `" /><br />`);
		text.filter(e => new RegExp("^" + name, "g").test(e)).forEach(e => container.innerHTML += `<p class="info">` + App.HTTPRequest(base_url + e) + "</p>");
		
		document.querySelectorAll("ul#parent > li.sub > ul > li").forEach(function(e) {
			if (e.innerHTML != name)
				e.classList.remove("selec");
			else
				e.classList.add("selec");
		});
		
		if (!/iphone|android|samsung|blackberry/ig.test(navigator.userAgent))
			lazyload();
		
		App.AdjustPageTitle(name);
		
		App.Log(`Loaded tab "` + name + `"`);
	}
				
	// Code to load special tabs
	static LoadSpecialTab(path, name) {
		const container = document.querySelector("div.container");
		
		container.innerHTML = App.HTTPRequest(base_url + path);
		container.querySelectorAll("exec").forEach(function(e) {
			App.Exec(e);
		});
		App.UpdateNavbar();
		App.AdjustPageTitle(name);
		
		App.Log(`Loaded special tab "` + base_url + path + `"`);
	}
	
	// Code to manage errors
	static Error(error) {
		alert(error);
		throw new Error(error);
	}
	
	// Code to log data
	static Log() {
		console.log(...arguments);
	}
	
	// Code to make HTTP request
	static HTTPRequest(url) {
		xhr.open("GET", url, false);
		xhr.send(null);
		return xhr.responseText;
	}
	
	// Code to get values from code
	static Exec(element) {
		try {
			element.innerHTML = eval(element.getAttribute("value"));
		} catch(error) {
			console.error(error);
		}
	}
	
	// Code to adjust page title
	static AdjustPageTitle(name) {
		document.title = base_document_title + " | " + name;
	}
	
	// Code to adapt navbar styling
	static UpdateNavbar() {
		document.querySelectorAll(".selec").forEach(function(e) {
			e.classList.remove("selec");
		});
		
		if (arguments[0])
			arguments[0].classList.add("selec");
	}
}
			
// Code to allow github querying for data
const xhr = new XMLHttpRequest();
const base_document_title = document.title.toString();
const base_url = "https://raw.githubusercontent.com/julesnadeau/julesnadeau.github.io/master/ressources/img/";
const img_repository_url = JSON.parse(App.HTTPRequest("https://api.github.com/repositories/114405908/contents/ressources")).filter(e => e.name == "img")[0]._links.git.toString() + "?recursive=1";
const img_repository_data = JSON.parse(App.HTTPRequest(img_repository_url))

if (img_repository_data.truncated == true)
	App.Error("It seems that the server truncated the data");

const folder_repository = img_repository_data.tree.filter(e => e.type == "tree").filter(e => ! /(thumbnail)/g.test(e.path)).map(e => e.path);
const files = img_repository_data.tree.filter(e => e.type == "blob");
const images = files.filter(e => /(\.jpg$)|(\.jpeg$)|(\.png$)/g.test(e.path)).filter(e => ! /(thumbnail)/g.test(e.path)).map(e => e.path);
const text = files.filter(e => /(description\.txt$)/g.test(e.path)).map(e => e.path);

var navbar_items = [
	"<li>Galerie</li>", 
	...folder_repository, 
	"<li></li>", 
	`<li class="spe item" data-target="../about.txt">À propos</li>`, 
	"<li></li>", 
	`<li><a href="https://www.instagram.com/pangae.a/" target="_blank">Instagram</a></li>`
];

App.Init(); // Main assembling method
