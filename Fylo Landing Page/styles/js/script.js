const introduction_input = document.querySelector(".introduction__input");
const early_access_input = document.querySelector(".early-access-interaction__input");


const introduction_button = document.querySelector(".introduction__button");
const early_access_button = document.querySelector(".early-access-interaction__button");

introduction_button.addEventListener("click" , () => {
    if(!emailValidation(introduction_input.value)) !introduction_input.classList.contains("error") && introduction_input.classList.add("error");
    else introduction_input.classList.contains("error") && introduction_input.classList.remove("error");
});

introduction_input.addEventListener("keyup" , (event) => {
    if(event.keyCode !== 13) return;
    if(!emailValidation(introduction_input.value)) !introduction_input.classList.contains("error") && introduction_input.classList.add("error");
    else introduction_input.classList.contains("error") && introduction_input.classList.remove("error");
});

early_access_button.addEventListener("click" , () => {
    if(!emailValidation(early_access_input.value)) !early_access_input.classList.contains("error") && early_access_input.classList.add("error");
    else early_access_input.classList.contains("error") && early_access_input.classList.remove("error");
});

early_access_input.addEventListener("keyup" , (event) => {
    if(event.keyCode !== 13) return;
    if(!emailValidation(early_access_input.value)) !early_access_input.classList.contains("error") && early_access_input.classList.add("error");
    else early_access_input.classList.contains("error") && early_access_input.classList.remove("error");
})


function emailValidation(emailAddress){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(emailAddress);
}


