window.onscroll = function() {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	var banner = document.getElementsByClassName("header__banner")[0];
	window.y = scrolled;
	if (window.y >= (banner.offsetHeight - 5 * 18)) {
		fixMenu();
	} else {
		unfixMenu();
	}
}

function fixMenu() {
	var header = document.getElementsByClassName('header')[0];
	header.classList.add("_fixed");
}

function unfixMenu() {
	var header = document.getElementsByClassName('header')[0];
	header.classList.remove("_fixed");
}
