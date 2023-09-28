import {key} from './api.js';

// =================== DOM VARIABLES ===================
const ip_output = document.querySelector(".search-details-ip__result");
const location_output = document.querySelector(".search-details-location__result");
const timezone_output = document.querySelector(".search-details-timezone__result");
const isp_output = document.querySelector(".search-details-isp__result");

const user_input = document.querySelector(".search-bar__input");
const search_bar_button = document.querySelector(".search-bar__button");

const outer_popup_error = document.querySelector(".outer-popup-error");
const popup_error_button = document.querySelector(".popup-error__button");


// =================== LEAFLET JS VARIABLES ===================
let map = L.map("map").setView([0,0] , 13);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution});
const marker_icon = L.icon({iconUrl : "images/icon-location.svg" , iconSize : [32,40]});
let marker = L.marker([0,0] , {icon : marker_icon });

tile.addTo(map);
marker.addTo(map);

// =================== IPify VARIABLES ===================
const IPify_API_key = key;
const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^(([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4})?::(([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4})?$/;




// =================== User Input EVENT LISTENERES ===================
document.addEventListener("DOMContentLoaded" , () => {getUserIP();})

search_bar_button.addEventListener("click" , () => {handleInput(user_input.value); })

user_input.addEventListener("keyup" , (event) => {event.key === "Enter" && handleInput(user_input.value);})

// =================== Popup Window EVENT LISTENERS ===================
popup_error_button.addEventListener("click" , () => {closeErrorMessage();})



// =================== HANDLERS & FETCH FUNCTIONS ===================
function handleInput(value){
    if(ipv4Regex.test(value) || ipv6Regex.test(value)) getInputIP(value);
    else getInputDomain(value);
}

async function getUserIP(){
    try{
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IPify_API_key}`);
        if(!response.ok) {createErrorMessage(); return;}
        const user_info = await response.json();
        
        if(user_info.hasOwnProperty('message')) {createErrorMessage(); return;}

        updateInfoOnBox(user_info);
        updateInfoOnMap(user_info['location']['lng'] , user_info['location']['lat']);
    }
    catch(error){
        createErrorMessage();
    }
}

async function getInputIP(address){
    try{
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IPify_API_key}&ipAddress=${address}`);
        if(!response.ok) {createErrorMessage(); return;}
        const input_info = await response.json();

        if(input_info.hasOwnProperty('message')) {createErrorMessage(); return;}

        updateInfoOnBox(input_info);
        updateInfoOnMap(input_info['location']['lng'] , input_info['location']['lat']);
    }
    catch(error)
    {
        createErrorMessage();
    }
}

async function getInputDomain(domain){
    try{
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${IPify_API_key}&domain=${domain}`);
        if(!response.ok) {createErrorMessage(); return;}
        const input_info = await response.json();

        if(input_info.hasOwnProperty('message')) {createErrorMessage(); return;}

        updateInfoOnBox(input_info);
        updateInfoOnMap(input_info['location']['lng'] , input_info['location']['lat']);
    }
    catch(error)
    {
        createErrorMessage();
    }
}


// =================== ON DOM DATA UPDATE HANDLER ===================
function updateInfoOnBox(info){
    ip_output.innerHTML = info['ip'];
    location_output.innerHTML = `${info['location']['region']} , ${info['location']['country']}`;
    timezone_output.innerHTML = `UTC ${info['location']['timezone']}`;
    isp_output.innerHTML = info['isp'];
}


// =================== ON MAP UPDATE HANDLER ===================
function updateInfoOnMap(longitude , latitude){
    marker.setLatLng([latitude , longitude]);
    map.setView([latitude,longitude]);
}


// =================== POPUP HANDLERS ===================
function createErrorMessage()
{
    outer_popup_error.classList.add("open");

    setTimeout(() => {
        outer_popup_error.classList.add("openVisually");
    } , 20);
}

function closeErrorMessage()
{
    outer_popup_error.classList.remove("openVisually");

    setTimeout(() => {
        outer_popup_error.classList.remove("open");
    } , 500);
}
