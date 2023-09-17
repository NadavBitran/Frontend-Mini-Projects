document.addEventListener("DOMContentLoaded" , () => {
    fetch("./project-details.JSON")
        .then(response => response.json())
        .then(data => handleProjectDivCreation(data["Projects"]))
        .catch(error => {
            console.log(error)
        })
    
    function handleProjectDivCreation(data){
        document.querySelector(".main").innerHTML = data.map(project_item => convertToRawHTML(project_item)).join('');
        console.log(document.querySelector(".main").innerHTML);
    }
    function convertToRawHTML(project_item){
        return `<div class="project">
            <div class="project__image-container">
                <img class="project__image" src= "${project_item["Photo"]}">
            </div>
            <div class="project-details">
                <h3 class="project-details__title">${project_item["Title"]}</h3>
                <p class="project-details__description">${project_item["Description"]}</p>
                <div class="project-details__tech-list">
                ${project_item["Technologies"].map(tech_name => `<h3 class="tech-item__${tech_name.toLowerCase()}">${tech_name}</h3>`).join('')}
                </div>
            </div>
            <div class="project__button-list">
                <a href=${project_item["Site"]} target="_blank"><button>Site</button></a>
                <button target="_blank">Live</button>
                <a href=${project_item["Repo"]} target="_blank"><button>Repo</button></a>
            </div>
        </div>`;
    }
    
})