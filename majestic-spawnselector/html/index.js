resourceName = null;
spawnSelectorOpen = false;
const date = new Date();
const weekday = ["Sun.","Mon.","Tues.","Wednes.","Thurs.","Fri.","Satur."];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
isNew = true;
window.addEventListener('message', function(event) {
    ed = event.data;
	if (ed.action === "spawnSelector") {
		if (ed.open === true) {
			resourceName = ed.resourceName;
			spawnSelectorOpen = true;
            document.getElementById("MDBLDWindSpeed").innerHTML=Math.floor(ed.weatherData.windSpeed) + " m/s";
            document.getElementById("MDBLDPlayers").innerHTML=ed.weatherData.playerCount;
            let hour = null;
            let minute = null;
            hour = ed.weatherData.time.hour;
            if (ed.weatherData.time.hour < 10) {
                hour = "0" + ed.weatherData.time.hour;
            }
            minute = ed.weatherData.time.minute;
            if (ed.weatherData.time.minute < 10) {
                minute = "0" + ed.weatherData.time.minute;
            }
            document.getElementById("MDBLDTime").innerHTML=hour + ":" + minute;
            let day = weekday[date.getDay()];
            let name = month[date.getMonth()];
            let dayM = date.getDate();
            document.getElementById("MDBLDDate").innerHTML=day + " " + name;
            let tempLabel = "Celsius";
            if (ed.weatherData.tempType === "f") {
                tempLabel = "Fahrenheit";
            }
            document.getElementById("MDBLDDegree").innerHTML=Math.floor(ed.weatherData.temp) + "° " + tempLabel;
            let weatherLabel = ed.weatherData.weather;
            if (weatherLabel === "extrasunny") {
                weatherLabel = "extra sunny";
            }
            document.getElementById("MDBLDWeather").innerHTML=weatherLabel;
            document.getElementById("MDBLWeatherIcon").className=ed.weatherData.icon;
            if (ed.infos.date === true) {
                document.getElementById("MDBLDivDate").style.display = "flex";
            }
            if (ed.infos.weather === true) {
                document.getElementById("MDBLDivWeather").style.display = "flex";
            }
            if (ed.infos.windSpeed === true) {
                document.getElementById("MDBLDivWindSpeed").style.display = "flex";
            }
            if (ed.infos.temperature === true) {
                document.getElementById("MDBLDivDegree").style.display = "flex";
            }
            if (ed.infos.playerCount === true) {
                document.getElementById("MDBLDivPlayerCount").style.display = "flex";
            }
			body.style.display = "block";
            if (ed.lastLocation === true && isNew === false) {
                document.getElementById("MDBottomCenter").style.display = "flex";
            }
		} else {
			spawnSelectorOpen = false;
			body.style.display = "none";
            document.getElementById("body").innerHTML = `
            <div id="MDTop">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: absolute; left: 42%; bottom: 37%; font-size: 30px; color: #00dfbd;">
                    <i style="text-shadow: 0px 0px 20px #00dfbd;" class="fas fa-map-marker-alt"></i>
                </div>
                <!-- <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: relative; font-size: 30px; color: #00dfbd;">
                    <i style="text-shadow: 0px 0px 10px #00dfbd;" class="fas fa-map-marker-alt"></i>
                </div> -->
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 5px;">
                    <h4 style="color: #00dfbd; font-size: 20px; font-weight: 600;">Spawn Selector</h4>
                    <h4 style="color: #a7b1b9; font-size: 14px;">Click on a location to wake up there</h4>
                </div>
            </div>
            <div id="MDBottomCenter">
                <div id="MDBCRadial" onclick="clFunc('spawn', 'lastLocation')"><i style="position: absolute; font-size: 40px;" class="far fa-long-arrow-right"></i></div>
                <h4 id="MDBottomCenterH4">OR <span style="color: #00dfbd; border-bottom: 2px solid #00dfbd; padding-bottom: 3px;">SPAWN</span> AT LAST LOCATION</h4>
            </div>
            <div id="MDBottomLeft">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center;">
                    <h4 style="color: white; font-size: 17px;">Weather for City</h4>
                </div>
                <div id="MDBLInside">
                    <div class="MDBLDiv" id="MDBLDivDate">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-clock"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 id="MDBLDTime" style="color: white;">10:22</h4>
                            <h4 id="MDBLDDate" style="color: #a7b1b9; font-size: 13px;">Thursday, Dec 14</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWeather">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" id="MDBLWeatherIcon" class="fas fa-sun"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Weather</h4>
                            <h4 id="MDBLDWeather" style="color: white; font-size: 13px; text-transform: capitalize;">Smog</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWindSpeed">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-wind"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Wind Speed</h4>
                            <h4 id="MDBLDWindSpeed" style="color: white; font-size: 13px;">3 m/s</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivDegree">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-temperature-low"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Temperature</h4>
                            <h4 id="MDBLDDegree" style="color: white; font-size: 13px;">96 Fahrenheit</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivPlayerCount">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="fas fa-users"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Players</h4>
                            <h4 id="MDBLDPlayers" style="color: white; font-size: 13px;">95/128</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="MDTLine"></div>
            <div id="MDTLine2"></div>`;
		}
	} else if (ed.action === "setupLocations") {
        ed.locations.forEach(function(ssData, index) {
            let label = null;
            if (ssData.label.length >= 14) {
                label = ssData.label.substring(0, 14) + ".";
            } else {
                label = ssData.label;
            }
            var spawnLocationsHTML = `
            <div id="MDMarkerDiv" style="left: ${ssData.ui.x}%; top: ${ssData.ui.y}%;">
                <div class="MDMDLeftSide" id="MDMDLeftSide-${index}" onmouseenter="handlerIn('${index}')" onmouseleave="handlerOut('${index}')" onclick="clFunc('spawn', 'normal', '${ssData.coords.x}', '${ssData.coords.y}', '${ssData.coords.z}', '${ssData.heading}')">
                    <div class="MDMDLDDiv1"></div>
                    <div class="MDMDLDDiv2">
                        <i style="transform: rotate(-135deg); font-size: 19px;" class="${ssData.icon}"></i>
                    </div>
                    <div class="MDMDLDDiv3"></div>
                </div>
                <div class="MDMDRightSide" id="MDMDRightSide-${index}">
                    <div style="width: fit-content; height: fit-content; position: absolute; left: 0; right: 13%; top: 0; bottom: 0; margin: auto;">
                        <h4>${label}</h4>
                    </div>
                </div>
            </div>`;
            appendHtml(document.getElementById("body"), spawnLocationsHTML);
        });
        isNew = false
        if (isNew === false) {
            document.getElementById("MDBottomCenter").style.display = "flex";
        }
    } else if (ed.action === "setupApartments") {
        ed.locations.forEach(function(ssData, index) {
            let label = null;
            if (ssData.label.length >= 14) {
                label = ssData.label.substring(0, 14) + ".";
            } else {
                label = ssData.label;
            }
            var spawnLocationsHTML = `
            <div id="MDMarkerDiv" style="left: ${ssData.coords.x}%; top: ${ssData.coords.y}%;">
                <div class="MDMDLeftSide" id="MDMDLeftSide-${index}" onmouseenter="handlerIn('${index}')" onmouseleave="handlerOut('${index}')" onclick="clFunc('spawn', 'apartment', '${ssData.name}')">
                    <div class="MDMDLDDiv1"></div>
                    <div class="MDMDLDDiv2">
                        <i style="transform: rotate(-135deg); font-size: 19px;" class="fad fa-building"></i>
                    </div>
                    <div class="MDMDLDDiv3"></div>
                </div>
                <div class="MDMDRightSide" id="MDMDRightSide-${index}">
                    <div style="width: fit-content; height: fit-content; position: absolute; left: 0; right: 13%; top: 0; bottom: 0; margin: auto;">
                        <h4>${label}</h4>
                    </div>
                </div>
            </div>`;
			appendHtml(document.getElementById("body"), spawnLocationsHTML);
		});
        isNew = true;
        if (isNew === true) {
            document.getElementById("MDBottomCenter").style.display = "none";
        }
    }
})

