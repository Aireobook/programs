


function Cadic(config){
    config = config || {}

    if ( !(this instanceof Cadic)){
        return new Cadic(config);
    }

    this.button_url;
    this._orginal = [];
    this._orginal['init'] = false;


    if (window.addEventListener){
        window.addEventListener('load', () => {
            this.buttons();
            // this.ajax();
        })
    } else {
        console.log("Your web browser does not support some technologies. It is probably outdated. Install a newer version (for example: Chrome, Firefox, Opera)")
    }


}




Cadic.prototype._set_orginal = function (){
    const to_translates = document.querySelectorAll('[data-t]');
    for (let translate of to_translates) {
        this._orginal[translate.dataset.t] = translate.innerHTML
    }
}



Cadic.prototype._get_orginal = function (){
    return this._orginal;
}



/**
 *
 * @param classes
 */
Cadic.prototype.buttons = function (classes = 'delegation'){

    if ( ! Boolean (this._orginal['init']) ) {
        this._orginal['init'] = true;
        this._set_orginal();
    }

    const buttons = document.getElementById(classes);
    const actual = document.querySelector('#actual-language ')
    let old;
    const button = buttons;

    const actual_lang = get_language() || "en";
    actual.src = "img/flags/" + get_language() +".png";

    if (actual_lang === 'en'){
        this.resetLanguage();
    }else{
        this.url(actual_lang);
    }


    buttons.addEventListener('click', (e) => {

        if (e.target.nodeName === 'DIV'){
            // e.target.style.color = 'red';
            const data_land = e.target.dataset.lang;
            set_language(data_land);


            if (data_land === 'en'){
                 this.resetLanguage();
            }else{
                this.url(data_land);
            }

            actual.src = "img/flags/" + get_language() +".png";
        }
    })
}


/**
 *
 * @param language
 */
Cadic.prototype.url = function (language){
    const url = "language/dic/dic_" + language + ".json";
    this.ajax(url)
}


/**
 *
 * @param url
 */
Cadic.prototype.ajax = function (url){
    fetch(url,{
        headers : {
            "Content-Type": "application/json",
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                if (res.status === 404){
                     throw new Error(`Http error: ${res.status} File not exist: ` + url);
                } else{
                    // return Promise.reject(`Http error: ${res.status}`);
                    throw new Error(`Http error: ${res.status}`);
                }

            }
        })
        .then(res => {
            this.obietnica(res);
        })
        .catch(error => {
            console.error(error)
        });
}





//
// Cadic.prototype.resetLanguage = function (){
//
//     const to_translates = document.querySelectorAll('[data-t]');
//     for (let translate of to_translates ){
//         translate.style.display = 'block';
//         document.body.classList.remove('lang')
//
//         let olds = document.querySelectorAll('.translation');
//
//         for (let old of olds){
//             old.remove();
//         }
//     }
// }


Cadic.prototype.resetLanguage = function (){

    // const orginal = this.orginal;
    const orginal = this._get_orginal();


    const to_translates = document.querySelectorAll('[data-t]');
    for (let translate of to_translates ){

         if (translate.dataset.t in orginal ){

             translate.innerHTML = orginal[translate.dataset.t]
         }



    }
}




Cadic.prototype.obietnica = function (data){

            // this.resetLanguage();



        const to_translates = document.querySelectorAll('[data-t]');

        for (let translate of to_translates){

            // Znajdujemy w data-t odnośnik do słownika json
            let datasetId = translate.dataset.t

            if (datasetId in data) {
                let result = data[datasetId];
                if (result){

                  translate.innerHTML = result;
                }
            }
        }


}




function set_language(lang){
    localStorage.setItem('lang', lang);
}


function get_language(){
    return localStorage.getItem('lang')
}


function remove_language(actual_lang){
    localStorage.removeItem('lang');
}














