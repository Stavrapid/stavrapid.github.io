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
	var loginPage = document.getElementById("stavrapid_logo");
	loginPage.style.pointerEvents = "none";
	document.getElementById("main_page").style.display = "block";
	setTimeout(function () {
		document.getElementById("stavrapid_logo").style.animation = "fade-out 1s both cubic-bezier(.42,.17,.28,1)";
	}, 100);
	setTimeout(function () {
		loginPage.parentNode.removeChild(loginPage);
	}, 1000);
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

var UID = {
	_current: 0,
	getNew: function(){
		this._current++;
		return this._current;
	}
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value){
	var _this = this;
	var _sheetId = "pseudoStyles";
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	var className = "pseudoStyle" + UID.getNew();

	_this.className +=  " "+className;

	_sheet.innerHTML += "\n."+className+":"+element+"{"+prop+":"+value+"}";
	_head.appendChild(_sheet);
	return this;
};

function DragnZoom( dragItem ) {
	// var dragItem = document.querySelector("#item");
    // var container = document.querySelector("#container");
	var container = dragItem.parentNode;

    var active = false;
    var currentX = 0;
    var currentY = 0;
    var initialX = 0;
    var initialY = 0;
    var xOffset = 0;
    var yOffset = 0;

	var touchX;
	var touchY;

	var currentZoom = 1;
	var initialZoom = 1;

    container.addEventListener("touchstart", tapHandler);
    container.addEventListener("touchend", dragEnd, false);
    container.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    container.addEventListener("mouseup", dragEnd, false);
    container.addEventListener("mousemove", drag, false);

	container.addEventListener("dblclick", quickZoom, false);

	container.addEventListener("wheel", zoom, false);

	function resetZoomnDrag() {
		currentX = 0;
		currentY = 0;
		initialX = 0;
		initialY = 0;
		xOffset = 0;
		yOffset = 0;
		currentZoom = 1;
		dragItem.style.transition = '0.3s';
		document.getElementById("shadow").style.transition = '0.3s';
		document.getElementById("shadow").style.opacity = '1';
		setTranslate(currentZoom, currentX, currentY, dragItem);
	}

	function resetDrag() {
		dragItem.style.transition = '0.3s';
		document.getElementById("shadow").style.transition = '0.3s';
		document.getElementById("shadow").style.opacity = '1';
		setTranslate(currentZoom, currentX, currentY, dragItem);
	}

	function checkReset() {
		if ( currentY > ( ( dragItem.offsetHeight * currentZoom - container.offsetHeight ) / 2 ) + ( container.offsetHeight * 0.5 ) ) {
			currentY = container.offsetHeight * currentZoom;
			initialY = container.offsetHeight * currentZoom;
			yOffset = container.offsetHeight * currentZoom;
			resetDrag();
			killModalWin();
		} else {
			if ( currentZoom <= 1 ) {
			    resetZoomnDrag();
			} else {
				var overflowAnchor_Right = ( dragItem.offsetWidth * currentZoom - container.offsetWidth ) / -2;
				var overflowAnchor_Left = ( dragItem.offsetWidth * currentZoom - container.offsetWidth ) / 2;
				var overflowAnchor_Top = ( dragItem.offsetHeight * currentZoom - container.offsetHeight ) / -2;
				var overflowAnchor_Bottom = ( dragItem.offsetHeight * currentZoom - container.offsetHeight ) / 2;
				if ( dragItem.offsetWidth * currentZoom > container.offsetWidth ) {
					if ( currentX < overflowAnchor_Right ) {
						currentX = overflowAnchor_Right;
						initialX = overflowAnchor_Right;
						xOffset = overflowAnchor_Right;
						resetDrag();
					}
					if ( currentX > overflowAnchor_Left ) {
						currentX = overflowAnchor_Left;
						initialX = overflowAnchor_Left;
						xOffset = overflowAnchor_Left;
						resetDrag();
					}
				} else {
					currentX = 0;
					initialX = 0;
					xOffset = 0;
					resetDrag();
				}
				if ( dragItem.offsetHeight * currentZoom > container.offsetHeight ) {
					if ( currentY < overflowAnchor_Top ) {
						currentY = overflowAnchor_Top;
						initialY = overflowAnchor_Top;
						yOffset = overflowAnchor_Top;
						resetDrag();
					}
					if ( currentY > overflowAnchor_Bottom ) {
						currentY = overflowAnchor_Bottom;
						initialY = overflowAnchor_Bottom;
						yOffset = overflowAnchor_Bottom;
						resetDrag();
					}
				} else {
					currentY = 0;
					initialY = 0;
					yOffset = 0;
					resetDrag();
				}
			}
		}

	}

	var tapedTwice = false;

	function tapHandler(event) {
		if(!tapedTwice) {
		    tapedTwice = true;
		    setTimeout( function() { tapedTwice = false; }, 300 );
			dragStart( event );
			return false;
		}
		event.preventDefault();
		//action on double tap goes below
		console.log('You tapped me Twice !!!');
		quickZoom();
	}

    function dragStart(e) {
		if (e.type === "touchstart") {
			initialX = e.touches[0].clientX - xOffset;
			initialY = e.touches[0].clientY - yOffset;
		} else {
			initialX = e.clientX - xOffset;
			initialY = e.clientY - yOffset;
		}

		// if (e.target === dragItem) {
			active = true;
		// }

		dragItem.style.transition = '';
		document.getElementById("shadow").style.opacity = '1';
		document.getElementById("shadow").style.transition = '';

		return false;
    }

	function dragEnd(e) {

		active = false;

		// if ( currentX >= dragItem.offsetWidth * zoom -  ) {
		// 	initialX = currentX;
		// 	initialY = currentY;
		// }
		checkReset();

	}

    function drag(e) {
		if (e.type === "touchstart") {
			touchX = e.touches[0].clientX;
			touchY = e.touches[0].clientY;
		} else {
			touchX = e.clientX;
			touchY = e.clientY;
		}
      if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

		initialZoom = currentZoom;

		if ( currentY > ( ( dragItem.offsetHeight * currentZoom - container.offsetHeight ) / 2 ) + ( container.offsetHeight * 0.33 ) ) {
			document.getElementById("shadow").style.opacity = ( ( ( dragItem.offsetHeight * currentZoom - container.offsetHeight ) / 2 ) + ( container.offsetHeight * 0.33 ) ) / currentY ;
			initialZoom = 1 * currentZoom + ( ( ( dragItem.offsetHeight * currentZoom - container.offsetHeight ) / 2 ) + ( container.offsetHeight * 0.33 ) - currentY ) * 0.001;
		}

        setTranslate(initialZoom, currentX, currentY, dragItem);
		console.log( 'currentZoom = ' + initialZoom + ' currentX = ' + currentX + ' currentY = ' + currentY );
      }
    }

	function quickZoom(e) {
		switch ( currentZoom ) {
			case 1:
				currentZoom = 3;
				setTranslate(currentZoom, currentX, currentY, dragItem);
				break;
			default:
				resetZoomnDrag();
				break;
		}
	}

	function zoom(e) {
		var delta = e.deltaY || e.detail || e.wheelDelta;
		if ( ( currentZoom + delta * -0.0008 ) >= 1 && ( currentZoom + delta * -0.0008 ) <= 3 ) {
			currentZoom += delta * -0.0008;
		}
		checkReset();
		// console.log( 'X ' + touchX + ' Y ' + touchY + '' );
		// dragItem.style.transformOrigin = touchX + 'px ' + touchY +'px';
		setTranslate(currentZoom, currentX, currentY, dragItem);
	}

    function setTranslate(zoom, xPos, yPos, el) {
      el.style.transform = "scale3d(" + zoom + ", " + zoom + ", 1) translate3d(" + xPos / zoom + "px, " + yPos / zoom + "px, 0)";
    }
}

