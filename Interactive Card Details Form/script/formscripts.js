// ------------------------------------------
// FORM DOM ELEMENTS
const user_number = document.querySelector(".input-cardnumber__input")
const user_name = document.querySelector(".input-cardholder__input")
const user_month_exp = document.querySelector(".input-expdate__input-month")
const user_year_exp = document.querySelector(".input-expdate__input-year")
const user_cvc = document.querySelector(".input-cvc__input")
// ------------------------------------------


// ------------------------------------------
// FORM CLIENT SIDE VALIDATION FUNCTIONS:
export const onlineClientSideValidation = (type) => {
    switch(type){
        case "number":
        // Performing online validation to the credit number field:
        // 1) Blocking the ability to add spaces
        // 2) Adding spaces automatically when needed
        // 3) Blocking the ability to remove the spaces that were added automatically
            if(user_number.value[user_number.value.length - 1] === ' '){
                user_number.value = user_number.value.slice(0, user_number.value.length - 1)
            }

            if(user_number.value.length % 5 === 4 && user_number.value.length < 19)
            {
                user_number.value = `${user_number.value} `;
            }
            break;
    }
}

export const submissionClientSideValidation = () => {

    let isValid = true;

    // STEP 1: CLEARING OLD ERROR MESSAGES
    clearErrorMessages()
    clearErrorBorders()

    // STEP 2: PERFORMING VALIDATION TO EACH INPUT FIELD
    validateInputName()
    validateInputCardNumber()
    validateInputExpDate()
    validateInputCVC()

    // STEP 3: RETURN VALIDATION RESULT
    return isValid

    // VALIDATION FUNCTIONS:
    function validateInputName(){

        // CASE 1: NAME FIELD EMPTY
        if(isEmpty(user_name.value)){
            createErrorBorder(user_name)
            createErrorMessage(user_name.parentElement , "Can't be blank")
            isValid = false
            return
        }

        // CASE 2: NAME FIELD NOT STRING ONLY
        if(!isStringOnly(user_name.value.replace(/ /g,''))){
            createErrorBorder(user_name)
            createErrorMessage(user_name.parentElement , "Wrong format , letters only")
            isValid = false
            return
        }
    }

    function validateInputCardNumber(){

        // CASE 1: CARD NUMBER FIELD EMPTY
        if(isEmpty(user_number.value)){
            createErrorBorder(user_number)
            createErrorMessage(user_number.parentElement , "Can't be blank")
            isValid = false
            return
        }

        // CASE 2: CARD NUMBER FIELD NOT NUMBERS ONLY
        if(!isNumbersOnly(user_number.value.replace(/ /g,''))){
            createErrorBorder(user_number)
            createErrorMessage(user_number.parentElement , "Wrong format , numbers only")
            isValid = false
            return
        }

        // CASE 3: CARD NUMBER NOT ONLY 16 DIGITS
        if(user_number.value.length - 3 != 16){
            createErrorBorder(user_number)
            createErrorMessage(user_number.parentElement , "Must contain 16 digits")
            isValid = false
            return
        }
    }


    function validateInputExpDate(){

        // CASE 1: EXP. DATE FIELD EMPTY
        if(isEmpty(user_month_exp.value) || isEmpty(user_year_exp.value)){
            createErrorMessage(user_month_exp.parentElement.parentElement , "Can't be blank")

            if(isEmpty(user_year_exp.value)){
                createErrorBorder(user_year_exp)
            }
            if(isEmpty(user_month_exp.value)){
                createErrorBorder(user_month_exp)
            }

            isValid = false
            return
        }

        // CASE 2: EXP. DATE NOT NUMBERS ONLY
        if(!isNumbersOnly(user_month_exp.value) || !isNumbersOnly(user_year_exp.value)){
            createErrorMessage(user_month_exp.parentElement.parentElement , "Wrong format , numbers only")

            if(isEmpty(user_year_exp.value)){
                createErrorBorder(user_year_exp)
            }
            if(isEmpty(user_month_exp.value)){
                createErrorBorder(user_month_exp)
            }

            isValid = false
            return
        }

        // CASE 3: EXP. DATE INVALID VALUES
        const month_val = Number(user_month_exp.value)
        const year_val = Number(user_year_exp.value) + 2000

        if(month_val < 1 || month_val > 12){
            createErrorBorder(user_month_exp)
            createErrorMessage(user_month_exp.parentElement.parentElement , "Invalid date")
            isValid = false
            return
        }

        if(year_val < new Date().getFullYear())
        {
            createErrorBorder(user_year_exp)
            createErrorMessage(user_year_exp.parentElement.parentElement , "Invalid date")
            isValid = false
            return
        }

        if(year_val == new Date().getFullYear() && month_val < new Date().getMonth()){
            createErrorBorder(user_year_exp)
            createErrorBorder(user_month_exp)
            createErrorMessage(user_year_exp.parentElement.parentElement , "Invalid date")
            isValid = false
            return
        }


    }
    function validateInputCVC(){
        // CASE 1: CVC FIELD EMPTY
        if(isEmpty(user_cvc.value)){
            createErrorBorder(user_cvc)
            createErrorMessage(user_cvc.parentElement , "Can't be blank")
            isValid = false
            return
        }

        // CASE 2: CVC IS NOT ONLY 3 DIGITS
        if(user_cvc.value.length != 3){
            createErrorBorder(user_cvc)
            createErrorMessage(user_cvc.parentElement , "Must contain 3 digits")
            isValid = false
            return
        }
    }

    
    // ERROR MESSAGES FUNCTIONS
    function clearErrorMessages(){
        const errorMessageElements = document.querySelectorAll(".error-text")
        errorMessageElements.forEach((element) => element.remove())
    }

    function createErrorMessage(fatherElement , errorMessage){
        const errorLbl = document.createElement("label")
        errorLbl.textContent = errorMessage
        errorLbl.classList.add("error-text")
        fatherElement.appendChild(errorLbl)
    }

    // ERROR BORDERS FUNCTIONS
    function clearErrorBorders(){
        const errorBorderElements = document.querySelectorAll(".error-border")
        errorBorderElements.forEach((element) => element.classList.remove("error-border"))
    }

    function createErrorBorder(element){
        element.classList.add("error-border")
    }

    // HELPER FUNCTIONS
    function isEmpty(data){
        return data==="";
    }

    function isNumbersOnly(data){
        return /^[0-9]+$/.test(data);
    }

    function isStringOnly(data){
        return /^[A-Za-z]+$/.test(data);
    }

}
// ------------------------------------------