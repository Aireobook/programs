
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
    // console.log('param_url', parm_url)
     if (parm_url){
         let data_link_url =  this.urlSearchLink(parm_url);   // a

         this.open(data_link_url);
     }

    this.navVoyager();

 }




Animation.prototype.navVoyager = function (){

    // let self = this;
    let a_menus = document.querySelectorAll('.collapsible-a')

    for (let a_menu of a_menus){
        a_menu.addEventListener('click', Voyager.bind(this), false);

        function Voyager(e){
           if (a_menu.classList.contains('active')){
               this.close(a_menu)
           }else{
               this.open(a_menu)
           }
        }
    }
}



Animation.prototype.open = function (a_link){



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
    // li.style.height = 'inherit';
    li.style.height = null;
    // li.style.overflow = "inherit";
    li.style.overflow = null;
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




Animation.prototype.getUrlParameters = function (paramewter = 'page'){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
   return urlParams.get(paramewter)
}


Animation.prototype.parameter = function (){
   return  parameter_url = this.getUrlParameters('page') || false;
}



