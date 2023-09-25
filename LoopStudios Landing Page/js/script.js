const hamburger_icon = document.querySelector(".hamburger-icon");
const body = document.querySelector("body");

hamburger_icon.addEventListener("click" , () => {
    body.classList.toggle("hide-overflow");
})