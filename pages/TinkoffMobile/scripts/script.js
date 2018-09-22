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

var hints = {};
hints.calls = "<h1>Звонки и SMS</h1>Входящие — 0 ₽ В минуту.<br><br>Пакет действует 30 дней, продлевается автоматически.<br>Расходуется на любые номера по России, условия не меняются в поездках по России.<br><br>Звонки в Тинькофф Мобайл безлимитный и не расходуют пакет.<h2>Если не хватило денег на пакет</h2>Исходящие звонки по России — 2,9 ₽ в минуту.<br><br>Исходящие SMS по России — 2,9 ₽ за штуку.<h2>Если закончилилсь минуты в пакете</h2>Выбирите вариант:<br>— докупите 100 минут за 99 ₽ (до обновления основного пакета;<br>— перейдите на другой пакет, доплатив разницу;<br>— пользуйтесь поминутно.<h2>Международные звонки и SMS</h2>Исходящие звонки:<br>— в США, Китай, Великобританию, Канаду, Сингапур, Финляндию и Южную Корею — 2,9 ₽ в минуту;<br>— в другие страны — 29 ₽ в минуту.<br><br>Исходящие SMS — 5,9 ₽ за штуку.<h2>В поездках в Крым и г. Севастополь</h2>Входящие звонки — 0 ₽ в минуту.<br><br>Исходящие звонки:<br>— по России — 2,9 ₽ за минуту;<br>— в любую другую страну — 49 ₽ в минуту.<br><br>SMS — 2,9 ₽ за штуку.";
hints.internet = "<h1>Интернет</h1>Пакет действует 30 дней и продлевается автоматически. В поехдках по России условия не меняются.<br>Приложени Tinkoff Mobile не расходует трафик и работает, даже если пакет не подключен.<h2>Если не хватило денег на пакет</h2>Инетернет недоступен (кроме приложения Tinkoff Mobile).<h2>Если закончились гигабайты в пакете</h2>Выбирите вариант:<br>— докупить 1 ГБ за 99 ₽ (до обновления основного пакета;<br>— перейти на другой пакет, доплатив разницу.<h2>В поездках в Крым и г. Севастополь</h2>1,9 ₽ за МБ<br><br><h1>Безлимитные сервисы</h1><h2>Мессенджеры</h2>WkatsApp, Viber, Facebook Messenger, iMessage, ТамТам, imo.im<h2>Социальные сети</h2>ВКонтакте, Facebook, Одноклассники, Instagram, IGTV, Snapchat, Twitter, Tinder<h2>Музыка</h2>Apple Music, Яндекс.Музыка, Яндекс.Радио, Google Play Музыка, Soundcloud, BOOM, Deezer Music, Shazam, Spotify<h2>Видео</h2>YouTube, Twitch, iTunes Видео, Google Play Фильмы, Youtube Детям, Rutube, Vimeo";
hints.history = "<h2>История</h2>Детализация за прошедший месяц";

function showHint( target ) {
    if ( document.getElementsByClassName("hint-wrap")[0] != null ) {
        document.getElementsByClassName("hint")[0].style.animation = "hint-hide 0.2s both ease-out";
        setTimeout( function() {
            document.getElementsByClassName("hint-wrap")[0].parentNode.removeChild( document.getElementsByClassName("hint-wrap")[0] );
            if ( document.getElementsByClassName("hint-button")[0] != null ) {
                document.getElementsByClassName("hint-button")[0].style.opacity = "0";
            }
        }, 200 );
    } else {
        var content = document.querySelector("#control-panel .content");
        var hintWrap = document.createElement("div");
        var hint = document.createElement("div");
        var hintButton = document.createElement("div");
        hintButton.className = "hint-button";
        hintWrap.className = "hint-wrap";
        hint.className = "hint";
        hint.innerHTML = hints[target.getAttribute("hint")];
        hintWrap.onmouseout = function() { showHint(target); };
        hint.style.animation = "hint-show 0.2s both ease";

        var parentPos = document.querySelector("#control-panel .content").getBoundingClientRect(),
        childrenPos = target.getBoundingClientRect(),
        relativePos = {};
        relativePos.top = childrenPos.top - parentPos.top,
        relativePos.right = Math.abs( childrenPos.right - parentPos.right ),
        relativePos.bottom = childrenPos.bottom - parentPos.bottom,
        relativePos.left = childrenPos.left - parentPos.left;

        if ( Math.abs(relativePos.left) < 304 ) {
            hintWrap.style.top = relativePos.top - target.offsetHeight * 1.5 + "px";
            hintWrap.style.left = relativePos.left - target.offsetWidth * 1.5 + "px";
            hintButton.style.top = "2rem";
            hintButton.style.left = "2rem";
        } else {
            hintWrap.style.top = relativePos.top - target.offsetHeight * 1.5 + "px";
            hintWrap.style.right = relativePos.right - target.offsetWidth * 1.5 + "px";
            hintButton.style.top = "2rem";
            hintButton.style.right = "2rem";
        }

        content.appendChild(hintWrap);
        hintWrap.appendChild(hint);
        hintWrap.appendChild(hintButton);

    }
}

function logOut() {
    PushShow ( "Тинькофф Мобайл", "До встречи, " + login + ".", 1500 );
    setTimeout( function() {
        document.getElementById("control-panel").style.display = "none";
        document.getElementById("login-page").style.display = "";
    }, 1000 );
}

function showHome() {
    // PushShow ( "Тинькофф Мобайл", "До встречи, " + login + ".", 1500 );
    document.getElementById("sim").style.display = "";
    document.getElementById("chat").style.display = "none";
    document.getElementById("settings").style.display = "none";
}

function showChat() {
    // PushShow ( "Тинькофф Мобайл", "До встречи, " + login + ".", 1500 );
    document.getElementById("sim").style.display = "none";
    document.getElementById("chat").style.display = "";
    document.getElementById("settings").style.display = "none";
    var chatHistory = document.getElementById("chat").getElementsByClassName("chat-history")[0];
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function showSettings() {
    // PushShow ( "Тинькофф Мобайл", "До встречи, " + login + ".", 1500 );
    document.getElementById("sim").style.display = "none";
    document.getElementById("chat").style.display = "none";
    document.getElementById("settings").style.display = "";
}

function initApp() {
    var wrapper = document.getElementsByClassName("page");

    // for (var i = 0; i < columns.length; i++) {
    // 	// columns[i].style.display = "none";
    // }
    for (var j = 0; j < wrapper.length; j++) {
        var columns = wrapper[j].getElementsByClassName("column");
        for (var i = 0; i < columns.length; i++) {
            // console.log(columns[i].scrollHeight);
            columns[i].style.animation = "column-popup .5s 1 both ease";
            columns[i].style.animationDelay = "." + ( 0 + i ) + "s";
        }
    }
    var hintButtons = document.getElementsByClassName("info-button")
    for (var i = 0; i < hintButtons.length; i++) {
        hintButtons[i].onclick = function() { showHint(this); };
    }
    logIn();
}
initApp();
