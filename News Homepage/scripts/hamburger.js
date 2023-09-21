const hamburger_icon = document.querySelector(".hamburger-icon input");
const outer_screen = document.querySelector(".outer-screen");

hamburger_icon.addEventListener("change" , () => {
    changeMenuState();
})

outer_screen.addEventListener("click" , () => {
    changeMenuState();
    hamburger_icon.checked = false;
})

function changeMenuState(){
    document.querySelector("body").classList.toggle("hide-overflow");
    outer_screen.classList.toggle("darken");
}