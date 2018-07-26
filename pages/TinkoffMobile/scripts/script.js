var login = "Tinkoff";
var pass = "mobile";
function PushShow ( title, content, lifetime ) {
    if ( document.getElementsByClassName("push")[0] != null ) {
        PushHide(document.getElementsByClassName("push")[0]);
    }
    if ( !lifetime || !Number.isInteger( lifetime ) ) { lifetime = 5000 }
    var push = document.createElement( 'div' );
    push.id = 'push';
    push.className = 'push';
    push.setAttribute( "style", "animation: push-show .5s 1 forwards cubic-bezier(.81,.57,.12,1.2);");

    var pushHeader = document.createElement( 'div' );
    pushHeader.className = 'push-header';

    var pushIcon = document.createElement( 'div' );
    pushIcon.className = 'push-icon';
    var pushTitle = document.createElement( 'div' );
    pushTitle.className = 'push-title';
    pushTitle.innerHTML = title ;
    var pushTime = document.createElement( 'div' );
    pushTime.className = 'push-time';
    pushTime.innerHTML = "сейчас" ;

    var pushContent = document.createElement( 'div' );
    pushContent.className = 'push-content';
    pushContent.innerHTML = content ;

    pushHeader.appendChild( pushIcon );
    pushHeader.appendChild( pushTitle );
    pushHeader.appendChild( pushTime );
    push.appendChild( pushHeader );
    push.appendChild( pushContent );

    document.body.appendChild( push ); // включаем затемнение

    setTimeout( function() {
        PushHide( push )
    }, lifetime );
}
function PushHide ( push ) {
    push.setAttribute( "style", "animation: push-hide .2s 1 forwards ease-in;");
    setTimeout( function() {
        PushKill( push );
    }, 200 );
}
function PushKill ( push ) {
    push.parentNode.removeChild( push );
}

function checkField ( e ) {
    if (e.keyCode == 13) {
        auth();
    }
}

function logIn () {
    PushShow ( "Тинькофф Мобайл", "Добро пожаловать в систему, " + login + "!", 1500 );
    setTimeout( function() {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("control-panel").style.display = "";
    }, 1000 );
}

function auth () {
    console.log(login);
    var loginField = document.querySelector(".inputs input[type='text']");
    var passField = document.querySelector(".inputs input[type='password']");
    if ( loginField.value == "" || passField.value == "" ) {
        PushShow ( "Тинькофф Мобайл", "Пожалуйста, введите Ваш логин и пароль.", 5000 );
    } else {
        if ( loginField.value.toLowerCase() != login.toLowerCase() || passField.value != pass ) {
            PushShow ( "Тинькофф Мобайл", "Введенные логин или пароль не верны. Пожалуйста, повторите попытку или создайте аккаунт, если у Вас его еще нет.", 5000 );
        }
        if ( loginField.value.toLowerCase() == login.toLowerCase() && passField.value == pass ) {
            logIn();
        }
    }
}

function tumblerSwitch( option ) {
    var options = option.parentNode;
    var tumbler = options.getElementsByClassName("tumbler")[0];
    var radios = options.getElementsByTagName("input");
    var labels = options.getElementsByTagName("label");
    for (var i = 0; i < radios.length; i++) {
        labels[i].classList.remove("active");
        if ( radios[i].checked ) {
            labels[i].classList.add("active");
            tumbler.style.marginLeft = (4 * i) + "rem";
        }
    }
}

function addonsSwitch( switcher ) {
    var addon = switcher.parentNode.parentNode;
    addon.classList.remove("active");
    if ( switcher.checked ) {
        addon.classList.add("active");
    }
}

tumblerSwitch( document.getElementById("minutesTumbler") );
tumblerSwitch( document.getElementById("internetTumbler") );
for (var i = 0; i < document.getElementsByClassName("addon").length; i++) {
    addonsSwitch( document.getElementsByClassName("addon")[i].getElementsByTagName("input")[0] );
}

function showHint( target ) {
    if ( document.getElementsByClassName("hint-wrap")[0] != null ) {
        document.getElementsByClassName("hint-wrap")[0].style.animation = "hint-hide 0.2s both ease-out";
        setTimeout( function() {
            document.getElementsByClassName("hint-wrap")[0].parentNode.removeChild( document.getElementsByClassName("hint-wrap")[0] );
        }, 200 );
    } else {
        var content = document.querySelector("#control-panel .content");
        var hintWrap = document.createElement("div");
        var hint = document.createElement("div");
        hintWrap.className = "hint-wrap";
        hint.className = "hint";
        hint.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat nisl nunc, vitae placerat ligula fringilla eu. Aenean consectetur nibh quis bibendum suscipit. Integer placerat metus in tellus imperdiet malesuada. Quisque porttitor consequat commodo. Vivamus sit amet nulla vitae urna lacinia semper ac ut augue. Cras efficitur aliquam turpis, sed sagittis diam sodales at. Ut a aliquam risus. Phasellus neque sapien, maximus sit amet felis non, lobortis rutrum nunc. Nulla viverra orci aliquam dapibus mattis. Curabitur non rhoncus est, et tristique nisl. Cras vel eros et turpis vehicula cursus. Pellentesque vitae metus tortor. Integer eu blandit tellus, ut egestas est. Praesent volutpat venenatis tortor, non tincidunt mauris dapibus non. Duis in turpis convallis, egestas odio sed, tempor nulla. Phasellus feugiat posuere consectetur.";
        hintWrap.onmouseout = function() { showHint(target); };
        hintWrap.style.animation = "hint-show 0.2s both ease";

        var parentPos = document.querySelector("#control-panel .content").getBoundingClientRect(),
        childrenPos = target.getBoundingClientRect(),
        relativePos = {};
        relativePos.top = childrenPos.top - parentPos.top,
        relativePos.right = Math.abs( childrenPos.right - parentPos.right ),
        relativePos.bottom = childrenPos.bottom - parentPos.bottom,
        relativePos.left = childrenPos.left - parentPos.left;

        if ( Math.abs(relativePos.left) < 320 ) {
            hintWrap.style.top = relativePos.top - target.offsetHeight * 1.5 + "px";
            hintWrap.style.left = relativePos.left + "px";
        } else {
            hintWrap.style.top = relativePos.top - target.offsetHeight * 1.5 + "px";
            hintWrap.style.right = relativePos.right + "px";
        }

        content.appendChild(hintWrap);
        hintWrap.appendChild(hint);

    }
}

function logOut() {
    PushShow ( "Тинькофф Мобайл", "До встречи, " + login + ".", 1500 );
    setTimeout( function() {
        document.getElementById("control-panel").style.display = "none";
        document.getElementById("login-page").style.display = "";
    }, 1000 );
}

function initApp() {
    var columns = document.getElementsByClassName("column");
    // for (var i = 0; i < columns.length; i++) {
    // 	// columns[i].style.display = "none";
    // }
    for (var i = 0; i < columns.length; i++) {
        console.log(columns[i]);
        columns[i].style.animation = "column-popup .5s 1 both ease";
        columns[i].style.animationDelay = "." + ( 0 + i ) + "s";
    }
    var hintButtons = document.getElementsByClassName("info-button")
    for (var i = 0; i < hintButtons.length; i++) {
        hintButtons[i].onclick = function() { showHint(this); };
    }

}
initApp();
