// VALUES BINDING FOR CONVERTION
var months=["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
	weekdays=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	timeofday = ["ночью", "утром", "днем", "вечером"],
	directions = ["северный", "северо-восточный", "восточный", "юго-восточный", "южный", "юго-западный", "западный", "северо-западный"],
	cloudiness=["ясно", "малооблачно", "облачно", "пасмурно"],
	precipations = ["без осадков", "дождь", "снег", "гроза", "туман"];

// CONVERT MONTH
function convertMonth(t) {
	if (t >= 1 && t <= 12)
		return months[t-1];
	else
		return "";
}

// CONVERT WEEKDAY
function convertWeekday(w) {
	if (w >= 0 && w <= 7)
		return weekdays[w];
	else
		return "";
}

// CONVERT TOD (WTF?!)
function convertToD(t) {
	if (t >= 0 && t <= 3)
		return timeofday[t];
	else
		return "";
}

// CONVERT WIND DIRECTION
function convertDirection(d) {
	if (d >= 0 && d <= 7)
		return directions[d];
	else
		return "";
}

// CONVERT CLOUDINESS
function convertCloudiness(c) {
	if (c >= 0 && c <= 3)
		return cloudiness[c];
	else
		return "";
}

// CONVERT PRECIPITATIONS
function convertPrecipitation(p, r, s) {
	if (p >= 4 && p <= 10)
		ret = precipations[p-4];
	else
		ret = "";
	if (p >= 4 && p <= 7 && r == 0) ret = probability[0] + " " + ret;
	if (p == 8 && s == 0) ret = probability[1] + " " + ret;
	return ret;
}

// GET NODE ATTRIBUTES
function getAttributes(node) {
	var ret = new Object();
	if(node.attributes)
	for(var i=0; i<node.attributes.length; i++) {
		var attr = node.attributes[i];
		ret[attr.name] = attr.value;
	}
	return ret;
}

// GET XML
/*function getXMLDocument(url) {
	var xml;
	if(window.XMLHttpRequest) {
		xml = new window.XMLHttpRequest();
		xml.open("GET", url, false);
		xml.send("");
		return xml.responseXML;
	} else {
		if (window.ActiveXObject) {
			xml = new ActiveXObject("Microsoft.XMLDOM");
			xml.async = false;
			xml.load(url);
			return xml;
		} else {
			alert("ERRRRRRRRRRRRORRRR!!");
			return null;
		}
	}
}*/

// ICON CHOOSING
/*function setIcon(cloud, prec, power) {
	switch (cloud) {
		case "0":
			switch (prec) {
				case "0":
					return("B");
					break;
				case "1", "2", "3":
					return(")");
					break;
				case "4":
					return("J");
					break;
			}
		case "1":
			switch (prec) {
				case "0":
					return("H");
					break;
				case "1":
					return(")");
					break;
				case "2":
					return(")");
					break;
				case "3":
					return(")");
					break;
				case "4":
					return(")");
					break;
			}
		case "2":
			switch (prec) {
				case "0":
					return("N");
					break;
				case "1":
					switch (power) {
						case "0":
							return("Q");
							break;
						case "1":
							return("R");
							break;
					}
				case "2":
					switch (power) {
						case "0":
							return("U");
							break;
						case "1":
							return("W");
							break;
					}
				case "3":
					return("O");
					break;
				case "4":
					return("L");
					break;
			}
		case "3":
			switch (prec) {
				case "0":
					return("Y");
					break;
				case "1":
					switch (power) {
						case "0":
							return("Q");
							break;
						case "1":
							return("R");
							break;
					}
				case "2":
					switch (power) {
						case "0":
							return("U");
							break;
						case "1":
							return("W");
							break;
					}
				case "3":
					return("Z");
					break;
				case "4":
					return("M");
					break;
			}
		default:
			return(")");
			break;
	}
}*/

function setIcon(cloud, prec, power) {
	switch (cloud) {
		case "0":
			return("1");
			break;
		case "1":
			switch (prec) {
				case "0":
					return("A");
					break;
				case "1":
					switch (power) {
						case "0":
							return("F");
							break;
						case "1":
							return("L");
							break;
						case "2":
							return("J");
							break;
					}
				case "2":
					return("H");
					break;
				case "3":
					switch (power) {
						case "0":
							return("X");
							break;
						case "1":
							return("R");
							break;
						case "2":
							return("P");
							break;
					}
				case "4":
					return("B");
					break;
			}
		case "2":
			switch (prec) {
				case "0":
					return("3");
					break;
				case "1":
					switch (power) {
						case "0":
							return("G");
							break;
						case "1":
							return("M");
							break;
						case "2":
							return("K");
							break;
					}
				case "2":
					return("I");
					break;
				case "3":
					switch (power) {
						case "0":
							return("Y");
							break;
						case "1":
							return("S");
							break;
						case "2":
							return("Q");
							break;
					}
				case "4":
					return("C");
					break;
			}
		default:
			return("✕");
			break;
	}
}

// GET COLOR FOR TAB HIGHLIIE
function getColor(seed) {
	if (!isNaN(seed)) {
		return Math.floor(255 * ((30 + seed) / 45)) + ", 127, " + Math.floor(255 * ((30 - seed) / 45));
	} else {
		return "127, 127, 127";
	}
}

// ADD ZERO TO ONE-DIGIT VALUE
function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

// ADD DECLINATION
function addSup(s) {
	if (((s % 10) >= 4) || ((s >10) && (s < 14)))
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

function getXMLDocument(url, showColors, shortify) {
	var xmlhttp = new window.XMLHttpRequest();
	xmlhttp.open('GET', url, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200) {
				console.log("IF: " + xmlhttp.responseXML);
				xmlDoc = (new DOMParser()).parseFromString(xmlhttp.responseText, 'text/xml');
				parseWeatherXML(xmlDoc, showColors, shortify);
			}
		}
	};
	xmlhttp.send(null);
}

