/**
 * Modal - przeznaczenie informacyjne w wyskakujących okienkach.
 * MCL version; 1.1
 *
 * 2021 maj
 *
 */



/**
 *
 * @param config
 * @returns {InitModalMCL}
 * @constructor
 */
function InitModalMCL(config){

   config = config || {};

    if ( !(this instanceof InitModalMCL)){
        return new InitModalMCL(config);
    }

    this._config = this._extendOpiotns(config)
    this.addAjaxDirectory();
    let url = this._config.modals_page;
    this.ajax(url);
}


/**
 *  Dodajemy katalog dla plików html zawierających text przesłanych drogą ajaxową.
 */
InitModalMCL.prototype.addAjaxDirectory = function (){
    // dodajemy <div id="ajaxmodaljoin"></div>
    const ajx = document.createElement('div');
    ajx.setAttribute('id', 'ajaxmodaljoin');
    document.body.appendChild(ajx);
}


/**
 *  Wczytujemy ajaxem pliki zawierające text do wyskakujących okienek.
 *  Po wczytaniu uruchamia się obietnica.
 *
 * @param url
 */
InitModalMCL.prototype.ajax = function (url){
    fetch(url,{
        headers : {
            "Content-Type": "application/json",
        }
    })
        .then(res => {
            if (res.ok) {
                return res.text()
            } else {
                if (res.status === 404){
                    throw new Error(`Http error: ${res.status} File not exist: ` + url);
                } else{
                    // return Promise.reject(`Http error: ${res.status}`);
                    throw new Error(`Http error: ${res.status}`);
                }

            }
        })
        .then(html => {
            let ajax_join = document.getElementById('ajaxmodaljoin');
            ajax_join.innerHTML = html;
            this.promise();
            // InitTranlatar();
        })
        .catch(error => {
            console.error(error)
        })
}


/**
 *  Po wczytaniu okienek ta funkcja uruchamia główny program modalu.
 */
InitModalMCL.prototype.promise = function (){

    let caButtons = document.querySelectorAll('.caButton');

    for (let button of caButtons){
        button.addEventListener('click', (e) => {


            let self = this;

                e.stopPropagation();
            this._clicked_button = button;


                // Opent this modal
                let modal_open_id = button.dataset.id;


                // let caConfig = document.getElementById(modal_open_id);
            this._modal_open_id = modal_open_id;

                let this_modal = document.getElementById(modal_open_id);
            this._this_modal = this_modal;

                let closes = document.querySelectorAll('#' + modal_open_id + ' .close');

                if (this_modal.classList.contains('center')){
                    this.animatesCenter();
                }

                if (this_modal.classList.contains('right')){
                    this.openAnimateModalRight()
                }
                if (this_modal.classList.contains('closable')){

                }


                // close

                for (let close of closes){
                    close.addEventListener('click', () => {

                        e.stopPropagation();// blokuje rodzicow
                        e.stopImmediatePropagation(); // blokuje klikanie na dzieciach

                        if (this_modal.classList.contains('center')){
                            this.closeModal();
                        }
                        if (this_modal.classList.contains('right')){
                            this.closeAnimateoMdalRight();
                        }

                    }, false)


                }




        } , false);



    }
}


/**********************************************************************
                             Modal Center
**********************************************************************/
// Open
InitModalMCL.prototype.animatesCenter = function(e) {
    this._this_modal.style.display = "block";

   let travel = document.querySelector('#' + this._modal_open_id + ' .travel');


   let mcl = document.querySelector('.mcl');
    let i;
    let n = 20;
    amr();
    function amr(){

        i = i >= 1 ? 1 : n/100;
        travel.style.transform = "scale(" + i + ")";
        mcl.style.opacity = i;
        n += 15;
        if(i < 1 ){
            setTimeout(function (){
                amr();
            }, 15)
        }
    }
}

// Close
InitModalMCL.prototype.closeModal = function(){

    let travel = document.querySelector('#' + this._modal_open_id + ' .travel');
    let mcl = document.querySelector('.mcl');
    let i;
    let n = 20;
    amrc();
    function amrc(){

        i = i >= 1 ? 1 : n/100;
          mcl.style.opacity = (1-i);
        n += 10;
        if(i < .9 ){
            setTimeout(function (){
                amrc();
            }, 10)
        }else{
            travel.parentElement.style.display = 'none';
        }
    }

}

/**********************************************************************
                                Modal Right
 **********************************************************************/

// Open
InitModalMCL.prototype.openAnimateModalRight = function (travel_width){
       travel_width = 600;

    this._this_modal.style.display = "block";
    let travel = document.querySelector('#' + this._modal_open_id + ' .travel');
    let n = 0;
    amr(travel_width);
    function amr(width){
        travel.style.right = (n - width)  + "px";
        n += 10;
        if(n < width ){
            setTimeout(function (){
                amr(width);
            }, 5)
        }
    }
}



// Close
InitModalMCL.prototype.closeAnimateoMdalRight = function (travel_width){
     let self = this;
    // let travel = document.querySelector('#ceconfig .travel');
    travel_width = 600;

    let travel = document.querySelector('#' + this._modal_open_id + ' .travel');

    let n = 0;
    amrout(travel_width);
    function amrout(width){
        travel.style.right = (-n)  + "px";
        n += 10;

        if(n < width ){
            setTimeout(function (){
                amrout(width);
            }, 5)
        }
        if (n >= width){
            self._this_modal.style.display = 'none';
        }
    }
}





/**********************************************************************
                               Config
 **********************************************************************/

// obiekt zawera defultowe wartości dla config
InitModalMCL.prototype._defaultCongig = {
    button_class : 'caButton',
    modals_page: 'modals/modals.html'
}



// mixuje default i config
InitModalMCL.prototype._extendOpiotns = function (config){

    // tworzymy nowy obiekt
    let defaultConfig = JSON.parse(JSON.stringify(this._defaultCongig));

    for (let key in defaultConfig){
        if (defaultConfig.hasOwnProperty(key)){
            if (key in config){
                  defaultConfig[key] = config[key];
            }
        }
    }
    return defaultConfig;
}




/**********************************************************************
                               Start
 **********************************************************************/
window.addEventListener('DOMContentLoaded', function (){

    InitModalMCL({
        // button_class : 'caButton',
        // modals_page: 'modals/modals1111.html'
    })

})




