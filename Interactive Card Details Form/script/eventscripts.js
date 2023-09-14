// ------------------------------------------
// IMPORTS
import { onlineClientSideValidation , submissionClientSideValidation } from "./formscripts.js";
// ------------------------------------------

// ------------------------------------------
// FORM DOM ELEMENTS
const user_number = document.querySelector(".input-cardnumber__input")
const user_name = document.querySelector(".input-cardholder__input")
const user_month_exp = document.querySelector(".input-expdate__input-month")
const user_year_exp = document.querySelector(".input-expdate__input-year")
const user_cvc = document.querySelector(".input-cvc__input")

const form_container = document.querySelector(".container-form-field")
const complete_container = document.querySelector(".container-form-complete")
const button_confirm = document.querySelector(".button-confirm")

const card_number = document.querySelector(".credit-card__number")
const card_name = document.querySelector(".credit-card__holdername")
const card_expdt = document.querySelector(".credit-card__exp")
const card_cvc = document.querySelector(".credit-card__cvc")
// ------------------------------------------

// ------------------------------------------
// FORM EVENT LISTENERS CREATION
user_number.addEventListener("change" , () => updateCard("number"))
user_name.addEventListener("change" , () => updateCard("name"))
user_month_exp.addEventListener("change" , () => updateCard("exp"))
user_year_exp.addEventListener("change" , () => updateCard("exp"))
user_cvc.addEventListener("change" , () => updateCard("cvc"))

user_number.addEventListener("input" , () => onlineClientSideValidation("number"))

button_confirm.addEventListener("click" , (event) => {
    event.preventDefault()
    if(submissionClientSideValidation())
    {
        form_container.classList.toggle("hide")
        complete_container.classList.toggle("hide")
    }
})
// ------------------------------------------


// ------------------------------------------
// CARD VISUAL UPDATE FUNCTIONS:
export const updateCard = (type) => {
    switch(type){
        case "number":
            card_number.innerHTML = user_number.value;
            break;
        case "name":
            card_name.innerHTML = user_name.value;
            break;
        case "exp":
            card_expdt.innerHTML = `${user_month_exp.value === "" ? "00" : user_month_exp.value}/${user_year_exp.value === "" ? "00" : user_year_exp.value}`;
            break;
        case "cvc":
            card_cvc.innerHTML = user_cvc.value;
            break;
        default:
            break;
    }
}
// ------------------------------------------
