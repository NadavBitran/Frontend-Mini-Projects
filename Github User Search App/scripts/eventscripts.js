// ---------------------------------------
// - MAIN DOM ELEMENTS & CONTAINERS:
const body = document.querySelector("body");
const mode_container = document.querySelector(".mode-container");
const search_container = document.querySelector(".search-container");
const profile_container = document.querySelector(".profile-container");
const profile_container_picture = profile_container.querySelector(".profile-container-picture");

// - PROFILE DOM ELEMENTS:
const profile_image = document.querySelector(".profile-container-picture__img");
const profile_name = document.querySelector(".profile-container-details-main-data__name");
const profile_joindate = document.querySelector(".profile-container-details-main-data__joindate");
const profile_hashtag = document.querySelector(".profile-container-details-main-data__hashtag");
const profile_bio = document.querySelector(".profile-container-details-bio");
const profile_repos_count = document.querySelector(".profile-container-details-repos__number");
const profile_followers_count = document.querySelector(".profile-container-details-followers__number");
const profile_following_count = document.querySelector(".profile-container-details-following__number");
const profile_location = document.querySelector(".profile-container-details-secondary-data-location__text");
const profile_twitter = document.querySelector(".profile-container-details-secondary-data-twitter__text");
const profile_link = document.querySelector(".profile-container-details-secondary-data-link__text");
const profile_company = document.querySelector(".profile-container-details-secondary-data-company__text");

// - ADDITIONAL ELEMENTS & VARIABLE DECLERATIONS:
const mode_container_text = mode_container.querySelector(".mode-container__text");
const mode_container_icon = mode_container.querySelector(".mode-container__icon");
const search_container_search_bar = search_container.querySelector(".search-container__search-bar");
const search_container_button = search_container.querySelector(".search-container__button");
const message_error = search_container.querySelector(".search-container__message-error");

const apiUrl = "https://api.github.com/users";
let currentLightMode = "light";
// ---------------------------------------


// ---------------------------------------

// EVENT LISTENRES:
mode_container.addEventListener("click" , () => changeCurrentMode(currentLightMode , mode_container_text.innerHTML.toLowerCase() , "animation"));

search_container_button.addEventListener("click" , () => fetchUser(search_container_search_bar.value));

window.addEventListener("load" , () => {detectBroswersColorScheme(); fetchUser("Octocat")});

search_container_search_bar.addEventListener("input" , () => !message_error.classList.contains("component--hide") && message_error.classList.add("component--hide"));

search_container_search_bar.addEventListener("keyup" , (event) => event.keyCode === 13 && fetchUser(search_container_search_bar.value));
// ---------------------------------------



// ---------------------------------------
// MODE CHANGE HANDLERS:
function changeCurrentMode(from , to , type) {
            const modeToimage = {
                "dark" : "./assets/icon-moon.svg",
                "light": "./assets/icon-sun.svg"
            }

            mode_container_text.innerHTML = `${from.toUpperCase()}`;
            mode_container_icon.src = modeToimage[from];

            
            search_container.classList.add(`component--${type}-${to}`);
            profile_container.classList.add(`component--${type}-${to}`);
            body.classList.add(`window--${type}-${to}`);

            search_container.classList.remove(`component--${type}-${from}`);
            profile_container.classList.remove(`component--${type}-${from}`);
            body.classList.remove(`window--${type}-${from}`);

            currentLightMode = to;
}
function detectBroswersColorScheme(){
    // if user's browser support the match media feature & his broswer perfered color scheme is dark...
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
        changeCurrentMode("light" , "dark", "init");
    }
}
// ---------------------------------------


// ---------------------------------------
// FETCH REQUESTED DATA
async function fetchUser(userName) {
    try 
    {
        let response = await fetch(`${apiUrl}/${userName}` , {
            method: "GET"
        });
        if(!response.ok) 
        {
            handleRequestError(); 
            return;
        }
        else{
            let data = await response.json();
            handleRequestSuccess(data);
        }
    } 
    catch (error) 
    {
        console.log(error);
        handleRequestError(); 
    }
    


    
    function handleRequestSuccess(data){
            const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const joindate = new Date(data["created_at"]);
            const joindate_year = joindate.getUTCFullYear();
            const joindate_month = months[joindate.getUTCMonth()];
            const joindate_day = joindate.getUTCDay();

            profile_image.src = data["avatar_url"];
            profile_name.innerHTML = data["name"] === null ? data["login"] : data["name"];
            profile_joindate.innerHTML = `Joined ${joindate_day} ${joindate_month}. ${joindate_year}`;
            profile_hashtag.innerHTML = `&${data["login"]}`;
            profile_bio.innerHTML = data["bio"] === null ? "This profile has no bio." : data["bio"];
            profile_repos_count.innerHTML = data["public_repos"];
            profile_followers_count.innerHTML = data["followers"];
            profile_following_count.innerHTML = data["following"];
            profile_location.innerHTML = data["location"] === null ? "Not Avaliable" : data["location"];
            profile_twitter.innerHTML = data["twitter_username"] === null ? "Not Avaliable" : data["twitter_username"];
            profile_link.innerHTML = data["html_url"].substring(data["html_url"].indexOf('/') + 2);
            profile_link.href = data["html_url"]; 
            profile_company.innerHTML = data["company"] === null ? "Not Avaliable" : data["company"];    
    }
    function handleRequestError(){
        message_error.classList.remove("component--hide");
    }
}
// ---------------------------------------