function geId(elem) {
	return (document.getElementById(elem));
}

function geClass(elem) {
	return (document.getElementsByClassName(elem));
}

var title_created = false;
var title_num = 0;

function find_title() {
	var max = geClass("page_title")[0].getBoundingClientRect().top;
	for ( var i = 0; i < geClass("page_title").length; i++ ) {
		if ( geClass("page_title")[i].getBoundingClientRect().top < 0 && geClass("page_title")[i].getBoundingClientRect().top > max ) {
			max = geClass("page_title")[i].getBoundingClientRect().top;
			title_num = i;
		}
	}
}

function nested_title_scroll() {
	var scrolled = window.pageYOffset || document.documentElement.scrollTop;
	var tt = geClass("page_title")[title_num].getBoundingClientRect().top;

	if (tt <= 0 && !(title_created)) {
		title_created = true;
		/*if ((geClass("page_title")[title_num + 1].getBoundingClientRect().top) < 0) {
			title_num++;
			geId("page_title_fixed").style.top = "0px";
		}*/
		var newTitle = document.createElement("div");
		newTitle.id = "page_title_fixed";
		newTitle.style.top = "0px";
		newTitle.innerHTML = geClass("page_title")[title_num].innerHTML;
		newTitle.style.color = geClass("page_title")[title_num].style.color;
		newTitle.style.background = geClass("page_title")[title_num].style.background;
		document.body.appendChild(newTitle);
		//console.log("created " + title_num);
		var headerLogo = document.createElement("div");
		headerLogo.id = "header_logo";
		headerLogo.addEventListener('click', () => {
		  scrollToElem(document.getElementById("logo"));
		});
		document.body.appendChild(headerLogo);
	}

	if (geId("page_title_fixed").style.top == "0px") {
		geId("page_title_fixed").style.boxShadow = ""/*"0px 0px 20px 10px rgba(0,0,0,0.75)"*/;
	} else {
		geId("page_title_fixed").style.boxShadow = "initial"/*"0px 0px 20px 10px rgba(0,0,0,0)"*/;
	}

	if (tt > 0 && title_created && (title_num == 0 || title_num == -1)) {
		title_created = false;
		document.body.removeChild(geId("page_title_fixed"));
		document.body.removeChild(geId("header_logo"));
		document.body.style.overflowY = "hidden";
		scrollToElem(document.getElementById("logo"));
		title_num == 0;
		// console.log("=NEST BEEN REMOVED=");
		// console.log("=" + title_num + "=");
	}

	if (tt < 0 && title_created && title_num != geClass("page_title").length - 1) {
		title_created = true;
			if ((geClass("page_title")[title_num + 1].getBoundingClientRect().top <= geId("page_title_fixed").getBoundingClientRect().height) && (geClass("page_title")[title_num + 1].getBoundingClientRect().top >=0 )) {
			if (geClass("page_title")[title_num + 1].getBoundingClientRect().top >= 0) {
				geId("page_title_fixed").style.top = 0 - (geId("page_title_fixed").getBoundingClientRect().height - geClass("page_title")[title_num + 1].getBoundingClientRect().top) + "px";
			} else {
					geId("page_title_fixed").style.top = "0px";
			}
		}  else {
			geId("page_title_fixed").style.top = "0px";
		}
		if ((geClass("page_title")[title_num + 1].getBoundingClientRect().top) < 0) {
			title_num++;
			geId("page_title_fixed").style.top = "0px";
			//geId("page_title_fixed").style.top = 0 - (61 - geClass("page_title")[title_num - 1].getBoundingClientRect().top) + "px";
		}
		geId("page_title_fixed").innerHTML = geClass("page_title")[title_num].innerHTML;
		geId("page_title_fixed").style.color = geClass("page_title")[title_num].style.color;
		geId("page_title_fixed").style.background = geClass("page_title")[title_num].style.background;
		//console.log("tt < 0");
	}

	if (tt > 0 && title_created && title_num != 0) {
		title_created = true;
		if ((geClass("page_title")[title_num - 1].getBoundingClientRect().top) > 0) {
			//title_num--;
		}
		if ((geClass("page_title")[title_num - 1].getBoundingClientRect().top) < 0) {
			title_num--;
			geId("page_title_fixed").style.top = "-" + geId("page_title_fixed").getBoundingClientRect().height + "px";
		}
		geId("page_title_fixed").innerHTML = geClass("page_title")[title_num].innerHTML;
		geId("page_title_fixed").style.color = geClass("page_title")[title_num].style.color;
		geId("page_title_fixed").style.background = geClass("page_title")[title_num].style.background;
		//console.log("tt > 0");
	}

	// if (tt > 0 && title_created && (title_num == 0 || title_num == -1)) {
	// 	title_created = false;
	// 	document.body.removeChild(geId("page_title_fixed"));
	// 	document.body.removeChild(geId("header_logo"));
	// 	title_num == 0;
	// 	console.log("=NEST BEEN REMOVED=");
	// 	console.log("=" + title_num + "=");
	// }

	//console.log(title_num);
	//console.log(geClass("page_title")[0].getBoundingClientRect().top);
}




function animate(elem, style, unit, from, to, time, prop) {
    if (!elem) {
        return;
    }
    var start = new Date().getTime(),
        timer = setInterval(function () {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
                elem[style] = (from + step * (to - from))+unit;
            } else {
                elem.style[style] = (from + step * (to - from))+unit;
            }
            if (step === 1) {
                clearInterval(timer);
            }
        }, 0.001);
    if (prop) {
		elem[style] = from + unit;
    } else {
		elem.style[style] = from + unit;
    }
}