function handlerIn(index) {
    document.getElementById("MDMDRightSide-" + index).style.display = "flex";
    // $(`#MDMDRightSide-${index}`).fadeIn().css({left: "-2%", position:'relative', display:'flex'}).animate({left: "0"}, 200, function() {});
}

function handlerOut(index) {
    document.getElementById("MDMDRightSide-" + index).style.display = "none";
    // $(`#MDMDRightSide-${index}`).fadeOut().css({left: "0%", position:'relative',}).animate({left: "-2%"}, 500, function() {
    //     document.getElementById(`MDMDRightSide-${index}`).style.display = "none";
    // });
}

function clFunc(name1, name2, name3, name4, name5, name6) {
	if (name1 === "spawn") {
        if (name2 === "apartment") {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/spawn`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({type: name2, name: name3}));
            document.getElementById("body").innerHTML = `
            <div id="MDTop">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: absolute; left: 42%; bottom: 37%; font-size: 30px; color: #00dfbd;">
                    <i style="text-shadow: 0px 0px 20px #00dfbd;" class="fas fa-map-marker-alt"></i>
                </div>
                <!-- <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: relative; font-size: 30px; color: #00dfbd;">
                    <i style="text-shadow: 0px 0px 10px #00dfbd;" class="fas fa-map-marker-alt"></i>
                </div> -->
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 5px;">
                    <h4 style="color: #00dfbd; font-size: 20px; font-weight: 600;">Spawn Selector</h4>
                    <h4 style="color: #a7b1b9; font-size: 14px;">Click on a location to wake up there</h4>
                </div>
            </div>
            <div id="MDBottomCenter">
                <div id="MDBCRadial" onclick="clFunc('spawn', 'lastLocation')"><i style="position: absolute; font-size: 40px;" class="far fa-long-arrow-right"></i></div>
                <h4 id="MDBottomCenterH4">OR <span style="color: #00dfbd; border-bottom: 2px solid #00dfbd; padding-bottom: 3px;">SPAWN</span> AT LAST LOCATION</h4>
            </div>
            <div id="MDBottomLeft">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center;">
                    <h4 style="color: white; font-size: 17px;">Weather for City</h4>
                </div>
                <div id="MDBLInside">
                    <div class="MDBLDiv" id="MDBLDivDate">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-clock"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 id="MDBLDTime" style="color: white;">10:22</h4>
                            <h4 id="MDBLDDate" style="color: #a7b1b9; font-size: 13px;">Thursday, Dec 14</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWeather">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" id="MDBLWeatherIcon" class="fas fa-sun"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Weather</h4>
                            <h4 id="MDBLDWeather" style="color: white; font-size: 13px; text-transform: capitalize;">Smog</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWindSpeed">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-wind"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Wind Speed</h4>
                            <h4 id="MDBLDWindSpeed" style="color: white; font-size: 13px;">3 m/s</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivDegree">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-temperature-low"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Temperature</h4>
                            <h4 id="MDBLDDegree" style="color: white; font-size: 13px;">96 Fahrenheit</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivPlayerCount">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="fas fa-users"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Players</h4>
                            <h4 id="MDBLDPlayers" style="color: white; font-size: 13px;">95/128</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="MDTLine"></div>
            <div id="MDTLine2"></div>`;
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/spawn`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({type: name2, x: Number(name3), y: Number(name4), z: Number(name5), w: Number(name6)}));
            document.getElementById("body").innerHTML = `
            <div id="MDTop">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: absolute; left: 42%; bottom: 37%; font-size: 30px; color: #00dfbd;">
                    <i style="text-shadow: 0px 0px 20px #00dfbd;" class="fas fa-map-marker-alt"></i>
                </div>
                <!-- <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; position: relative; font-size: 30px; color: #00dfbd;">
                    <i style="text-shadow: 0px 0px 10px #00dfbd;" class="fas fa-map-marker-alt"></i>
                </div> -->
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 5px;">
                    <h4 style="color: #00dfbd; font-size: 20px; font-weight: 600;">Spawn Selector</h4>
                    <h4 style="color: #a7b1b9; font-size: 14px;">Click on a location to wake up there</h4>
                </div>
            </div>
            <div id="MDBottomCenter">
                <div id="MDBCRadial" onclick="clFunc('spawn', 'lastLocation')"><i style="position: absolute; font-size: 40px;" class="far fa-long-arrow-right"></i></div>
                <h4 id="MDBottomCenterH4">OR <span style="color: #00dfbd; border-bottom: 2px solid #00dfbd; padding-bottom: 3px;">SPAWN</span> AT LAST LOCATION</h4>
            </div>
            <div id="MDBottomLeft">
                <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center;">
                    <h4 style="color: white; font-size: 17px;">Weather for City</h4>
                </div>
                <div id="MDBLInside">
                    <div class="MDBLDiv" id="MDBLDivDate">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-clock"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 id="MDBLDTime" style="color: white;">10:22</h4>
                            <h4 id="MDBLDDate" style="color: #a7b1b9; font-size: 13px;">Thursday, Dec 14</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWeather">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" id="MDBLWeatherIcon" class="fas fa-sun"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Weather</h4>
                            <h4 id="MDBLDWeather" style="color: white; font-size: 13px; text-transform: capitalize;">Smog</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivWindSpeed">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-wind"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Wind Speed</h4>
                            <h4 id="MDBLDWindSpeed" style="color: white; font-size: 13px;">3 m/s</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivDegree">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="far fa-temperature-low"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Temperature</h4>
                            <h4 id="MDBLDDegree" style="color: white; font-size: 13px;">96 Fahrenheit</h4>
                        </div>
                    </div>
                    <div class="MDBLDiv" id="MDBLDivPlayerCount">
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: center; justify-content: center; font-size: 25px; color: white;">
                            <i style="text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);" class="fas fa-users"></i>
                        </div>
                        <div style="width: fit-content; height: fit-content; display: flex; align-items: left; justify-content: center; flex-direction: column;">
                            <h4 style="color: #a7b1b9;">Players</h4>
                            <h4 id="MDBLDPlayers" style="color: white; font-size: 13px;">95/128</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="MDTLine"></div>
            <div id="MDTLine2"></div>`;
        }
	}
}

function appendHtml(el, str) {
	var div = document.createElement('div');
	div.innerHTML = str;
	while (div.children.length > 0) {
		el.appendChild(div.children[0]);
	}
}