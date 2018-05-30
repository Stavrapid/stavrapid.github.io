function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
	function Clock(){
	var d = new Date();
	document.querySelector('.today-tab').querySelector('.today-day').innerHTML = dayName(d.getDay());
	document.querySelector('.today-tab').querySelector('.today-date').innerHTML = addSup(addZero(d.getDate()));
	document.querySelector('.today-time').innerHTML = addZero(d.getHours()) + ":" + addZero(d.getMinutes());
	setTimeout(Clock, 1000);
}

function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function addSup(s) {
	if (((s % 10)>=4) || ((s >10) && (s < 14)))
		return(s + '<sup>th</sup>');
	switch (s % 10) {
	case 0:
		return(s + '<sup>th</sup>');
		break;
	case 1:
		return(s + '<sup>st</sup>');
		break;
	case 2:
		return(s + '<sup>nd</sup>');
		break;
	case 3:
		return(s + '<sup>d</sup>');
		break;
}

}

function dayName(i) {
	var weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	return weekday[i];
}

function GenerateWeek() {
	var NowDate = new Date();
	var CurrentDay = NowDate.getDay();
	switch(CurrentDay) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			CurrentDay--
			break
		case 0:
			CurrentDay = 6
			break
	}
	var week = new Array(7);
	week[0] = new Date(NowDate.getFullYear(), NowDate.getMonth(), NowDate.getDate() - CurrentDay);
	week[1] = new Date(NowDate.getFullYear(), NowDate.getMonth(), NowDate.getDate() - CurrentDay + 1);
	week[2] = new Date(NowDate.getFullYear(), NowDate.getMonth(), NowDate.getDate() - CurrentDay + 2);
	week[3] = new Date(NowDate.getFullYear(), NowDate.getMonth(), NowDate.getDate() - CurrentDay + 3);
	week[4] = new Date(NowDate.getFullYear(), NowDate.getMonth(), NowDate.getDate() - CurrentDay + 4);
	week[5] = new Date(NowDate.getFullYear(), NowDate.getMonth(), NowDate.getDate() - CurrentDay + 5);
	week[6] = new Date(NowDate.getFullYear(), NowDate.getMonth(), NowDate.getDate() - CurrentDay + 6);
	var j=0;
	for (i=0; i<7; i++) {
		if (week[i].getDate() == NowDate.getDate()) {
			document.getElementById('today-tab').getElementsByClassName('today-temperature')[0].innerHTML = '+' + getRandomInt(18, 26) + '°';
			document.getElementById('today-tab').getElementsByClassName('today-icon')[0].getElementsByTagName('img')[0].src = 'img/{{id}}.png'.replace('{{id}}', getRandomInt(1, 27));
			j++;
		}
		if (i != 6) {
			document.getElementsByClassName('tab')[i].getElementsByClassName('tab-day')[0].innerHTML = dayName(week[i+j].getDay());
			document.getElementsByClassName('tab')[i].getElementsByClassName('tab-date')[0].innerHTML = addSup(addZero(week[i+j].getDate()));
			document.getElementsByClassName('tab')[i].getElementsByClassName('tab-icon')[0].getElementsByTagName('img')[0].src = 'img/{{id}}.png'.replace('{{id}}', getRandomInt(1, 27));
			document.getElementsByClassName('tab')[i].getElementsByClassName('tab-temperature')[0].innerHTML = '+' + getRandomInt(18, 26) + '°';
		}
	}
}

function init() {
	document.getElementById('landscape').setAttribute('onclick', "hide(); this.setAttribute('onclick', 'show();');");
	document.getElementById('content').setAttribute('style', 'height: 614px;');
	setTimeout(function() {
		var tabs = document.getElementById('info-block').getElementsByClassName('tab');
		for (i=0; i<tabs.length; i++) {
			showtabs(tabs, i);
		}
	}, 250);
}

function show() {
	var tabs = document.getElementById('info-block').getElementsByClassName('tab');
	for (i=0; i<tabs.length; i++) {
		showinfo(tabs, i);
	}
}

function hide() {
	var tabs = document.getElementById('info-block').getElementsByClassName('tab');
	for (i=0; i<tabs.length; i++) {
		hideinfo(tabs, i);
	}
}

function showtabs(t,x) {
	setTimeout(function() {
		t[x].setAttribute('style', 'box-shadow: inset #70345e 0px 167px 0px;');
		t[x].getElementsByClassName('heading')[0].setAttribute('style', 'opacity: 1; bottom: 0;');
		t[x].getElementsByClassName('tab-icon')[0].setAttribute('style', 'opacity: 1; bottom: 0;');
		t[x].getElementsByClassName('tab-temperature')[0].setAttribute('style', 'opacity: 1; bottom: 0;');
	}, 25*x);
}

function showinfo(t,x) {
	document.getElementById('landscape').setAttribute('onclick', 'hide();');
	setTimeout(function() {
		t[x].getElementsByClassName('tab-icon')[0].setAttribute('style', 'transition: bottom 0.2s linear 0s, opacity 0.4s ease-in-out 0s; opacity: 1; bottom: 0px;');
		t[x].getElementsByClassName('tab-temperature')[0].setAttribute('style', 'transition: bottom 0.2s ease-out 0.1s, opacity 0.4s ease-in-out 0s; opacity: 1; bottom: 0px;');
	}, 25*x);
}

function hideinfo(t,x) {
	document.getElementById('landscape').setAttribute('onclick', 'show();');
	setTimeout(function() {
		t[x].getElementsByClassName('tab-icon')[0].setAttribute('style', 'transition: bottom 0.1s linear 0.1s, opacity 0.2s ease-in-out 0s; opacity: 0; bottom: 60px;');
		t[x].getElementsByClassName('tab-temperature')[0].setAttribute('style', 'transition: bottom 0.2s ease-out 0s, opacity 0.2s ease-in-out 0s; opacity: 0; bottom: 60px;');
	}, 25*x);
}