function toggleButtons(activeButton) {
    activeButton = activeButton.parentNode;
    var buttons = document.getElementsByClassName("header__item");
    for (var i = 0; i < buttons.length; i++) {
        if ( buttons[i] != activeButton ) {
            buttons[i].classList.remove("active");
        }
    }
    activeButton.classList.add("active");
}

function hideLoader() {
    alert("Loaded!");
}

function toggleSub(elem) {
    var elem = elem.parentNode;
    if (elem.classList.contains("active")) {
        elem.classList.remove("active");
    } else {
        elem.classList.add("active");
    }
}