// MAIN PARSE WEATHER FUNCTION
/*function parseWeatherXML(url, showColors, shortify) {
	// TRY TO LOAD XML
	var xml=null;
	try {
		xml = getXMLDocument(url);
		alert(xml);
		if(!xml) return "<font color='red'> </font>";
	}
	catch(e) {
		return "<font color='red'>"+e.message+"</font>";
	}*/
function parseWeatherXML(xml, showColors, shortify) {
	// FIRST LEVEL PARSING
	var NowDate = new Date(),
		x = 0,
		screen = document.getElementById("main-screen-content"),
		screenL = document.getElementById("main-screen-content-landscape"),
		towns=xml.getElementsByTagName("TOWN"),
		town=null;
	if(towns)
	for(var i1=0; i1<towns.length; i1++) {
		town=towns[i1];
		var tw_attr = getAttributes(town);
		screen.querySelector(".city").innerHTML = 
		screenL.querySelector(".city").innerHTML = tw_attr['tname'];
		screen.querySelector(".country").innerHTML = 
		screenL.querySelector(".country").innerHTML = tw_attr['cname'];
		screen.style.backgroundImage = "url('./locations images/" + tw_attr['cname'] + "/" + tw_attr['tname'] + ".png')";
		screenL.style.backgroundImage = "url('./locations images/landscape/" + tw_attr['cname'] + "/" + tw_attr['tname'] + ".png')";
		// SECOND LEVEL PARSING
		var forecasts=town.getElementsByTagName("FORECAST");
		var forecast=null;
		var t_forecasts="";
		if(forecasts)
		for(var i2=0; i2<forecasts.length; i2++) {
			forecast=forecasts[i2];
			var fc_attr = getAttributes(forecast);
			if (fc_attr['day'] == NowDate.getDate()) {
				screen.querySelector(".today-day").innerHTML = 
				screenL.querySelector(".today-day").innerHTML = convertWeekday(fc_attr['weekday']);
				screen.querySelector(".today-date").innerHTML = 
				screenL.querySelector(".today-date").innerHTML = addSup(fc_attr['day']);
				fc_attr = getAttributes(forecasts[i2 + 1]);
				x = 1;
			} else {
				if (shortify) {
					screen.getElementsByClassName("tab")[i2 - x].querySelector(".tab-day").innerHTML = 
					screenL.getElementsByClassName("tab")[i2 - x].querySelector(".tab-day").innerHTML = (convertWeekday(fc_attr['weekday'])).slice(0, 3);
				} else {
					screen.getElementsByClassName("tab")[i2 - x].querySelector(".tab-day").innerHTML = 
					screenL.getElementsByClassName("tab")[i2 - x].querySelector(".tab-day").innerHTML = convertWeekday(fc_attr['weekday']);
				}
				screen.getElementsByClassName("tab")[i2 - x].querySelector(".tab-date").innerHTML = 
				screenL.getElementsByClassName("tab")[i2 - x].querySelector(".tab-date").innerHTML = addSup(fc_attr['day']);
			}
			// THIRD LEVEL PARSING
			var params=forecast.childNodes;
			var t_heat=t_phenomena=t_pressure=t_temperature=t_wind=t_relwet="";
			if(params)
			for(var i3=0; i3<params.length; i3++) {
				param=params[i3];
				var tmp=getAttributes(param);
				fc_attr = getAttributes(forecast);
				switch(param.nodeName) {
					case "PHENOMENA":
						if (fc_attr['day'] == NowDate.getDate()) {
							screen.querySelector(".today-icon").innerHTML = 
							screenL.querySelector(".today-icon").innerHTML = setIcon(tmp['cloudiness'], tmp['precipitation'], tmp['ppower']);
						} else {
							screen.getElementsByClassName("tab")[i2 - x].querySelector(".tab-icon").innerHTML = 
							screenL.getElementsByClassName("tab")[i2 - x].querySelector(".tab-icon").innerHTML = setIcon(tmp['cloudiness'], tmp['precipitation'], tmp['ppower']);
						}
						break;
					case "PRESSURE":
						// pressure parsing goes here
						break;
					case "TEMPERATURE":
						if (fc_attr['day'] == NowDate.getDate()) {
							if (tmp['max'] > 0) {
								screen.querySelector(".today-temperature").innerHTML = 
								screenL.querySelector(".today-temperature").innerHTML = "+" + tmp['max'] + "<sup>°C</sup>";
							} else {
								screen.querySelector(".today-temperature").innerHTML = 
								screenL.querySelector(".today-temperature").innerHTML = tmp['max'] + "<sup>°C</sup>";
							}
							if (showColors) {
								document.getElementById("bg-overlay").style.background = "linear-gradient(to bottom, rgba(" + getColor(parseInt(tmp['max'])) + ", 0.4) 0%, rgba(0, 0, 0, 0) 50%)";
								screenL.getElementsByClassName("tab")[i2 - x].style.backgroundColor = "rgb(" + getColor(parseInt(tmp['max'])) + ")";
							}
						} else {
							if (tmp['max'] > 0) {
								screen.getElementsByClassName("tab")[i2 - x].querySelector(".tab-temperature").innerHTML = 
								screenL.getElementsByClassName("tab")[i2 - x].querySelector(".tab-temperature").innerHTML = "+" + tmp['max'] + "<sup>°C</sup>";
							} else {
								screen.getElementsByClassName("tab")[i2 - x].querySelector(".tab-temperature").innerHTML = 
								screenL.getElementsByClassName("tab")[i2 - x].querySelector(".tab-temperature").innerHTML = tmp['max'] + "<sup>°C</sup>";
							}
							if (showColors) {
								screen.getElementsByClassName("tab")[i2 - x].style.backgroundColor = 
								screenL.getElementsByClassName("tab")[i2 - x].style.backgroundColor = "rgb(" + getColor(parseInt(tmp['max'])) + ")";
							}
						}
						break;
					case "WIND":
						// wind parsing goes here
						break;
					case "RELWET":
						// relwet parsing goes here
						break;
					case "HEAT":
						// heat parsing goes here
						break;
				}
			}
		}
	}
}

