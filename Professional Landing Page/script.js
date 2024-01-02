const allProjects           = document.getElementById("v-pills-all")
const frontendProjects      = document.getElementById("v-pills-frontend")
const fullstackProjects     = document.getElementById("v-pills-fullstack")
const dotnetProjects        = document.getElementById("v-pills-dotnet")
const datascienceProjects   = document.getElementById("v-pills-datascience")

const form                  = document.querySelector("form")
const formDetails           = { email : document.getElementById("emailFormControl"),
                                name  : document.getElementById("nameFormControl") ,
                                desc  : document.getElementById("descFormControl")
                              }

const PROJECT_TYPES = {
    DOTNET      : ".NET",
    FRONTEND    : "Frontend",
    FULLSTACK   : "Fullstack",
    DATASCIENCE : "Data Science"   
}

let allProjectsJSON         = [] , 
    frontendProjectsJSON    = [] , 
    fullstackProjectsJSON   = [] , 
    dotnetProjectsJSON      = [] , 
    datascienceProjectsJSON = []



document.addEventListener("DOMContentLoaded" , () => fetchFromJSON())
form.addEventListener("submit"               , (e)=> validateForm(e))

function fetchFromJSON(){
    fetch("projectList.json")
        .then(response => response.json())
        .then(rawProjectList => {
            moveJsonDataToVariables(rawProjectList)
            addProjectsToHTML(allProjectsJSON , allProjects)
            addProjectsToHTML(frontendProjectsJSON , frontendProjects)
            addProjectsToHTML(fullstackProjectsJSON , fullstackProjects)
            addProjectsToHTML(dotnetProjectsJSON , dotnetProjects)
            addProjectsToHTML(datascienceProjectsJSON , datascienceProjects)
        })
}

function moveJsonDataToVariables(rawProjectList){
    rawProjectList.forEach(rawProject => {
        allProjectsJSON.push(rawProject)
        rawProject.projectLabel === PROJECT_TYPES.FULLSTACK     && fullstackProjectsJSON.push(rawProject)
        rawProject.projectLabel === PROJECT_TYPES.FRONTEND      && frontendProjectsJSON.push(rawProject)
        rawProject.projectLabel === PROJECT_TYPES.DOTNET        && dotnetProjectsJSON.push(rawProject)
        rawProject.projectLabel === PROJECT_TYPES.DATASCIENCE   && datascienceProjectsJSON.push(rawProject)
    });
}

function addProjectsToHTML(projectDetails , elementToAdd){
    let generatedHTML = `<div class="row gap-md-2 gap-4 justify-content-center">`
    projectDetails.forEach(projectDetail => {
        generatedHTML += ` 
        <div class="card text-center col-md-5 bg-black text-white p-0">
            <img class="card-img-top" style="max-height: 50%" src=${projectDetail.projectImage} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${projectDetail.projectName}</h5>
                <p class="card-text">${projectDetail.projectDesc}</p>
                <a href=${projectDetail.projectRepo} target="_blank" class="btn btn-primary px-4 ${!projectDetail.projectRepo && "disabled"}">Repo</a>
               
            </div>
        </div>`
    })   
    generatedHTML += ` </div>`
    elementToAdd.innerHTML = generatedHTML
}

function validateForm(e){
    e.preventDefault();
    resetPreviousValidateForm()
    formDetails.email.value.length=== 0  && formDetails.email.classList.add("is-invalid")
    formDetails.desc.value.length === 0  && formDetails.desc.classList.add("is-invalid")
    formDetails.name.value.length === 0  && formDetails.name.classList.add("is-invalid")


    function resetPreviousValidateForm(){
        formDetails.email.classList.contains("is-invalid") && formDetails.email.classList.remove("is-invalid")
        formDetails.desc.classList.contains("is-invalid")  && formDetails.desc.classList.remove("is-invalid")
        formDetails.name.classList.contains("is-invalid")  && formDetails.name.classList.remove("is-invalid")
    }
}