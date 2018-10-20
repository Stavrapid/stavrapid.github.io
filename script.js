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

window.onload = function (fontFaceSetEvent) {
	setTimeout(function () {
 	   document.getElementById("stavrapid_logo").style.animation = "fade-out 1s both cubic-bezier(.42,.17,.28,1)";
 	   document.getElementById("main_page").style.display = "block";
	}, 2000);
};
