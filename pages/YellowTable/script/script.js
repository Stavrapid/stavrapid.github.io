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
