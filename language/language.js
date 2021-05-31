
window.addEventListener('load',  () => {

 const langugage_change =  document.getElementById('language-change');

 langugage_change.addEventListener('click', () => {
     let dropdown_menu = document.querySelector('.dropdown-menu');


     if (dropdown_menu.classList.contains("active")){
         dropdown_menu.style.display = "none";

         dropdown_menu.classList.remove("active")
     }else{
         dropdown_menu.style.display = "block";

         dropdown_menu.classList.add("active")
     }


 } )

})