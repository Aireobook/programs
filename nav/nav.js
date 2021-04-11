
window.addEventListener('DOMContentLoaded', function () {
    Animation({
        "menu_li": "menu-li",
        "collapsible_a": "collapsible-a",
        "collapsible_body": "collapsible-body",
    });
})


 function Animation(param){
     if ( !(this instanceof Animation)){
         return new Animation(param);
     }


     // 1. Paramentr page w adresie url
     let parm_url = this.parameter();
    console.log('param_url', parm_url)
     if (parm_url){
         let data_link_url =  this.urlSearchLink(parm_url);   // a

         this.open(data_link_url);
     }

    this.navVoyager();

 }




Animation.prototype.navVoyager = function (){

    let self = this;
    let a_menus = document.querySelectorAll('.collapsible-a')

    for (let a_menu of a_menus){
        a_menu.addEventListener('click', Voyager, false);

        function Voyager(e){
           if (a_menu.classList.contains('active')){
               self.close(a_menu)
           }else{
               self.open(a_menu)
           }
        }
    }
}



Animation.prototype.open = function (a_link){

    // if (a_link === null) {
    //     console.log("Error: not a_link!")
    //     return false;
    // }

    let li = a_link.closest('.menu-li');

    if (li === null) {
        console.log("Not paret element li !")
        return false;
    }

    let div = li.querySelector('.collapsible-body')

    let ul_height_start = getComputedStyle(li).height;
    let al = li.querySelector('.collapsible-a')

    li.classList.add('active')
    al.classList.add('active')

    li.style.overflow = "hidden";       // 1. zatrzymać rozwijanie li
    li.style.height = ul_height_start;  // 2. zablokować wysokoc li
    div.style.display = 'block';
    const  div_height_full = parseInt(getComputedStyle(div).height); // 3.  obliczona wysokość div przy rozwinięciu
    li.style.height = 'inherit';
    li.style.overflow = "inherit";
     this.rozwin(0, div_height_full, div)
}




Animation.prototype.close = function (a_link){

    let li  = a_link.closest('.menu-li');
    let div = li.querySelector('.collapsible-body')
    let div_height = parseInt(getComputedStyle(div).height);

    li.classList.remove('active')
    a_link.classList.remove('active')

    this.zwin(0, div_height, div )
}



Animation.prototype.rozwin = function (_min, _max, el_div, skok = 5){

    let i = 0;
    const i_max = Math.ceil(_max/skok);

    let n = _min;
    amr();
    function amr(){
        el_div.style.height = n + 'px'
        n += skok;
        i++;

        if (i === i_max){
            el_div.style.height = _max + 'px'
        }else{
            if(n <= _max ){
                setTimeout(function (){
                    amr();
                }, 10)
            }
        }

    }

}

Animation.prototype.zwin = function (_min, _max, el_div, skok = 5){

    let i = 0;
    const i_max = Math.ceil(_max/skok);
    let n = _min;
    amr();
    function amr(){
        // console.log('i', i)
        el_div.style.height = (_max - n) + 'px'
        n += skok;
        i++;

        if (i === i_max){
            // el_div.style.height = _min + 'px'
            el_div.style.display = 'none';
            el_div.style.height = null ;

        }else{
            if(n <= _max ){
                setTimeout(function (){
                    amr();
                }, 10)
            }
        }

    }

}




Animation.prototype.urlSearchLink = function (parm_url){
    return   document.querySelector('[data-link*="' + parm_url +'" ]')
}





 //
 // Animation.prototype.openActiveMenuLink = function (a_open_menu, ul_height_start){
 //
 //     let div_heint_full = false;
 //
 //     let li = a_open_menu.closest('.menu-li')
 //    let a = a_open_menu;
 //    let div = li.querySelector('.collapsible-body');
 //    div.style.display = "block"
 //
 //   if ( li.classList.contains('active')){
 //
 //       li.classList.remove('active')
 //         this.zwin(0, ul_height_start, div)
 //       // div.style.display = "none"
 //
 //   } else{
 //       // div.style.display = "block"
 //       li.classList.add('active')
 //       li.style.overflow = "hidden";
 //       li.style.height = ul_height_start;
 //       div.style.display = 'block';
 //
 //       if (div_heint_full === false){
 //           div_heint_full = parseInt(getComputedStyle(div).height);
 //       }
 //
 //       console.log('div_height_full', div_heint_full)
 //
 //       this.rozwin(0, div_heint_full, div)
 //   }
 //
 //
 //
 //
 // }
 //


// Animation.prototype.ulFull =  function (){
//
// }



 // // 1. Jeśli instnie parametr page w adresie url - otwiramy nav
 // Animation.prototype.otworzMenuParam = function (parm_url){
 //     // znajdujemy link w navigacji o data-likk = param_url
 //     return  data_link = document.querySelector('[data-link*="' + parm_url +'" ]')
 // }


Animation.prototype.getUrlParameters = function (paramewter = 'page'){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
   return urlParams.get(paramewter)
}


Animation.prototype.parameter = function (){
   return  parameter_url = this.getUrlParameters('page') || false;
}




//
//
// Animation.prototype._mixOptions = function (config){
//
//
//     let defaultConfig = JSON.parse(JSON.stringify(this._default));
//
//     for (const key in defaultConfig){
//         if (defaultConfig.hasOwnProperty(key)){
//             if ( key in config){
//                 defaultConfig[key] = config[key]
//             }
//         }
//
//     }
//     return defaultConfig;
// }

//
// Animation.prototype._default = {
//     "menu_li": "menu-li",
//     "collapsible_a": "collapsible-a",
//     "collapsible_body": "collapsible-body",
//     "skok": 10
// }
//
