
window.addEventListener('DOMContentLoaded', function () {




    Animation({
        "menu_li": "menu-li2",
        "collapsible_a": "collapsible-a",
        "collapsible_body": "collapsible-body",

    });

})


 function Animation(param){
     if ( !(this instanceof Animation)){
         return new Animation(param);
     }




      this._config = this._mixOptions(param);

     let self = this;
     let menus_li = document.querySelectorAll('.'+ this._config['menu_li'])

     for (let menu_li of menus_li ){
         let _h_li = false;
         let _h_div = false;
         let _el_div = false;
         let colabse_a = menu_li.querySelector('.' + this._config['collapsible_a'])

         colabse_a.addEventListener('click', Collapsen, false);

         function Collapsen(e){

             let el_li  = e.target.parentNode;  // li
             let el_a   = e.target;             // a
             if (_el_div === false){
                  _el_div = e.target.parentNode.querySelector('.' + self._config['collapsible_body']);  // div
             }

             if (_h_li === false){
                _h_li = parseInt(getComputedStyle(el_li).height);
             }

             if (menu_li.classList.contains('active')){
                     self.zwin.call(this, 0, _h_div, _el_div, self._config['skok']);
                     el_li.style.height = _h_li;
                     menu_li.classList.remove('active')
             }else{
                    el_li.style.overflow = 'hidden';
                    el_li.style.height = _h_li + 'px';
                    _el_div.style.overflow = 'hidden';
                    _el_div.style.display = 'block';
                    if (_h_div === false){
                        _h_div = parseInt(getComputedStyle(_el_div).height);
                    }
                    _el_div.style.height = '0';
                    el_li.style.height = 'inherit';
                    el_li.style.overflow = 'visible';

                    self.rozwin.call(this, 0, _h_div, _el_div, self._config['skok']);
                    menu_li.classList.add('active');
             }

         }
     }
 }


Animation.prototype._mixOptions = function (config){


    let defaultConfig = JSON.parse(JSON.stringify(this._default));

    for (const key in defaultConfig){
        if (defaultConfig.hasOwnProperty(key)){
            if ( key in config){
                defaultConfig[key] = config[key]
            }
        }

    }
    return defaultConfig;
}

Animation.prototype.rozwin = function (_min, _max, el_div, skok = 10){

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

Animation.prototype.zwin = function (_min, _max, el_div, skok = 10){

    let i = 0;
    const i_max = Math.ceil(_max/skok);
    let n = _min;
    amr();
    function amr(){
        el_div.style.height = (_max - n) + 'px'
        n += skok;
        i++;

        if (i === i_max){
            el_div.style.height = _min + 'px'
        }else{
            if(n <= _max ){
                setTimeout(function (){
                    amr();
                }, 10)
            }
        }

    }

}

Animation.prototype._default = {
    "menu_li": "menu-li",
    "collapsible_a": "collapsible-a",
    "collapsible_body": "collapsible-body",
    "skok": 10
}

