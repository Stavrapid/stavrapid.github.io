window.onscroll = function() {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	var banner = document.getElementsByClassName("header__banner")[0];
	var el = document.getElementsByTagName('html')[0];
	var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
	var fontSize = parseFloat(style);
	window.y = scrolled;
	if (window.y >= (banner.offsetHeight - 5 * fontSize)) {
		fixMenu();
	} else {
		unfixMenu();
	}
}

function fixMenu() {
	var header = document.getElementsByClassName('header')[0];
	header.classList.add("_fixed");
	// document.getElementsByClassName("header__banner")[0].style.display = "none";
}

function unfixMenu() {
	var header = document.getElementsByClassName('header')[0];
	header.classList.remove("_fixed");
}