function killModalWin() {
	document.getElementsByClassName( 'modal-window' )[ 0 ].style.animationName = 'modal-popup-kill';
	document.getElementById( 'shadow' ).style.opacity = '0';
	//document.getElementsByClassName( 'modal-window' )[ 0 ].style.animationIterationCount = 'infinite';
	setTimeout( function() {
		var victim = document.getElementById( 'modal' );
		victim.parentNode.removeChild( victim ); // удаляем затемнение
		document.body.style.overflow = ''; // возвращаем скролл сайта
	}, 150 )
	imgZOOM = 1;
}

function showModalWin( evt, a ) {

	evt.preventDefault();
	var picPath = a.getAttribute( 'href' );
	console.log( picPath );

	var modal = document.createElement( 'div' );
	modal.id = 'modal';
	modal.className = 'modal';
	modal.setAttribute( 'tabindex', '-1' );
	document.body.appendChild( modal ); // включаем затемнение

	var modalWrap = document.createElement( 'div' );
	modalWrap.id = 'modal_wrap';
	modalWrap.className = 'modal-wrap';
	modal.appendChild( modalWrap ); // включаем затемнение

	var darkLayer = document.createElement( 'div' ); // слой затемнения
	darkLayer.id = 'shadow'; // id чтобы подхватить стиль
	document.body.style.overflow = 'hidden'; // блокируем скролл сайта

	darkLayer.onclick = function () {  // при клике на слой затемнения все исчезнет
		killModalWin();
	};

	modal.focus();

	modal.onkeydown = function( evt ) {
		evt = evt || window.event;
		if ( evt.keyCode == 27 ) {
			killModalWin();
		}
	};

	// var description = picPath;
	var description = '';

	modalWrap.innerHTML = '<div class="modal-window"><div class="modal-win-img-wrapper"><img id="modalWin_Img" src="' + picPath + '"/></div><div class="modal-win-img-description">' + description + '</div></div>';
	modalWrap.appendChild( darkLayer );

	imgZOOM = 1;
	DragnZoom( document.getElementById( "modalWin_Img" ) );

	return false;

}

window.onload = function (fontFaceSetEvent) {
	toggleMainNav(2);
	document.getElementById("stavrapid_logo").classList.add("loaded");
	setTimeout(function () {
		// Comment LogIn to set password fake protection
		logIn();
	}, 2000);

	var photoCards = document.getElementsByClassName("photo_card");

	for (var i = 0; i < photoCards.length; i++) {
		photoCards[i].setAttribute("onclick", "showModalWin( event, this );");
	}
};