var animateHTML = function() {
	var elems,
  		windowHeight

	var init = function() {
		elems = document.getElementsByClassName("hidden");
		windowHeight = window.innerHeight;
		_addEventHandlers();
	}

	var _addEventHandlers = function() {
		window.addEventListener("scroll", _checkPosition);
		window.addEventListener("resize", init)
	}

	var _checkPosition = function() {
		for ( var i = 0; i < elems.length; i++ ) {
			var posFromTop = elems[i].getBoundingClientRect().top;
			if ( posFromTop - windowHeight <= 0 ) {
				elems[i].className = elems[i].className.replace( "hidden", "fade-in" );
			}
		}
	}

	return {
		init: init
	}
}

animateHTML().init();


function toggleMainNav(page) {
	console.log(page);
	document.getElementById("main_nav").setAttribute ("class", "--" + page + "_3--active");
	document.getElementById("main_nav--mobile").setAttribute ("class", "--" + page + "_3--active");
	document.getElementById("shit").setAttribute("style", "transition: 1s cubic-bezier(.42,.17,.28,1); transform: translateX(-" + (page - 1) * 100 + "vw)");
	document.body.setAttribute ("class", "--" + page + "_3--active");
}


function logIn() {
	document.getElementById("stavrapid_logo").style.pointerEvents = "none";
	document.getElementById("main_page").style.display = "block";
	setTimeout(function () {
		document.getElementById("stavrapid_logo").style.animation = "fade-out 1s both cubic-bezier(.42,.17,.28,1)";
	}, 100);
}

var password = "52375";
var input = "";

function setInput( x ) {
	var dots = document.getElementsByClassName("numpad_input_dot");
	if ( x == 0 ) {
		document.getElementsByClassName("numpad_input_wrapper")[0].classList.add("invalid");
		for (var i = 0; i < dots.length; i++) {
			dots[i].classList.remove("filled");
		}

	} else {
		dots[x-1].classList.add("filled");
	}
}

var keyDown = function (e) {
	var key = e.which || e.keyCode;
	console.log(key);
	switch(key) {
		case 96:
		case 48:
			var button = document.querySelector("button[name = numbutton_0]");
			button.classList.add('active');
			break;
		case 97:
		case 49:
			var button = document.querySelector("button[name = numbutton_1]");
			button.classList.add('active');
			break;
		case 98:
		case 50:
			var button = document.querySelector("button[name = numbutton_2]");
			button.classList.add('active');
			break;
		case 99:
		case 51:
			var button = document.querySelector("button[name = numbutton_3]");
			button.classList.add('active');
			break;
		case 100:
		case 52:
			var button = document.querySelector("button[name = numbutton_4]");
			button.classList.add('active');
			break;
		case 101:
		case 53:
			var button = document.querySelector("button[name = numbutton_5]");
			button.classList.add('active');
			break;
		case 102:
		case 54:
			var button = document.querySelector("button[name = numbutton_6]");
			button.classList.add('active');
			break;
		case 103:
		case 55:
			var button = document.querySelector("button[name = numbutton_7]");
			button.classList.add('active');
			break;
		case 104:
		case 56:
			var button = document.querySelector("button[name = numbutton_8]");
			button.classList.add('active');
			break;
		case 105:
		case 57:
			var button = document.querySelector("button[name = numbutton_9]");
			button.classList.add('active');
			break;
	}
};

var keyUp = function (e) {
	var key = e.which || e.keyCode;
	// console.log(key);
	switch(key) {
		case 96:
		case 48:
			var button = document.querySelector("button[name = numbutton_0]");
			button.click();
			button.classList.remove('active');
			break;
		case 97:
		case 49:
			var button = document.querySelector("button[name = numbutton_1]");
			button.click();
			button.classList.remove('active');
			break;
		case 98:
		case 50:
			var button = document.querySelector("button[name = numbutton_2]");
			button.click();
			button.classList.remove('active');
			break;
		case 99:
		case 51:
			var button = document.querySelector("button[name = numbutton_3]");
			button.click();
			button.classList.remove('active');
			break;
		case 100:
		case 52:
			var button = document.querySelector("button[name = numbutton_4]");
			button.click();
			button.classList.remove('active');
			break;
		case 101:
		case 53:
			var button = document.querySelector("button[name = numbutton_5]");
			button.click();
			button.classList.remove('active');
			break;
		case 102:
		case 54:
			var button = document.querySelector("button[name = numbutton_6]");
			button.click();
			button.classList.remove('active');
			break;
		case 103:
		case 55:
			var button = document.querySelector("button[name = numbutton_7]");
			button.click();
			button.classList.remove('active');
			break;
		case 104:
		case 56:
			var button = document.querySelector("button[name = numbutton_8]");
			button.click();
			button.classList.remove('active');
			break;
		case 105:
		case 57:
			var button = document.querySelector("button[name = numbutton_9]");
			button.click();
			button.classList.remove('active');
			break;
	}
};

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

function numButtonClicked( num ) {
	input += num.toString();
	if ( input.length == 5 ) {
		if ( input == password ) {
			document.getElementById("stavrapid_logo").classList.remove("loaded");
			setTimeout(function () {
				window.removeEventListener("keydown", keyDown);
				window.removeEventListener("keyup", keyUp);
				logIn();
			}, 1500);
		} else {
			document.getElementsByClassName("numpad_input_wrapper")[0].classList.remove("invalid");
			setTimeout(function () {
				input = "";
				setInput( input.length );
			}, 500);
		}
	}
	setInput( input.length );
}

window.onload = function (fontFaceSetEvent) {
	toggleMainNav(2);
	document.getElementById("stavrapid_logo").classList.add("loaded");
	setTimeout(function () {
		// logIn();
	}, 2000);
};
