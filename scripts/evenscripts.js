// =============== DOM ELEMENTS & VARIABLES DECLERATIONS ===============
const wrapper = document.querySelector(".wrapper");
const body = document.querySelector("body");
const popup_overlay = document.querySelector(".popup-overlay");
const popup = document.querySelector(".popup");
const popup_details = document.querySelector(".popup__details");
const popup_image = document.querySelector(".popup__image");
const popup_arrow_left = popup_overlay.querySelector(".popup__left-arrow");
const popup_arrow_right = popup_overlay.querySelector(".popup__right-arrow");
const popup_collapse = popup_overlay.querySelector(".popup__collapse-icon");

let current_popup_project_index = null;
let current_popup_photo_index = null;
let project_list = null;



// =============== DOMContentLoaded EVENT LISTENER ===============
document.addEventListener("DOMContentLoaded" , () => {
    fetch("./project-details.JSON")
        .then(response => response.json())
        .then(data => {
            handleProjectDivCreation(data["Projects"]);     
            createExpandClickHandlers();
            project_list = data["Projects"];})
        .catch(error => {
            console.log(error)
        })
    
    function handleProjectDivCreation(data){
        document.querySelector(".main").innerHTML = data.map((project_item,project_index) => JSON_to_HTML_projects(project_item,project_index)).join('');
    }

    function createExpandClickHandlers(){
        document.querySelectorAll(".project__expand-icon").forEach((expand_project_entity => {
            expand_project_entity.addEventListener("click" , () => {
                const project_entity = expand_project_entity.parentElement;
                popup_details.innerHTML = JSON_to_HTML_popup(project_list[project_entity.id] , project_entity.id);
                popup_image.src = project_list[project_entity.id]["Additional_Photos"][0];
                popup_overlay.classList.remove("hide-element");
                body.classList.add("hide-overflow");

                current_popup_project_index = project_entity.id;
                current_popup_photo_index = 0;

                popup.scrollTop = 0;
            })
        }))
    }
})

// =============== POPUP EVENT LISTENERS ===============
popup_arrow_left.addEventListener("click" , () => {
    if(current_popup_photo_index === 0){
        current_popup_photo_index = project_list[current_popup_project_index]["Additional_Photos"].length - 1;}
    else current_popup_photo_index--;

    popup_image.src = project_list[current_popup_project_index]["Additional_Photos"][current_popup_photo_index];
})

popup_arrow_right.addEventListener("click" , () => {
    current_popup_photo_index++;
    if(current_popup_photo_index === project_list[current_popup_project_index]["Additional_Photos"].length){
        current_popup_photo_index = 0;}

    popup_image.src = project_list[current_popup_project_index]["Additional_Photos"][current_popup_photo_index];
})

popup_collapse.addEventListener("click" , () => {
    popup_overlay.classList.add("hide-element");
    body.classList.remove("hide-overflow");
})
// =============== JSON TO HTML HELPERS ===============
function JSON_to_HTML_projects(project_item , project_index){
        return `<div class="project" id=${project_index}>
            <img class="project__image" src= "${project_item["Photo"]}">
            <div class="project__details">
                <h3 class="project__title">${project_item["Title"]}</h3>
                <p class="project__description">${project_item["Description"]}</p>
                <div class="project__tech-list tech-list">
                    ${project_item["Technologies"].map(tech_name => `<h3 class="tech-item__${tech_name.toLowerCase()}">${tech_name}</h3>`).join('')}
                </div>
            </div>
            <div class="project__button-list">
                <a href=${project_item["Site"]} target="_blank"><button>Site</button></a>
                <a href=${project_item["Live"]} target="_blank"><button>Live</button></a>
                <a href=${project_item["Repo"]} target="_blank"><button>Repo</button></a>
            </div>
            <img class="project__expand-icon icon" src="./images/expand.svg">
        </div>`;
}

function JSON_to_HTML_popup(project_item , project_index){
        return `<div class="popup__details" id=${project_index}>
                ${project_item["Detailed_Description"]}
                <h2>💻 Built By</h2>
                <div class="popup__tech-list tech-list">
                 ${project_item["Technologies"].map(tech_name => `<h3 class="tech-item__${tech_name.toLowerCase()}">${tech_name}</h3>`).join('')}
               </div>
                <h2>🔗 Additional Links</h2>
                <div class="popup__button-list">
                    <a href=${project_item["Site"]} target="_blank"><button>Site</button></a>
                    <a href=${project_item["Live"]} target="_blank"><button>Live</button></a>
                    <a href=${project_item["Repo"]} target="_blank"><button>Repo</button></a>
                </div>
                <h3>📷 Additional Photos</h3>
            </div>`
}
